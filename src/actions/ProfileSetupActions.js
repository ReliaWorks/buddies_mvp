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
  AFFILIATION_UNSELECTED,
} from './types';

export const addPic = (url) => {
  return {
      type: SELECT_PIC,
      payload: url
    };
};

export const savePics = (selectedPics) => {
  const { currentUser } = firebase.auth();

  const profileImages = [];
  Object.keys(selectedPics).forEach(key => {
    profileImages.push(key);
  });

//  if(!profileImages || profileImages.length === 0) profileImages.push(DEFAULT_PROFILE_PHOTO);
  return (dispatch) => {
    firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`)
      .set(profileImages)
      .then(() => {
        dispatch({ type: SAVE_PICS });
        Actions.activitySetup();
      });
  };
};

export const descriptionSaved = (text) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`user_profiles/${currentUser.uid}/description`)
      .set(text)
      .then(() => {
        dispatch({ type: DESCRIPTION_SAVED, payload: text });
      });
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
    firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`)
      .set(profileImages);
    activities.forEach((activity, index) => {
      firebase.database().ref(`user_profiles/${currentUser.uid}/activities/`)
        .remove()
        .then(() => {
          firebase.database().ref(`user_profiles/${currentUser.uid}/activities/${activity.uid}`)
            .set({name: activity.name, icon: activity.icon, uid: activity.uid})
            .then(() => {
              if(index === activities.length - 1)
                dispatch({ type: ACTIVITIES_SAVED, payload: activities });
            });
        });
      });
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

export const affiliationRemoved = (id) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`user_profiles/${currentUser.uid}/affiliations/${id}`)
      .remove()
      .then(() => {
        dispatch({ type: AFFILIATION_UNSELECTED, payload: {uid: id}});
      })
      .catch((error) => {
        console.log(`Remove failed error = ${error}`);
      });
  };
};

export const activityRemoved = (id) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`user_profiles/${currentUser.uid}/activities/${id}`)
      .remove()
      .then(() => {
        dispatch({ type: ACTIVITY_UNSELECTED, payload: {uid: id}});
      })
      .catch((error) => {
        console.log(`Remove failed error = ${error}`);
      });
  };
};

export const affiliationsSaved = (affiliations) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    affiliations.forEach((affiliation, index) => {
      firebase.database().ref(`user_profiles/${currentUser.uid}/affiliations/`)
        .remove()
        .then(() => {
          firebase.database().ref(`user_profiles/${currentUser.uid}/affiliations/${affiliation.uid}`)
            .set({name: affiliation.name, icon: affiliation.icon, uid: affiliation.uid})
            .then(() => {
              if(index === affiliations.length - 1)
                dispatch({ type: AFFILIATIONS_SAVED, payload: affiliations });
            });
        });
      });
  };
};
