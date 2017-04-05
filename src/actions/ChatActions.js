import _ from 'lodash';
import firebase from 'firebase';
import {
  CHAT_SELECTED,
  CURRENT_CHAT_FETCH,
  MESSAGE_SENT,
} from './types';

export const fetchConversation = (otherUserId) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    const chatRef = firebase.database().ref(`/user_chats/${currentUser.uid}/${otherUserId}`);
    chatRef.once('value', snapshot => {
      if(snapshot.val()) {
        const conversationId = snapshot.val().conversationId;
        firebase.database().ref(`/conversations/${conversationId}`)
          .once('value', snap => {
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
      const user = {...msg.user, name: firstName, avatar: currentUser.profileImages[0]};
      const m1 = {...msg, user, createdAt: firebase.database.ServerValue.TIMESTAMP};
      firebase.database().ref(`conversations/${chatId}`)
        .push(m1)
        .then(() => {
          debugger;
          dispatch({
            type: MESSAGE_SENT,
            payload: { msg, otherUserId: otherUser.selectedMatchId, messages }
          });
        });
    }
  };
};
