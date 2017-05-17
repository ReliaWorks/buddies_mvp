import { Platform } from 'react-native';
import firebase from 'firebase';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  PHOTO_REMOVED,
  PHOTOS_SELECTED,
  PHOTO_UPLOADED,
  FACEBOOK_ALBUMS_FETCHED,
  FACEBOOK_ALBUM_PHOTOS_REQUESTED,
  FACEBOOK_ALBUM_PHOTOS_FETCHED
} from './types';
import { INACTIVE, ACTIVE } from '../constants';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const photoRemoved = (photo) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages/${photo.key}`)
      .set({status: INACTIVE, url: photo.url})
      .then(() => {
        dispatch({ type: PHOTO_REMOVED, payload: photo });
      });
  };
};

// this action fires when user select images from camera roll (or potentially facebook at future)
export const photosSelected = (photos) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();

    photos.forEach(photo => {
      const photoUri = photo.path;

      dispatch({ type: PHOTOS_SELECTED, payload: photos.map(() => photoUri)});

      uploadImage(currentUser.uid, photoUri)
      .then(uri => {
        const newImageRef = firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`).push();

        newImageRef.set({ url: uri, status: ACTIVE })
          .then(() => {
            dispatch({
              type: PHOTO_UPLOADED,
              payload: {
                photo: { key: newImageRef.key, url: uri },
                localUrl: photoUri
              }
            });
          });
      })
      .catch(error => console.log(error));
    });
  };
};

const uploadImage = (uid, uri, mime = 'image/jpg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    console.log('upload uri: ', uploadUri);

    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = firebase.storage().ref('profileImages').child(`${uid}`).child(`${sessionId}`);

    // below commented code is not required anymore since image picker already sends resized images for both camera roll and facebook images

    // control if it is required to resize the image. required for images from camera, not required images from facebook
    // const resizeOrNotPromise = from === 'cameraRoll'
    //   ? ImageResizer.createResizedImage(uploadUri, 640, 640, 'JPEG', 40,) // rotation, outputPath)
    //     .then((resizedImageUri) => {
    //       return fs.readFile(resizedImageUri, 'base64')
    //     })
    //   : fs.readFile(uploadUri, 'base64')

    const resizeOrNotPromise = fs.readFile(uploadUri, 'base64');

      resizeOrNotPromise
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchFacebookAlbums = () => {
  return (dispatch) => {
    let token = null;

    AccessToken.getCurrentAccessToken()
      .then(data => {
        token = data.accessToken.toString();
      })
      .then(() => {
        const request = new GraphRequest(
          '/me',
          {
            parameters: {
              fields: { string: 'albums{id,name,cover_photo{id,images},count}' },
              access_token: { string: token }
            }
          },
          (error, result) => {
            dispatch({ type: FACEBOOK_ALBUMS_FETCHED, payload: result.albums.data });
          }
        );

        new GraphRequestManager().addRequest(request).start();
      })
      .catch(error => console.log('error while fetchFacebookAlbums', error));
  };
};

export const fetchFacebookAlbumPhotos = (albumId, offset = 0) => {
  return (dispatch) => {
    // if this is not a load more type of request, make empty the facebookAlbumPhotos array.
    // if you don't dispatch this it will show a list of photos of the album that is previously viewed.
    if (offset === 0) {
      dispatch({ type: FACEBOOK_ALBUM_PHOTOS_REQUESTED, payload: { id: albumId, photos: [] } });
    }

    let token = null;

    AccessToken.getCurrentAccessToken()
      .then(data => {
        token = data.accessToken.toString();
      })
      .then(() => {
        const request = new GraphRequest(
          '/' + albumId,
          {
            parameters: {
              fields: { string: 'id, name, photos.limit(25).offset(' + offset + '){id,images}' },
              access_token: { string: token }
            }
          },
          (error, result) => {
            if (error) {
              console.log('error while pulling facebook photos from album:', error);
              return;
            }
            dispatch({ type: FACEBOOK_ALBUM_PHOTOS_FETCHED, payload: result });
          }
        );

        new GraphRequestManager().addRequest(request).start();
      })
      .catch(error => console.log('error while fetchFacebookAlbumPhotos', error));
  };
};
