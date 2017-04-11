import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  CONNECT_WITH_USER,
  CONNECTION_SUCCESSFUL,
  CURRENT_USER_FETCH_SUCCESS,
  KEEP_BROWSING,
} from './types';

export const potentialsFetch = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    const potentials = [];

    dispatch({type: POTENTIALS_FETCH});
    axios.get(`https://activities-test-a3871.appspot.com/match/${currentUser.uid}`, {
      headers: { authorization: `TODOChangeTolocalStoregetItemtoken:${currentUser.uid}`}
    })
      .then(response => {
        const keys = Object.keys(response.data);
        keys.forEach((key) => {
          const dataWithId = {...response.data[key], uid: key};
          potentials.push(dataWithId);
        });
        dispatch({
          type: POTENTIALS_FETCH_SUCCESS,
          payload: potentials
        });
      }, (error) => {
        console.log(`API not responding.  Error = ${error}`);
    });
  };
};

export const currentUserFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/user_profiles/${currentUser.uid}`)
      .once('value', snapshot => {
        dispatch({ type: CURRENT_USER_FETCH_SUCCESS, payload: {...snapshot.val(), uid: currentUser.uid } });
      });
  };
};

export const connectWithUser = (buddy, connectStatus) => {
  const { currentUser } = firebase.auth();

  return(dispatch) => {
    dispatch({
      type: CONNECT_WITH_USER,
      payload: { uid: buddy.uid, name: buddy.name, pic: buddy.pic, index: buddy.index }
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
            otherUserName: buddy.name,
            otherUserPic: buddy.pic,
            liked: connectStatus,
            matched: (otherUserLikesYouToo && connectStatus),
            lastMsg: '',
          });
          if(connectStatus && otherUserLikesYouToo) {
            successfullyConnected(dispatch, buddy.uid, currentUser.uid);
          } else keepBrowsing(dispatch);
      });
  };
};

export const keepBrowsing = () => {
  return ({ type: KEEP_BROWSING });
};

const successfullyConnected = (dispatch, uid, currentUserId) => {
  firebase.database().ref(`user_matches/${uid}/${currentUserId}`)
    .update({matched: true});

  dispatch({
    type: CONNECTION_SUCCESSFUL
  });
  Actions.connection();
};
