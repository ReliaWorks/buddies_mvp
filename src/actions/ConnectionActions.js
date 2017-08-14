import _ from 'lodash';
import firebase from 'firebase';
import axios from 'axios';
import {
  FIND_COMMONALITY,
  EVENT_FETCH_START,
  EVENT_FETCH_SUCCESS,
  EVENT_FETCH_FAILURE,
} from './types';
import { API_SECRET_KEY } from '../config';

const jsSHA = require("jssha");

export const findEvent = (ouid) => {
  return (dispatch) => {
    dispatch({type: EVENT_FETCH_START});

    const { currentUser } = firebase.auth();
    if(!currentUser) {
      dispatch({ type: EVENT_FETCH_FAILURE });
      Actions.login();
    }
    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(API_SECRET_KEY + currentUser.uid);
    const hash = shaObj.getHash("HEX");

    axios.get(`https://activities-test-a3871.appspot.com/match_event/${currentUser.uid}/${ouid}`, {
      headers: { authorization: `${hash}:${currentUser.uid}`}
    })
      .then(response => {
        const event = response.data;

        dispatch({
          type: EVENT_FETCH_SUCCESS,
          payload: event
        });
      }, (error) => {
        console.log(`Event API not responding.  Error = ${error}`);
        dispatch({type: EVENT_FETCH_FAILURE});
    });
  };
};

export const findCommonality = (ouid, activities, affiliations) => {
  return (dispatch) => {
    firebase.database().ref(`user_profiles/${ouid}`)
      .once('value', snapshot => {
        //compare activities array with firebase snapshot and return as payload
        // do the same for affiliations
        const otherUserActivities = snapshot.val().activities;
        const commonInterests = [];
        if(activities) {
          activities.forEach((activity) => {
            _.forEach(otherUserActivities, (otherUserActivity => {
              if(activity.uid === otherUserActivity.uid) {
                if(activity.attribute === otherUserActivity.attribute)
                  commonInterests.push(otherUserActivity);
                else commonInterests.push({icon: activity.icon, name: activity.name, uid: activity.uid});
                return;
              }
            }));
          });
        }
        const otherUserAffiliations = snapshot.val().affiliations;
        if(affiliations) {
          affiliations.forEach((affiliation) => {
            _.forEach(otherUserAffiliations, (otherUserAffiliation => {
              if(affiliation.uid === otherUserAffiliation.uid) {
                commonInterests.push(otherUserAffiliation);
                return;
              }
            }));
          });
        }
        dispatch({type: FIND_COMMONALITY, payload: commonInterests});
      });
  };
};
