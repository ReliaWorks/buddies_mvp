import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CONNECT_WITH_USER,
  CONNECTION_SUCCESSFUL,
  CURRENT_USER_FETCH_SUCCESS,
  KEEP_BROWSING,
} from './types';

export const currentUserFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/user_profiles/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: CURRENT_USER_FETCH_SUCCESS, payload: {...snapshot.val(), uid: currentUser.uid } });
      });
  };
};

export const connectWithUser = (currentUserId, uid, name, pic, likeyou) => {
  console.log("In connectWithUser");
  console.log(likeyou);
  return(dispatch) => {
    dispatch({
      type: CONNECT_WITH_USER,
      payload: { uid, name, pic }
    });
    const matches = firebase.database();
    matches.ref(`user_matches/${currentUserId}/${uid}`)
      .set({
        user1Id: currentUserId,
        user2Id: uid,
        user2Name: name,
        user2Pic: pic,
        user1Decision: true,
        user2Decision: likeyou,
        matched: likeyou,
      });
      console.log("like you =");
      console.log(likeyou);
      if(likeyou) {
        successfullyConnected(dispatch);
      } else {
        dispatch({ type: KEEP_BROWSING });
      }
  };
};

export const keepBrowsing = () => {
  return({ type: KEEP_BROWSING });
};

const successfullyConnected = (dispatch) => {
  dispatch({
    type: CONNECTION_SUCCESSFUL
  });
  Actions.connection();
};
