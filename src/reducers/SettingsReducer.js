import { LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = {
  genderPreference: 'all',
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGOUT_USER:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
