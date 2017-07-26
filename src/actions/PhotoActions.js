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
  FACEBOOK_ALBUMS_REQUESTED,
  FACEBOOK_ALBUMS_FETCHED,
  FACEBOOK_ALBUM_PHOTOS_REQUESTED,
  FACEBOOK_ALBUM_PHOTOS_FETCHED,
  IMAGE_PAN_STARTED,
  IMAGE_MOVED_OVER,
  IMAGE_MOVING_OUTSIDE,
  IMAGE_PAN_STOPPED,
  IMAGE_REORDERED
} from './types';
import { INACTIVE, ACTIVE, DEFAULT_PROFILE_PHOTO } from '../constants';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const updatePrimaryPicReferences = (withUrl = null) => {
  const { currentUser } = firebase.auth();

  newPrimaryPhotoUrlPromise = (() => {
    if (withUrl) {
      return new Promise((resolve, reject) => {
        resolve(withUrl);
      });
    } else {
      return firebase.database().ref('user_profiles/' + currentUser.uid + '/profileImages')
      //.orderByChild('status').equalTo(ACTIVE)
      .limitToFirst(1)
      .once('value')
      .then(photosSnap => {
        let url = '';
        photosSnap.forEach(photoSnap => {
          url = photoSnap.val().url;
        });

        if (url)
          return url;
        else
          return DEFAULT_PROFILE_PHOTO;
      });
    }
  })();

  newPrimaryPhotoUrlPromise.then(newPrimaryPhotoUrl => {
    // return RNFetchblob.config({
    //   fileCache: true
    // })
    // .fetch('GET', newPrimaryPhotoUrl)
    // .then(res => {
    //   return newPrimaryPhotoUrl;
    // });
      // remove cached file from storage
      //res.flush();
    //});
    return newPrimaryPhotoUrl;
  }).then(thumbnailUrl => {
    return firebase.database().ref('message_center/' + currentUser.uid).once('value', matchesSnap => {
      const updates = {};
      updates[`user_profiles/${currentUser.uid}/thumbnailImage`] = thumbnailUrl;

      matchesSnap.forEach(matchSnap => {
        const otherUserId = matchSnap.key;
        const conversationId = matchSnap.val().conversationId;

        updates[`message_center/${currentUser.uid}/${otherUserId}/user/avatar`] = thumbnailUrl;
        updates[`message_center/${otherUserId}/${currentUser.uid}/otherUserPic`] = thumbnailUrl;
      });

      firebase.database().ref().update(updates);
    });
  });
};

export const photoRemoved = (photo, isPrimary) => {
  const { currentUser } = firebase.auth();

  console.log('remove p:', photo);

  return (dispatch) => {
    // Make inactive to remove photo.
    firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages/${photo.key}`)
      //.set({status: INACTIVE, url: photo.url})
      .remove()
      .then(() => {
        dispatch({ type: PHOTO_REMOVED, payload: photo });

        if (photo.type === 'CR') {
          firebase.storage().refFromURL(photo.url).delete();
        }

        if (isPrimary) {
          updatePrimaryPicReferences();
        }
      });
  };
};

// this action fires when user select images from camera roll (or potentially facebook at future)
export const photosSelected = (photo, from, currentUser) => {
  return (dispatch) => {
    //const { currentUser } = firebase.auth();

    const numOfImages = currentUser.profileImages.length;
    const isPrimary = numOfImages === 0;

    console.log('in AC; isPrimary:', isPrimary, ' from: ', from);

    //photos.forEach(photo => {
    const photoUri = from === 'FB' ? photo : photo.path;

    //dispatch({ type: PHOTOS_SELECTED, payload: photos.map(() => photoUri)});
    dispatch({ type: PHOTOS_SELECTED, payload: photoUri});

    uploadImage(currentUser.uid, photoUri, from)
    .then(uri => {
      const newImageRef = firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`).push();
      console.log('uri:', uri);
      newImageRef.set({ url: uri, type: from, order: numOfImages + 1 })
        .then(() => {
          dispatch({
            type: PHOTO_UPLOADED,
            payload: {
              photo: { key: newImageRef.key, url: uri, order: numOfImages + 1 },
              localUrl: photoUri
            }
          });
        });

        if (isPrimary) {
          updatePrimaryPicReferences(uri);
        }
    })
    .catch(error => console.log(error));
  //  });
  };
};

