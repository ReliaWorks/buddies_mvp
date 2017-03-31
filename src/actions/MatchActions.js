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

export const fetchLastMessages = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const chatsRef = firebase.database().ref(`/user_chats`);
    //query firebase for all user_chats that have uid prefix, then find last item.text and push to end of messages array.
    //
    //orderByKey().limitToLast(1);
    chatsRef.orderByKey().startAt(currentUser.uid).endAt(`${currentUser.uid}\uf8ff`)
      .on('child_added', snapshot => {
        const keys = snapshot.key.split(' - ');
        const otherUserId = keys[1];
        _.map(snapshot.val(), (message, id) => {
          dispatch({ type: LAST_MESSAGES_FETCH, payload: { uid: otherUserId, msg: message.text }});
        });
      });
  };
};
