import firebase from 'firebase';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  CONNECT_WITH_USER,
  CONNECTION_SUCCESSFUL,
  CURRENT_USER_FETCH_START,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_CHAT_FETCH,
  KEEP_BROWSING,
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  POTENTIALS_FETCH_FAILURE,
  SEEN_CONNECTION_HELPER,
  SET_CURRENT_GEOLOCATION,
  SET_CURRENT_LOCATION,
  API_SECRET_KEY,
  SET_NEW_NOTIFICATION,
  BROWSED_TO_NEXT_USER,
  RESET_CURRENT_INDEX,
  IMAGE_LOADED,
} from './types';
import { DEFAULT_PROFILE_PHOTO } from '../constants';
import { getCurrentPosition } from './LocationActions';

const jsSHA = require("jssha");

export const scrolled = (index) => {
    return ({ type: BROWSED_TO_NEXT_USER, payload: index });
};

export const resetCurrentIndex = () => {
  return ({ type: RESET_CURRENT_INDEX });
};

export const checkNotifications = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/notifications/new/${currentUser.uid}`)
      .on('value', snapshot => {
          dispatch({ type: SET_NEW_NOTIFICATION, payload: { notification: snapshot.val() } });
    });
  };
};

export const potentialsFetch = () => {
  return (dispatch) => {
    dispatch({type: POTENTIALS_FETCH});

    const { currentUser } = firebase.auth();
    const potentials = [];

    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(API_SECRET_KEY + currentUser.uid);
    const hash = shaObj.getHash("HEX");

    axios.get(`https://activities-test-a3871.appspot.com/match_geo/${currentUser.uid}`, {
      headers: { authorization: `${hash}:${currentUser.uid}`}
    })
      .then(response => {
        const keys = Object.keys(response.data);
        keys.forEach((key) => {
            potentials.push(response.data[key]);
        });

        dispatch({
          type: POTENTIALS_FETCH_SUCCESS,
          payload: potentials
        });
      }, (error) => {
        console.log(`API not responding.  Error = ${error}`);
        dispatch({type: POTENTIALS_FETCH_FAILURE});
    });
  };
};

export const currentUserFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: CURRENT_USER_FETCH_START });
    firebase.database().ref(`/user_profiles/${currentUser.uid}`)
      .once('value', snapshot => {
        if (snapshot.val())
          getCurrentPosition({...snapshot.val(), uid: currentUser.uid}, dispatch);
        dispatch({ type: CURRENT_USER_FETCH_SUCCESS, payload: {...snapshot.val(), uid: currentUser.uid } });
      }, (error) => {
        console.log(`Error in currentUserFetch = ${error}`);
      });
  };
};

export const imageLoaded = () => {
  return {
    type: IMAGE_LOADED
  };
};

export const recordView = (cuid, buddyId) => {
  return(dispatch) => {
    const userMatches = firebase.database();
    userMatches.ref(`user_matches/${cuid}/${buddyId}`)
      .update({
        viewed: true,
        viewedDate: firebase.database.ServerValue.TIMESTAMP,
      });
  };
};

export const connectWithUser = (currentUser, buddy, connectStatus) => {
  return(dispatch) => {
    dispatch({
      type: CONNECT_WITH_USER,
      payload: { uid: buddy.uid, name: buddy.name, pic: buddy.pic.url, index: buddy.index }
    });

    const matches = firebase.database();
    matches.ref(`user_matches/${buddy.uid}/${currentUser.uid}`)
      .once('value', snapshot => {
        let otherUserLikesYouToo = false;
        if(snapshot.val())
          otherUserLikesYouToo = snapshot.val().liked;

        matches.ref(`user_matches/${currentUser.uid}/${buddy.uid}`)
          .set({
            otherUserName: buddy.name,
            otherUserPic: buddy.pic.url,
            liked: connectStatus,
            matched: (otherUserLikesYouToo && connectStatus) || false,
            matchedDate: firebase.database.ServerValue.TIMESTAMP,
          });
        if(connectStatus && otherUserLikesYouToo) {
          firebase.database().ref(`user_profiles/${buddy.uid}/status`).once('value').then(snap => {
            if (snap.val() === 'ACTIVE') {
              successfullyConnected(dispatch, buddy, currentUser);
            } else {
              matches.ref(`user_matches/${currentUser.uid}/${buddy.uid}`)
                .set({
                  viewed: true,
                  viewedDate: firebase.database.ServerValue.TIMESTAMP,
                });
            }
          });
        } else if(!currentUser.seenConnectionHelper) {
            Actions.connectionHelper();
            firebase.database().ref(`user_profiles/${currentUser.uid}/seenConnectionHelper`)
              .set(true);
            dispatch({ type: SEEN_CONNECTION_HELPER });
        } else dispatch({ type: KEEP_BROWSING });
      });
  };
};

const successfullyConnected = (dispatch, buddy, currentUser) => {
  let profileImage = DEFAULT_PROFILE_PHOTO;
  if(currentUser && currentUser.profileImages && currentUser.profileImages.length > 0)
    profileImage = currentUser.profileImages[0].url;

  firebase.database().ref(`user_matches/${buddy.uid}/${currentUser.uid}`).update({matched: true});
  firebase.database().ref(`/notifications/new/${buddy.uid}`).set(true);
  firebase.database().ref(`user_matches/${currentUser.uid}/${buddy.uid}/seen`).set(true);

  const convRef = firebase.database().ref(`conversations`).push();
  const convKey = convRef.getKey();
  firebase.database().ref(`message_center/${currentUser.uid}/${buddy.uid}/`)
    .set({
      status: 'ACTIVE',
      otherUserName: buddy.name,
      otherUserPic: buddy.pic.url,
      conversationId: convKey,
      matchedDate: firebase.database.ServerValue.TIMESTAMP
    });
  firebase.database().ref(`message_center/${buddy.uid}/${currentUser.uid}/`)
    .set({
      status: 'ACTIVE',
      otherUserName: currentUser.firstName,
      otherUserPic: profileImage,
      conversationId: convKey,
      matchedDate: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      dispatch({ type: CURRENT_CHAT_FETCH, payload: { chatId: convKey, messages: [], justConnected: true }});
  });

  Actions.connection();
  dispatch({
    type: CONNECTION_SUCCESSFUL
  });
};
