import firebase from 'firebase';
import {
  PHOTO_REMOVED
} from './types';

export const photoRemoved = (photo) => {
  return (dispatch) => {
    console.log("In PhotoActions: photoRemoved");
    dispatch({ type: PHOTO_REMOVED, payload: photo });
  };
};
