import _ from 'lodash';
import firebase from 'firebase';
import { DEFAULT_PROFILE_PHOTO } from '../constants';
import {
  CHAT_SELECTED,
  CHAT_PROFILE_FETCH,
  CHAT_PROFILE_FETCH_SUCCESS,
  CURRENT_CHAT_FETCH,
  CLOSE_CONVERSATION
} from './types';

export const updateConversationNotifications = (conversationId, uid, otherUserId) => {
  const fb = firebase.database();
  return (dispatch) => {
    fb.ref(`/notifications/conversations/${conversationId}/seen/${uid}`).set(true);
    fb.ref(`/message_center/${uid}/${otherUserId}/seen/`).set(true);
  };
};

export const updateMessageCenterNotification = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/notifications/new/${uid}`).set(false);
  };
};

let currentChatFetchOff = function () {};

export const fetchConversation = (connection, currentUser) => {
  return (dispatch) => {
    getConversationId(connection.selectedConversationId, currentUser.uid, connection.selectedMatchId).then(conversationId => {
      currentChatFetchOff = firebase.database().ref(`/conversations/${conversationId}`)
        .on('value', snap => {
          dispatch({
            type: CURRENT_CHAT_FETCH,
            payload: {
              chatId: connection.selectedConversationId,
              messages: _.map(snap.val()).reverse(),
              justConnected: false,
              currentUser,
              connection
            }
          });
        });
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

export const selectChat = (uid, name, avatar, conversationId) => {
  return ({
    type: CHAT_SELECTED,
    payload: { uid, name, avatar, conversationId }
  });
};

export const saveMessage = (msg, currentUser, otherUser, chatIdParam, messages) => {
  const firstName = currentUser.firstName;

  return (dispatch) => {
    getConversationId(chatIdParam, currentUser.uid, otherUser.selectedMatchId).then(chatId => {
      let profileImage = DEFAULT_PROFILE_PHOTO;
      if(currentUser.profileImages && currentUser.profileImages.length > 0)
        profileImage = currentUser.profileImages[0].url;
      const user = {...msg.user,
        name: firstName,
        avatar: profileImage
      };
      const m1 = {...msg,
        otherUserId: otherUser.selectedMatchId,
        otherUserName: otherUser.selectedMatchName,
        otherUserPic: otherUser.selectedMatchPic,
        user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      };
      firebase.database().ref(`conversations/${chatId}`)
        .push(m1)
        .then(() => {
          firebase.database().ref(`/notifications/conversations/${chatId}/seen/${otherUser.selectedMatchId}`).set(false);
          firebase.database().ref(`/notifications/new/${otherUser.selectedMatchId}`).set(true);
        });
      firebase.database().ref(`/message_center/${currentUser.uid}/${otherUser.selectedMatchId}/`)
        .set({
          text: m1.text,
          user: {name: m1.user.name, avatar: m1.user.avatar},
          createdAt: m1.createdAt,
          otherUserId: otherUser.selectedMatchId,
          otherUserName: otherUser.selectedMatchName,
          otherUserPic: otherUser.selectedMatchPic,
          conversationId: chatId,
          seen: true
        })
        .then(() => {
          console.log("Wrote to firebase message_center");
        });
      firebase.database().ref(`/message_center/${otherUser.selectedMatchId}/${currentUser.uid}/`)
        .set({
          text: m1.text,
          user: {name: m1.user.name, avatar: m1.user.avatar},
          createdAt: m1.createdAt,
          otherUserName: currentUser.firstName,
          otherUserId: currentUser.uid,
          otherUserPic: profileImage,
          conversationId: chatId,
          seen: false
        })
        .then(() => {
          console.log("Wrote to firebase message_center");
        });
    });
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

const getConversationId = (conversationId, currentUserId, otherUserId) => {
  if (conversationId) {
    return new Promise((resolve, reject) => {
      resolve(conversationId);
    });
  } else {
    return firebase.database().ref('message_center/' + currentUserId + '/' + otherUserId + '/conversationId')
    .once('value')
    .then(conversationIdSnap => {
      return conversationIdSnap.val();
    });
  }
};
