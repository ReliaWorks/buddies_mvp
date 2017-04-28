import _ from 'lodash';
import {
  ALREADY_AUTHENTICATED,
  LOGIN_USER,
  LOGOUT_USER,
  AFFILIATIONS_SAVED,
  CURRENT_USER_FETCH_SUCCESS,
  ACTIVITIES_SAVED,
  ACTIVITY_SELECTED,
  ACTIVITY_UNSELECTED,
  AFFILIATION_SELECTED,
  AFFILIATION_UNSELECTED,
  DESCRIPTION_SAVED,
  SET_CURRENT_LOCATION,
  SET_CURRENT_GEOLOCATION,
  PHOTOS_SAVED,
  PHOTO_REMOVED,
  PICTURE_SAVED,
} from '../actions/types';
import { ACTIVE } from '../constants';

const INITIAL_STATE = {
  uid: '',
  firstName: '',
  email: '',
  age: '',
  profileImages: [],
  activities: {},
  affiliations: {},
  location: {}, // location: { city: 'San Francisco, CA', distance: '4 miles' };
  geolocation: {},
  description: '',
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALREADY_AUTHENTICATED: {
      return { ...state, uid: action.payload.uid };
    }
    case LOGIN_USER: {
      let id = '';
      if(action.payload) id = action.payload.uid;
      return { ...state, uid: id };
    }
    case CURRENT_USER_FETCH_SUCCESS: {
      const photos = action.payload.profileImages;
      const profileImages = [];
      if(photos) {
        _.map(photos, (img, key) => {
          if(img.status === ACTIVE) {
            profileImages.push({url: img.url, key: key});
          }
        });
      }
      const firstName = action.payload.first_name;
      const age = action.payload.age;
      const email = action.payload.email;
      const activities = [];
      if(action.payload.activities) {
        _.forEach(action.payload.activities, (activity) => {
          if(activity) {
            activities.push({
              name: activity.name,
              icon: activity.icon,
              uid: activity.uid,
            });
          }
        });
      }

      const affiliations = [];
      if(action.payload.affiliations) {
        _.forEach(action.payload.affiliations, (affiliation) => {
          if(affiliation) {
            affiliations.push({
              name: affiliation.name,
              icon: affiliation.icon,
              uid: affiliation.uid,
            });
          }
        });
      }

      let description = '';
      if(action.payload.description) description = action.payload.description;
      return { ...state, firstName, profileImages, age, activities, affiliations, description, email, uid: action.payload.uid };
    }
    case ACTIVITY_SELECTED: {
      const updatedActivities = [...state.activities, action.payload];
      return { ...state, activities: updatedActivities };
    }
    case ACTIVITY_UNSELECTED: {
      const uid = action.payload.uid;
      const updatedActivityList = state.activities.filter(
        (item) => item.uid !== uid);
      return { ...state, activities: updatedActivityList };
    }
    case ACTIVITIES_SAVED: {
      const updatedActivities = [];
      if(action.payload) {
        _.forEach(action.payload, (activity) => {
          if(activity) {
            updatedActivities.push({
              name: activity.name,
              icon: activity.icon,
              uid: activity.uid,
            });
          }
        });
      }

      return { ...state, activities: updatedActivities };
    }
    case AFFILIATION_SELECTED: {
      const updatedAffiliations = [...state.affiliations, action.payload];
      return { ...state, affiliations: updatedAffiliations };
    }
    case AFFILIATION_UNSELECTED: {
      const uid = action.payload.uid;
      const updatedAffiliationList = state.affiliations.filter(
        (item) => item.uid !== uid);
      return { ...state, affiliations: updatedAffiliationList };
    }
    case AFFILIATIONS_SAVED: {
      const updatedAffiliations = [];
      if(action.payload) {
        _.forEach(action.payload, (affiliation) => {
          if(affiliation) {
            updatedAffiliations.push({
              name: affiliation.name,
              icon: affiliation.icon,
              uid: affiliation.uid,
            });
          }
        });
      }

      return { ...state, affiliations: updatedAffiliations };
    }
    case DESCRIPTION_SAVED: {
      return { ...state, description: action.payload };
    }
    case PHOTOS_SAVED: {
      let photos = state.profileImages;
      debugger;
      if(action.payload)
        photos = action.payload;
      return { ...state, profileImages: photos };
    }
    case PHOTO_REMOVED: {
      let profileImages = state.profileImages;
      if(action.payload) {
        profileImages = profileImages.filter((image) => {
          return(image.key !== action.payload.key);
        });
      }
      return {...state, profileImages};
    }
    case PICTURE_SAVED: {
      let updatedImages = [];
      if(state.profileImages) {
        updatedImages = [...state.profileImages, action.payload];
      } else {
        updatedImages.push(action.payload);
      }
      return { ...state, profileImages: updatedImages };
    }
    case SET_CURRENT_GEOLOCATION: {
      return { ...state, geolocation: action.payload };
    }
    case SET_CURRENT_LOCATION: {
      return { ...state, location: action.payload };
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
