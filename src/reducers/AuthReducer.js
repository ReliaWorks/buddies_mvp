import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_FB_SUCCESS,
  LOGIN_USER,
  CREATE_USER
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  email: '',
  first_name: '',
  newUser: true,
  error: '',
  fbtoken: null,
  loading: false,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, loading: true, user: action.payload, newUser: false };
    case LOGIN_USER:
        return { ...state,
          loading: true,
          error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_FB_SUCCESS:
      return { ...state, ...INITIAL_STATE, fbtoken: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    default:
      return state;
  }
};
