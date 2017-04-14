//import { DEFAULT_PROFILE_PHOTO } from '../config';
import {
  ALREADY_AUTHENTICATED,
  NOT_ALREADY_AUTHED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  PROFILE_INFO,
  PROFILE_PIC,
  SELECT_PIC
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  email: '',
  first_name: '',
  newUser: true,
  token: null,
  loading: false,
  profile_pics: [],
  selectedPics: {},
  loggedIn: false,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALREADY_AUTHENTICATED: {
      return { ...state, token: action.payload.token, loggedIn: true, loading: false };
    }
    case NOT_ALREADY_AUTHED: {
      return { ...state, loading: false, loggedIn: false };
    }
    case LOGIN_USER:
        return { ...state, loading: true, loggedIn: true };
    case LOGIN_USER_SUCCESS: {
      return { ...state, loading: false, loggedIn: true };
    }
    case LOGOUT_USER:
        return INITIAL_STATE;
    case SELECT_PIC: {
      const selectedPics = Object.assign({}, state.selectedPics);
      if (!selectedPics[action.payload]) selectedPics[action.payload] = true;
      return { ...state, selectedPics: selectedPics };
    }
    case PROFILE_INFO:
      return { ...state, user: action.payload, email: action.payload.email, first_name: action.payload.first_name, };
    case PROFILE_PIC: {
      const pics = state.profile_pics.slice();
      pics.push(action.payload);
      return {...state, profile_pics: pics};
    }
    default:
      return state;
  }
};
