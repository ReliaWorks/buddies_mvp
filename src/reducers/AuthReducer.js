import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_FB_SUCCESS,
  LOGIN_USER,
  CREATE_USER,
  PROFILE_INFO,
  PROFILE_PIC
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  email: '',
  first_name: '',
  newUser: true,
  error: '',
  fbtoken: null,
  loading: false,
  user_profile: null,
  profile_pics:[]
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, user: action.payload, newUser: false };
    case PROFILE_INFO:
      return { ...state, user_profile: action.payload };
    case LOGIN_USER:
        return { ...state,
          loading: true,
          error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload };
    case PROFILE_PIC:
      return {...state, profile_pics: profile_pics.push(action.payload)};
    case LOGIN_FB_SUCCESS:
      return { ...state, fbtoken: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    default:
      return state;
  }
};
