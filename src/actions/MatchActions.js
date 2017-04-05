import _ from 'lodash';
import firebase from 'firebase';
import {
  MATCHES_FETCH,
  LAST_MESSAGES_FETCH,
} from './types';

export const matchesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/user_matches/${currentUser.uid}`).orderByChild('matched').equalTo(true)
      .on('value', snapshot => {
        dispatch({ type: MATCHES_FETCH, payload: snapshot.val()});
      });
  };
};

const getLastMsg = (otherUserId, conversationId, dispatch) => {
  firebase.database().ref(`/conversations/${conversationId}`)
    .on('value', snapshot => {
      const msgs = _.map(snapshot.val(), (val, id) => {
        return { ...val, id};
      });
      if(msgs.length > 0) {
        const lastMsg = msgs[msgs.length - 1];
        const uid = lastMsg.user._id;
        dispatch({
          type: LAST_MESSAGES_FETCH,
          payload: { uid: otherUserId,
                     msg: { senderId: uid, text: lastMsg.text }}});
      }
    });
};

export const fetchLastMessages = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    //query firebase for all user_chats that have uid prefix, then find last item.text and push to end of messages array.
    firebase.database().ref(`/user_chats/${currentUser.uid}`)
      .on('value', snapshot => {
        _.forEach(snapshot.val(), (chat, id) => {
          getLastMsg(id, chat.conversationId, dispatch);
        });
      });
  };
};
