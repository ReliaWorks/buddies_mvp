import _ from 'lodash';
import {
  CHAT_PROFILE_FETCH,
  CHAT_PROFILE_FETCH_SUCCESS,
} from '../actions/types';

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
      const profileImages = action.payload.profileImages;
//      if(action.payload.profileImages) {
//        profileImages = action.payload.profileImages.map((image) => {
//          return { url: image.url };
//        });
//      }
      const firstName = action.payload.first_name;
      const age = action.payload.age;
      const location = action.payload.location;
      const email = action.payload.email;
      let description = '';
      if(action.payload.description) description = action.payload.description;
      return { ...state, firstName, profileImages, age, location, activities: action.payload.activities, affiliations: action.payload.affiliations, description, email, uid: action.payload.uid, loading: false };
    }
    default:
      return state;
  }
};
