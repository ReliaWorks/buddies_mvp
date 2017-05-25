import _ from 'lodash';
import firebase from 'firebase';
import { DEFAULT_PROFILE_PHOTO } from '../constants';
import {
  CHAT_SELECTED,
  CHAT_PROFILE_FETCH,
  CHAT_PROFILE_FETCH_SUCCESS,
  CURRENT_CHAT_FETCH,
  MESSAGE_SENT,
  CLOSE_CONVERSATION
} from './types';

export const updateConversationNotifications = (conversationId, uid, otherUserId) => {
  const fb = firebase.database();
  return (dispatch) => {
    fb.ref(`/notifications/conversations/${conversationId}/seen/${uid}`).set(true);
    fb.ref(`/user_matches/${uid}/${otherUserId}/seen/`).set(true);
  };
};

export const updateMessageCenterNotification = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/notifications/new/${uid}`).set(false);
  };
};

let currentChatFetchOff = function () {};

export const fetchConversation = (otherUserId) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    const chatRef = firebase.database().ref(`/user_chats/${currentUser.uid}/${otherUserId}`);
    chatRef.once('value', snapshot => {
      if(snapshot.val()) {
        const conversationId = snapshot.val().conversationId;
        console.log(`In Fetch Conversation with chatid = ${conversationId}`);

        currentChatFetchOff = firebase.database().ref(`/conversations/${conversationId}`)
          .on('value', snap => {
            dispatch({
              type: CURRENT_CHAT_FETCH,
              payload: { chatId: conversationId, messages: _.map(snap.val()).reverse(), justConnected: false }
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
                dispatch({ type: CURRENT_CHAT_FETCH, payload: { chatId: convRef.getKey(), messages: [], justConnected: true }});
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
      if(currentUser.profileImages) profileImage = currentUser.profileImages[0].url;
      const user = {...msg.user,
        name: firstName,
        avatar: profileImage
      };
      const m1 = {...msg,
        user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        receiverId: otherUser.selectedMatchId
      };
      firebase.database().ref(`conversations/${chatId}`)
        .push(m1)
        .then(() => {
          dispatch({
            type: MESSAGE_SENT,
            payload: { msg, otherUserId: otherUser.selectedMatchId, messages }
          });
          firebase.database().ref(`/notifications/conversations/${chatId}/seen/${otherUser.selectedMatchId}`).set(false);
          firebase.database().ref(`/notifications/new/${otherUser.selectedMatchId}`).set(true);
        });
    }
  };
};

export const closeConversation = (conversationId) => {
  return (dispatch) => {
    firebase.database().ref(`/conversations/${conversationId}`).off('value', currentChatFetchOff);
    dispatch({
      type: CLOSE_CONVERSATION,
      payload: { }
    });
  };
};
