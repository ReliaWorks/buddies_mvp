import firebase from 'firebase';
import {
  PHOTO_REMOVED
} from './types';
import { INACTIVE } from '../constants';

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
