import {
  ALL_AFFILIATIONS_FETCH,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  icon: '',
  allAffiliations: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_AFFILIATIONS_FETCH: {
      return { ...state, allAffiliations: action.payload };
    }
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
