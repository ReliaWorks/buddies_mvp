import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SELECT_PIC,
  SAVE_PICS,
  DESCRIPTION_SAVED,
  ACTIVITY_SELECTED,
  ACTIVITY_UNSELECTED,
  ACTIVITIES_SAVED,
  AFFILIATIONS_SAVED,
  AFFILIATION_SELECTED,
} from './types';

export const addPic = (url) => {
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

export const profileSaved = (currentUserId, description) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`user_profiles/${currentUser.uid}/description`)
      .set(description);
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

export const activityUnselected = (id) => {
  return {
    type: ACTIVITY_UNSELECTED,
    payload: id
  };
};

export const activitiesSaved = (activities, profileImages) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: ACTIVITIES_SAVED, payload: activities });
    firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`)
      .set(profileImages);
    firebase.database().ref(`user_profiles/${currentUser.uid}/activities`)
      .set(activities);
  };
};

export const affiliationSelected = (id) => {
  return {
    type: AFFILIATION_SELECTED,
    payload: id
  };
};

export const affiliationUnselected = (id) => {
  return {
    type: AFFILIATION_UNSELECTED,
    payload: id
  };
};

export const affiliationsSaved = (affiliations) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: AFFILIATIONS_SAVED, payload: affiliations });
    firebase.database().ref(`user_profiles/${currentUser.uid}/affiliations`)
      .set(affiliations);
  };
};
