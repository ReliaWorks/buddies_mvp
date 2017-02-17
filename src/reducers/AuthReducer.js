import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  email: '',
  first_name: '',
  error: '',
  loading: false,
  loggedIn: false,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return state;
    case LOGIN_USER:
        return { ...state,
          loading: true,
          error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, loggedIn: true, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    default:
      return state;
  }
};
