import _ from 'lodash';
import firebase from 'firebase';
import {
  MATCHES_FETCH,
  MATCHES_FETCH_SUCCESS,
  LAST_MESSAGES_FETCH,
} from './types';

export const matchesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/user_matches/${currentUser.uid}`).orderByChild('matched').equalTo(true)
      .once('value', snapshot => {
        dispatch({ type: MATCHES_FETCH, payload: snapshot.val()});
        fetchLastMessages(dispatch);
      })
      .then(() => {
        dispatch({ type: MATCHES_FETCH_SUCCESS });
      });
  };
};

function fetchLastMessages(dispatch) {
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/user_chats/${currentUser.uid}`)
    .once('value', snapshot => {
      _.forEach(snapshot.val(), (chat, id) => {
        console.log(`chat = ${chat.conversationId} and id = ${id}`);
        getLastMsg(id, chat.conversationId, dispatch);
      });
    });
}

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
                     msg: {
                      senderId: uid,
                      text: lastMsg.text,
                      timestamp: lastMsg.createdAt,
                      seen: lastMsg.seen === true
                    }}});
      }
    });
};
