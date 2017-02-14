import firebase from 'firebase';
//import { Actions } from 'react-native-router-flux';
import {
//  ACTIVITY_UPDATE,
//  ACTIVITY_CREATE,
  ACTIVITIES_FETCH_SUCCESS,
//  ACTIVITY_SAVE_SUCCESS
} from './types';

export const activitiesFetch = () => {
  const { currentUser } = firebase.auth();
  console.log(`currentUser =${currentUser}`);
  return (dispatch) => {
    console.log(`In activities fetch`);
    firebase.database().ref(`/users/123/activities`)
      .on('value', snapshot => {
        dispatch({ type: ACTIVITIES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
