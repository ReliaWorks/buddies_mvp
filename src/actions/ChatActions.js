import _ from 'lodash';
import firebase from 'firebase';
import { DEFAULT_PROFILE_PHOTO } from '../config';
import {
  CHAT_SELECTED,
  CHAT_PROFILE_FETCH,
  CHAT_PROFILE_FETCH_SUCCESS,
  CURRENT_CHAT_FETCH,
  MESSAGE_SENT,
} from './types';

export const fetchConversation = (otherUserId) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    const chatRef = firebase.database().ref(`/user_chats/${currentUser.uid}/${otherUserId}`);
    chatRef.on('value', snapshot => {
      if(snapshot.val()) {
        const conversationId = snapshot.val().conversationId;
        firebase.database().ref(`/conversations/${conversationId}`)
          .on('value', snap => {
            dispatch({
              type: CURRENT_CHAT_FETCH,
              payload: { chatId: conversationId, messages: _.map(snap.val()).reverse() }
            });
          });
      } else {
        //Conversation doesn't exist and create one
        const convRef = firebase.database().ref(`conversations`).push();
        firebase.database().ref(`user_chats/${currentUser.uid}/${otherUserId}`)
          .set({conversationId: convRef.getKey()})
          .then(() => {
            firebase.database().ref(`user_chats/${otherUserId}/${currentUser.uid}`)
              .set({conversationId: convRef.getKey()})
              .then(() => {
                dispatch({ type: CURRENT_CHAT_FETCH, payload: { chatId: convRef.getKey(), messages: [] }});
              });
          });
      }
    });
  };
};

export const chatProfileFetch = (uid) => {
  return (dispatch) => {
    dispatch({type: CHAT_PROFILE_FETCH});
    firebase.database().ref(`user_profiles/${uid}`)
      .once('value', snapshot => {
        dispatch({ type: CHAT_PROFILE_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};

export const selectChat = (uid, name, avatar) => {
  return ({
    type: CHAT_SELECTED,
    payload: { uid, name, avatar }
  });
};

export const saveMessage = (msg, currentUser, otherUser, chatId, messages) => {
  const firstName = currentUser.firstName;

  return (dispatch) => {
    if(chatId) {
      let profileImage = DEFAULT_PROFILE_PHOTO;
      if(currentUser.profileImages) profileImage = currentUser.profileImages[0];
      const user = {...msg.user, name: firstName, avatar: profileImage};
      const m1 = {...msg, user, createdAt: firebase.database.ServerValue.TIMESTAMP};
      firebase.database().ref(`conversations/${chatId}`)
        .push(m1)
        .then(() => {
          dispatch({
            type: MESSAGE_SENT,
            payload: { msg, otherUserId: otherUser.selectedMatchId, messages }
          });
        });
    }
  };
};
