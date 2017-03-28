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

function bothUsersConnected(currentUserId, otherUserId) {
  return true;
}

export const connectWithUser = (currentUserId, uid, name, pic) => {
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
        user2Pic: pic,
        user1Decision: 'connect',
        user2Decision: 'connect', //this is hard-coded. Waiting for Match API update
        matched: true //this is hard-coded. Waiting for Match API update
      });
      if(bothUsersConnected(currentUserId, uid)) successfullyConnected(dispatch);
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