const uploadImage = (uid, uri, from, mime = 'image/jpg') => {
  return new Promise((resolve, reject) => {
    if (from === 'FB') {
      resolve(uri);
    } else {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('profileImages').child(`${uid}`).child(`${sessionId}`);

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
    }
  });
};

export const fetchFacebookAlbums = () => {
  return (dispatch) => {
    let token = null;

    dispatch({type: FACEBOOK_ALBUMS_REQUESTED});

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
            const albums = result.albums ? result.albums.data || [] : [];
            dispatch({ type: FACEBOOK_ALBUMS_FETCHED, payload: albums });
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

export const imagePanStarted = (draggingImage, initialTouchPosition) => {
  return (dispatch) => {
    dispatch({type: IMAGE_PAN_STARTED, payload: {draggingImage, initialTouchPosition}});
  };
};

export const imageMovedOver = (movedOverImageKey) => {
  return dispatch => {
    dispatch({type: IMAGE_MOVED_OVER, payload: {movedOverImageKey}});
  };
};

export const imageMovingOutside = () => {
  return dispatch => {
    dispatch({type: IMAGE_MOVING_OUTSIDE});
  };
};

export const imagePanStopped = () => {
  return (dispatch) => {
    dispatch({type: IMAGE_PAN_STOPPED});
  };
};
export const imageReordered = (profileImages, imageKey1, imageKey2) => {
  return (dispatch) => {
    console.log(imageKey1, ' ==> ', imageKey2);

    let newImagesArray = profileImages;
    const index1 = profileImages.findIndex(image => image.key === imageKey1);
    const index2 = profileImages.findIndex(image => image.key === imageKey2);
    const image1 = {...profileImages[index1]};
    const image2 = {...profileImages[index2]};

    newImagesArray.splice(index1, 1);
    if (index1 > index2) {
      newImagesArray.splice(index2, 1);
      newImagesArray.splice(index2, 0, image1);
      newImagesArray.splice(index2 + 1, 0, image2);
    } else {
      newImagesArray.splice(index2 - 1, 1);
      newImagesArray.splice(index2 - 1, 0, image1);
      newImagesArray.splice(index2, 0, image2);
    }
    
    const updates = {};
    const {uid} = firebase.auth().currentUser;

    newImagesArray = newImagesArray.map((image, index) => {
      const order = index + 1;
      updates[`/user_profiles/${uid}/profileImages/${image.key}/order`] = order;
      return ({...image, order});
    });

    dispatch({ type: IMAGE_REORDERED, payload: newImagesArray });

    firebase.database().ref().update(updates);

    if (index1 === 0) {
      updatePrimaryPicReferences(newImagesArray[0].url);
    }
  };
};

// export const imageReordered = (profileImages, imageKey1, imageKey2) => {
//   return (dispatch) => {
//     console.log(imageKey1, ' ==> ', imageKey2);
//
//     let newImagesArray = profileImages;
//     const index1 = profileImages.findIndex(image => image.key === imageKey1);
//     const index2 = profileImages.findIndex(image => image.key === imageKey2);
//     const image1 = {...profileImages[index1]};
//
//     newImagesArray.splice(index1, 1);
//     const newIndex = index1 > index2 ? index2 + 1 : index2;
//     newImagesArray.splice(newIndex, 0, image1);
//
//     const updates = {};
//     const {uid} = firebase.auth().currentUser;
//
//     newImagesArray = newImagesArray.map((image, index) => {
//       const order = index + 1;
//       updates[`/user_profiles/${uid}/profileImages/${image.key}/order`] = order;
//       return ({...image, order});
//     });
//
//     dispatch({ type: IMAGE_REORDERED, payload: newImagesArray });
//
//     firebase.database().ref().update(updates);
//
//     if (index1 === 0) {
//       updatePrimaryPicReferences(newImagesArray[0].url);
//     }
//   };
// };
