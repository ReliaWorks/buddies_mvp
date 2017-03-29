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

export const connectWithUser = (buddy) => {
  const { currentUser } = firebase.auth();
  return(dispatch) => {
    dispatch({
      type: CONNECT_WITH_USER,
      payload: { uid: buddy.id, name: buddy.first_name, pic: buddy.profileImages[0] }
    });

    const matches = firebase.database();
    matches.ref(`user_matches/${buddy.uid}/${currentUser.uid}`)
      .once('value', snapshot => {
        let otherUserLikesYouToo = false;
        if(snapshot.val()) otherUserLikesYouToo = snapshot.val().liked;

        matches.ref(`user_matches/${currentUser.uid}/${buddy.uid}`)
          .set({
            currentUserId: currentUser.uid,
            otherUserId: buddy.uid,
            otherUserName: buddy.first_name,
            otherUserPic: buddy.profileImages[0],
            liked: true,
            matched: otherUserLikesYouToo,
          });
          if(otherUserLikesYouToo) {
            successfullyConnected(dispatch, buddy.id, currentUser.uid);
          } else {
            dispatch({ type: KEEP_BROWSING });
          }
      });
  };
};

export const keepBrowsing = () => {
  return({ type: KEEP_BROWSING });
};

const successfullyConnected = (dispatch, uid, currentUserId) => {
  firebase.database().ref(`user_matches/${uid}/${currentUserId}`)
    .update({matched: true});

  dispatch({
    type: CONNECTION_SUCCESSFUL
  });
  Actions.connection();
};
