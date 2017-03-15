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
      let age = '';
      if(action.payload.age) age = action.payload.age;
      let location = {
        city: '',
        distance: ''
      };
      if(action.payload.location) location = action.payload.location;
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
      if(description) description = action.payload.description;
      console.log(action.payload);
      return { ...state, firstName, profileImages, age, location, activities, affiliations, description };
    }
    default:
      return state;
  }
};
