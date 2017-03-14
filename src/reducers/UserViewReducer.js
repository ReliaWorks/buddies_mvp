import {
  CURRENT_USER_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
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
      const profileImages = [
        { url: action.payload.images[0].url },
        { url: action.payload.images[1].url },
        { url: action.payload.images[2].url },
        { url: action.payload.images[3].url },
      ];
      const firstName = action.payload.first_name;
      const age = action.payload.age;
      const location = action.payload.location;
      const activities = action.payload.activities;
      const affiliations = action.payload.affiliations;
      const description = action.payload.description;
      return { ...state, firstName, profileImages, age, location, activities, affiliations, description };
    }
    default:
      return state;
  }
};
