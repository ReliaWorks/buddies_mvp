import _ from 'lodash';
import firebase from 'firebase';
import {
  MATCHES_FETCH,
  MATCHES_FETCH_START,
} from './types';

export const matchesFetch = () => {
  return (dispatch) => {
    dispatch({ type: MATCHES_FETCH_START });

    const { currentUser } = firebase.auth();
    firebase.database().ref(`/message_center/${currentUser.uid}`)
      .once('value')
        .then(snapshot => {
          dispatch({ type: MATCHES_FETCH, payload: snapshot.val()});
        });
  };
};
