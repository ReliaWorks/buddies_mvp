import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SELECT_PIC,
  SAVE_PICS,
  DESCRIPTION_SAVED,
  ACTIVITY_SELECTED,
  ACTIVITIES_SAVED,
  AFFILIATIONS_SAVED,
  AFFILIATION_SELECTED,
} from './types';

export const addPic = (url) => {
  console.log("Action url");
  console.log(url);
  return (dispatch) => {
    dispatch({
      type: SELECT_PIC,
      payload: url
    });
  };
};

export const savePics = (selectedPics) => {
  const { currentUser } = firebase.auth();

  const profileImages = [];
  Object.keys(selectedPics).forEach(key => {
    profileImages.push(key);
  });

  return (dispatch) => {
    firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`)
      .set(profileImages)
      .then(() => {
        dispatch({ type: SAVE_PICS });
        Actions.activitySetup();
      });
  };
};

export const profileSaved = (currentUserId, activities, affiliations, description, profileImages) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`user_profiles/${currentUser.uid}/description`)
      .set(description);
    firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`)
      .set(profileImages);
    firebase.database().ref(`user_profiles/${currentUser.uid}/affiliations`)
      .set(affiliations);
    firebase.database().ref(`user_profiles/${currentUser.uid}/activities`)
      .set(activities);
    Actions.profileSetupComplete();
  };
};

export const descriptionSaved = (text) => {
  return {
    type: DESCRIPTION_SAVED,
    payload: text
  };
};

export const activitySelected = (id) => {
  return {
    type: ACTIVITY_SELECTED,
    payload: id
  };
};

export const activitiesSaved = (activities) => {
  return {
    type: ACTIVITIES_SAVED,
    payload: activities
  };
};

export const affiliationSelected = (id) => {
  return {
    type: AFFILIATION_SELECTED,
    payload: id
  };
};

export const affiliationsSaved = (affiliations) => {
  return {
    type: AFFILIATIONS_SAVED,
    payload: affiliations
  };
};
