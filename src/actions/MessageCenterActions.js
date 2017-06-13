import _ from 'lodash';
import firebase from 'firebase';
import {
  MATCHES_FETCH,
  MATCHES_FETCH_START,
  MATCHES_FETCH_FAIL,
} from './types';

export const matchesFetch = () => {
  return (dispatch) => {
    dispatch({ type: MATCHES_FETCH_START });

    const { currentUser } = firebase.auth();
    firebase.database().ref(`/message_center/${currentUser.uid}`)
      .orderByChild('status')
      .equalTo('ACTIVE')
      .on('value', snapshot => {
        console.log('matches:', snapshot.val());
        if(!snapshot.val())
          dispatch({ type: MATCHES_FETCH_FAIL});
        else dispatch({ type: MATCHES_FETCH, payload: snapshot.val()});
      });
  };
};
