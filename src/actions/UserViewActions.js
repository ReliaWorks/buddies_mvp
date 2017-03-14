import firebase from 'firebase';
import {
  CURRENT_USER_FETCH_SUCCESS,
} from './types';

export const currentUserFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/user_profiles/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: CURRENT_USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
