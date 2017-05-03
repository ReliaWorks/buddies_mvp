import firebase from 'firebase';
import {
  PHOTO_REMOVED,
  PHOTOS_SELECTED,
  PHOTOS_SAVED
} from './types';
import { INACTIVE, ACTIVE } from '../constants';

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
      const newImageRef = firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`).push()
      newImageRef.set({ url: photo.uri, status: ACTIVE })
        .then((snap) => {
          dispatch({ type: PHOTOS_SELECTED, payload: [{ key: newImageRef.key, url: photo.uri }] })
        })
    })
  }
}
