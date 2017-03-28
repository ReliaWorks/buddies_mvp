import {
  LOGIN_USER,
  AFFILIATIONS_SAVED,
  CURRENT_USER_FETCH_SUCCESS,
  ACTIVITIES_SAVED,
  ACTIVITY_SELECTED,
  ACTIVITY_UNSELECTED,
  AFFILIATION_SELECTED,
  AFFILIATION_UNSELECTED,
  DESCRIPTION_SAVED,
} from '../actions/types';

const INITIAL_STATE = {
  uid: '',
  firstName: '',
  email: '',
  age: '',
  profileImages: [],
  activities: {},
  affiliations: {},
  location: {},
  description: '',
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      let id = '';
      if(action.payload) id = action.payload.uid;
      return { ...state, uid: id };
    }
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
      return { ...state, firstName, profileImages, age, location, activities, affiliations, description, email, uid: action.payload.uid };
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
      return { ...state, activities: action.payload };
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
      return { ...state, affiliations: action.payload };
    }
    case DESCRIPTION_SAVED: {
      return { ...state, description: action.payload };
    }
    default:
      return state;
  }
};
