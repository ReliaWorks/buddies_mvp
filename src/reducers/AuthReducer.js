import {
  ALREADY_AUTHENTICATED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  PROFILE_INFO,
  SELECT_PIC,
  LOGIN_USER_REQUESTED,
  LOGIN_USER_CANCELLED
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  email: '',
  first_name: '',
  newUser: true,
  token: null,
  loading: false,
  selectedPics: {},
  loggedIn: false,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALREADY_AUTHENTICATED: {
      //return { ...state, token: action.payload.token, loggedIn: true, loading: false };
      return { ...state, token: action.payload.token, loggedIn: true };
    }
    case LOGIN_USER:
        return { ...state, loading: true, loggedIn: true };
    case LOGIN_USER_SUCCESS: {
      return { ...state, loading: false, loggedIn: true };
    }
    case LOGIN_USER_REQUESTED: {
      return {...state, loading: true };
    }
    case LOGIN_USER_CANCELLED: {
      return {...state, loading: false };
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
    default:
      return state;
  }
};
