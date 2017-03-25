import firebase from 'firebase';

import {
  ALL_ACTIVITIES_FETCH,
  ALL_AFFILIATIONS_FETCH,
} from './types';

export const activitiesFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/activities')
      .once('value', snapshot => {
        dispatch({ type: ALL_ACTIVITIES_FETCH, payload: snapshot.val() });
      });
  };
};

export const affiliationsFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/affiliations')
      .once('value', snapshot => {
        dispatch({ type: ALL_AFFILIATIONS_FETCH, payload: snapshot.val() });
      });
  };
};
