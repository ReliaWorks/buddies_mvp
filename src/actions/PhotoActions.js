import { Platform } from 'react-native';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  PHOTO_REMOVED,
  PHOTOS_SELECTED,
  PHOTO_UPLOADED,
  PHOTOS_SAVED
} from './types';
import { INACTIVE, ACTIVE } from '../constants';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

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

    photos.forEach( photo => {

      dispatch({ type: PHOTOS_SELECTED, payload: photos.map( photo => photo.uri ) })

      uploadImage(currentUser.uid, photo.uri)
        .then( uri => {
          console.log('uriiii: ', uri);
          const newImageRef = firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`).push()
          newImageRef.set({ url: uri, status: ACTIVE })
            .then((snap) => {
              dispatch({
                type: PHOTO_UPLOADED,
                payload: {
                  photo: { key: newImageRef.key, url: uri },
                  localUrl: photo.uri
                }
              })
            })
        })
        .catch( error => console.log(error))
    })
  }
}

const uploadImage = (uid, uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = firebase.storage().ref('profileImages').child(`${uid}`).child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}
