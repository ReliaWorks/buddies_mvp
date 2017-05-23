import _ from 'lodash';
import firebase from 'firebase';

import {
  FIND_COMMONALITY,
} from './types';

export const findCommonality = (ouid, activities, affiliations) => {
  return (dispatch) => {
    firebase.database().ref(`user_profiles/${ouid}`)
      .once('value', snapshot => {
        //compare activities array with firebase snapshot and return as payload
        // do the same for affiliations
        const otherUserActivities = snapshot.val().activities;
        const commonInterests = [];
        activities.forEach((activity) => {
          _.forEach(otherUserActivities, (otherUserActivity => {
            if(activity.uid === otherUserActivity.uid) {
              commonInterests.push(otherUserActivity);
              return;
            }
          }));
        });
        const otherUserAffiliations = snapshot.val().affiliations;
        affiliations.forEach((affiliation) => {
          _.forEach(otherUserAffiliations, (otherUserAffiliation => {
            if(affiliation.uid === otherUserAffiliation.uid) {
              commonInterests.push(otherUserAffiliation);
              return;
            }
          }));
        });
        dispatch({type: FIND_COMMONALITY, payload: commonInterests});
      });
  };
};
