import { Platform } from 'react-native';
import firebase from 'firebase';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import RNFetchBlob from 'react-native-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import {
  PHOTO_REMOVED,
  PHOTOS_SELECTED,
  PHOTO_UPLOADED,
  PHOTOS_SAVED,
  FACEBOOK_ALBUMS_FETCHED,
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
export const photosSelected = (photos, from) => {
  return (dispatch) => {
    console.log('from:', from);
    const { currentUser } = firebase.auth();

    photos.forEach( photo => {
      const photoUri = from === 'cameraRoll' ? photo.uri : photo.path;

      dispatch({ type: PHOTOS_SELECTED, payload: photos.map( photo => photoUri ) })

      uploadImage(currentUser.uid, photoUri, from)
        .then( uri => {
          const newImageRef = firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`).push()

          newImageRef.set({ url: uri, status: ACTIVE })
            .then((snap) => {
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

const uploadImage = (uid, uri, mime = 'image/jpg', from) => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = firebase.storage().ref('profileImages').child(`${uid}`).child(`${sessionId}`)

    // control if it is required to resize the image. required for images from camera, not required images from facebook
    const resizeOrNotPromise = from === 'cameraRoll'
      ? ImageResizer.createResizedImage(uploadUri, 640, 640, 'JPEG', 40,) // rotation, outputPath)
        .then((resizedImageUri) => {
          return fs.readFile(resizedImageUri, 'base64')
        })
      : fs.readFile(uploadUri, 'base64')

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
        reject(error)
      })
  })
}

export const fetchFacebookAlbums = () => {
  return (dispatch) => {
    let token = null;

    AccessToken.getCurrentAccessToken()
      .then( data => {
        token = data.accessToken.toString()
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
            dispatch({ type: FACEBOOK_ALBUMS_FETCHED, payload: result.albums.data })
          }
        )

        new GraphRequestManager().addRequest(request).start()
      })
      .catch( error => console.log('error while fetchFacebookAlbums', error) )
  }
}
export const fetchFacebookAlbumPhotos = (albumId) => {
  return (dispatch) => {
    let token = null;

    AccessToken.getCurrentAccessToken()
      .then( data => {
        token = data.accessToken.toString()
      })
      .then(() => {
        const request = new GraphRequest(
          '/' + albumId,
          {
            parameters: {
              fields: { string: 'id, photos{id,images}' },
              access_token: { string: token }
            }
          },
          (error, result) => {
            const images = result.photos.data.map((item) => item.images[0].source)
            dispatch({ type: FACEBOOK_ALBUM_PHOTOS_FETCHED, payload: images })
          }
        )

        new GraphRequestManager().addRequest(request).start()
      })
      .catch( error => console.log('error while fetchFacebookAlbumPhotos', error) )
  }
}
