import firebase from 'firebase';
import {
  DESCRIPTION_SAVED,
  ACTIVITY_SELECTED,
  ACTIVITY_UNSELECTED,
  ACTIVITY_EDITED,
  ACTIVITIES_SAVED,
  AFFILIATIONS_SAVED,
  AFFILIATION_SELECTED,
  AFFILIATION_UNSELECTED,
  PHOTOS_SAVED,
} from './types';
import { ACTIVE } from '../constants';

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
  return (dispatch) => {
    dispatch({type: ACTIVITY_SELECTED, payload: id});
  };
};

export const activityUnselected = (id) => {
  return (dispatch) => {
    dispatch({type: ACTIVITY_UNSELECTED, payload: id});
  };
};

export const photosSaved = (photos) => {
  return (dispatch) => {
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
  };
};

export const activitiesSaved = (activities) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    if(activities && activities.length > 0) {
      firebase.database().ref(`user_profiles/${currentUser.uid}/activities/`)
        .remove()
        .then(() => {
          const updates = {};

          activities.forEach((activity, index) => {
              updates[`user_profiles/${currentUser.uid}/activities/${activity.uid}/uid`] = activity.uid;
              updates[`user_profiles/${currentUser.uid}/activities/${activity.uid}/name`] = activity.name;
              updates[`user_profiles/${currentUser.uid}/activities/${activity.uid}/icon`] = activity.icon;
              updates[`user_profiles/${currentUser.uid}/activities/${activity.uid}/attribute`] = activity.attribute;
          });

          firebase.database().ref().update(updates).then(() => {
            dispatch({ type: ACTIVITIES_SAVED, payload: activities });
          });
        });
    } else {
      firebase.database().ref(`user_profiles/${currentUser.uid}/activities/`).remove();
      dispatch({ type: ACTIVITIES_SAVED, payload: activities });
    }
  };
};
export const activityEdited = (activity) => {
  const { currentUser } = firebase.auth();
  const {uid, attribute} = activity;

  return (dispatch) => {
    const updates = {};
    updates[`user_profiles/${currentUser.uid}/activities/${uid}`] = activity;

    dispatch({ type: ACTIVITY_EDITED, payload: {uid, attribute} });
    firebase.database().ref().update(updates);
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
      firebase.database().ref(`user_profiles/${currentUser.uid}/affiliations/`)
        .remove()
        .then(() => {
          const updates = {};

          affiliations.forEach((affiliation, index) => {
            updates[`user_profiles/${currentUser.uid}/affiliations/${affiliation.uid}/name`] = affiliation.name;
            updates[`user_profiles/${currentUser.uid}/affiliations/${affiliation.uid}/icon`] = affiliation.icon;
            updates[`user_profiles/${currentUser.uid}/affiliations/${affiliation.uid}/uid`] = affiliation.uid;
          });

          firebase.database().ref().update(updates).then(() => {
            dispatch({ type: AFFILIATIONS_SAVED, payload: affiliations });
          });
        });
    } else {
      firebase.database().ref(`user_profiles/${currentUser.uid}/affiliations/`).remove();
      dispatch({ type: AFFILIATIONS_SAVED, payload: affiliations });
    }
  };
};
