import {
  CURRENT_USER_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  email: '',
  age: '',
  profileImages: [],
  activities: [],
  affiliations: [],
  location: {},
  description: '',
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENT_USER_FETCH_SUCCESS: {
      let profileImages = [];
      if(action.payload.images) {
        profileImages = action.payload.images.map((image) => {
          return { url: image.url };
        });
      }
      const firstName = action.payload.first_name;
      const age = action.payload.age;
      const location = action.payload.location;
      const email = action.payload.email;
      let activities = [];
      if(action.payload.activities) {
        activities = action.payload.activities.map((activity) => {
          return {
            name: activity.name,
            icon: activity.icon,
          };
        });
      }
      let affiliations = [];
      if(action.payload.affiliations) {
        affiliations = action.payload.affiliations.map((affilliation) => {
          return {
            name: affilliation.name,
            icon: affilliation.icon,
          };
        });
      }
      let description = '';
      if(action.payload.description) description = action.payload.description;
      return { ...state, firstName, profileImages, age, location, activities, affiliations, description, email };
    }
    default:
      return state;
  }
};
