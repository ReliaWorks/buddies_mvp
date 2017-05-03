import _ from 'lodash';
import {
  CHAT_PROFILE_FETCH,
  CHAT_PROFILE_FETCH_SUCCESS,
  LOGOUT_USER,
} from '../actions/types';
import { ACTIVE } from '../constants';

const INITIAL_STATE = {
  uid: '',
  firstName: '',
  email: '',
  age: '',
  profileImages: [],
  activities: [],
  affiliations: [],
  location: {},
  description: '',
  loading: false,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_PROFILE_FETCH: {
      return { ...state, loading: true };
    }
    case CHAT_PROFILE_FETCH_SUCCESS: {
      const photos = action.payload.profileImages;
      const profileImages = [];
      if(photos) {
        _.map(photos, (img, key) => {
          if(img.status === ACTIVE) {
            profileImages.push({url: img.url, key: key});
          }
        });
      }

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

      const firstName = action.payload.first_name;
      const age = action.payload.age;
      const location = action.payload.location;
      const email = action.payload.email;
      let description = '';
      if(action.payload.description) description = action.payload.description;
      return { ...state, firstName, profileImages, age, location, activities, affiliations, description, email, uid: action.payload.uid, loading: false };
    }
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
