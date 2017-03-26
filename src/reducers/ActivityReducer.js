import {
  ACTIVITY_CREATE,
  ALL_ACTIVITIES_FETCH
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  icon: '',
  allActivities: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVITY_CREATE: {
      return INITIAL_STATE;
    }
    case ALL_ACTIVITIES_FETCH: {
      return { ...state, allActivities: action.payload };
    }
    default:
      return state;
  }
};
