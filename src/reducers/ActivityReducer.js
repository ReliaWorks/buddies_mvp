import {
  ACTIVITY_CREATE,
  ALL_ACTIVITIES_FETCH,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  allActivities: [],
  fetchedAllActivities: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVITY_CREATE: {
      return INITIAL_STATE;
    }
    case ALL_ACTIVITIES_FETCH: {
      return { ...state, allActivities: action.payload, fetchedAllActivities: true };
    }
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
