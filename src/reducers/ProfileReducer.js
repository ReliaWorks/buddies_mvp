import {
  AFFILIATIONS_SAVED,
  CURRENT_USER_FETCH_SUCCESS,
  DESCRIPTION_SAVED,
} from '../actions/types';

const INITIAL_STATE = {
  uid: 'EEUpUy692aTXpRJN16TjXbZxmVT2',
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
      const profileImages = action.payload.profileImages;
//    let profileImages = [];  
      if(action.payload.profileImages) {
//        profileImages = action.payload.profileImages.map((image) => {
//          return { url: image.url };
//        });
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
    case AFFILIATIONS_SAVED: {
      return state;
    }
    case DESCRIPTION_SAVED: {
      console.log("In ProfileReducer");
      console.log(action.payload);
      console.log(state);
      return { ...state, description: action.payload };
    }
    default:
      return state;
  }
};
