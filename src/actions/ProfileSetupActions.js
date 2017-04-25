import firebase from 'firebase';
//import { Actions } from 'react-native-router-flux';
import {
  DESCRIPTION_SAVED,
  ACTIVITY_SELECTED,
  ACTIVITY_UNSELECTED,
  ACTIVITIES_SAVED,
  AFFILIATIONS_SAVED,
  AFFILIATION_SELECTED,
  AFFILIATION_UNSELECTED,
  PHOTOS_SAVED,
} from './types';
import { ACTIVE } from '../config';

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

function photosSaved(photos, dispatch) {
  const { currentUser } = firebase.auth();

  const photoObj = {};
  const photoSet = [];
  let i = 0;
  photos.forEach((photo) => {
    photoObj.url = photo;
    photoObj.status = ACTIVE;
    firebase.database().ref(`user_profiles/${currentUser.uid}/profileImages`)
      .push(photoObj)
      .then((snap) => {
        photoSet[snap.key] = photoObj.url;
        i++;
        if(i === photos.length - 1)
          dispatch({ type: PHOTOS_SAVED, payload: photoSet });
      });
  });
}

export const activitiesSaved = (activities, profileImages) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    photosSaved(profileImages, dispatch);
    if(activities && activities.length > 0) {
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
    } else {
      firebase.database().ref(`user_profiles/${currentUser.uid}/activities/`).remove();
      dispatch({ type: ACTIVITIES_SAVED, payload: activities });
    }
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
    if(affiliations && affiliations.length > 0) {
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
    } else {
      firebase.database().ref(`user_profiles/${currentUser.uid}/affiliations/`).remove();
      dispatch({ type: AFFILIATIONS_SAVED, payload: affiliations });
    }
  };
};
