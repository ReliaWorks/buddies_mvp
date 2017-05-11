import _ from 'lodash';
import firebase from 'firebase';
import {
  MATCHES_FETCH,
  MATCHES_FETCH_START,
  MATCHES_FETCH_SUCCESS,
  LAST_MESSAGES_FETCH,
} from './types';

export const matchesFetch = () => {
  return (dispatch) => {
    dispatch({ type: MATCHES_FETCH_START });

    const { currentUser } = firebase.auth();
    firebase.database().ref(`/user_matches/${currentUser.uid}`).orderByChild('matched').equalTo(true)
      .once('value')
        .then(snapshot => {
          dispatch({ type: MATCHES_FETCH, payload: snapshot.val()});
          return fetchLastMessages(dispatch);
        })
        .then(() => {
          dispatch({ type: MATCHES_FETCH_SUCCESS });
        });
  };
};

function fetchLastMessages(dispatch) {
  const { currentUser } = firebase.auth();

  return firebase.database().ref(`/user_chats/${currentUser.uid}`)
    .once('value')
      .then(snapshot => {
        return Promise.all(
          _.map(snapshot.val(), (chat, id) => {
            return getLastMsg(id, chat.conversationId, dispatch);
          })
        );
      });
}

const getLastMsg = (otherUserId, conversationId, dispatch) => {
  let resolved = false;
  const { currentUser } = firebase.auth();
  const currentUid = currentUser.uid;
  const myPromise = new Promise((resolve /* add a reject and an error function */) => {
    firebase.database().ref(`/conversations/${conversationId}`)
      .on('value', snapshot => {
        if (!resolved) {
          resolve(msgs);
          resolved = true;
        }
        const msgs = _.map(snapshot.val(), (val, id) => {
          return { ...val, id};
        });
        if(msgs.length > 0) {
          let conversationSeen = false;
          const lastMsg = msgs[msgs.length - 1];
          const uid = lastMsg.user._id;

          firebase.database().ref(`/notifications/conversations/${conversationId}/seen/${currentUid}`)
            .on('value', snap => {
              if (snap.val()) {
                conversationSeen = snap.val() === true;
              }
              dispatch({
                type: LAST_MESSAGES_FETCH,
                payload: { uid: otherUserId,
                           msg: {
                            senderId: uid,
                            text: lastMsg.text,
                            timestamp: lastMsg.createdAt,
                            seen: conversationSeen
                          }}});
          });
        }
      });
  });
  return myPromise;
};
