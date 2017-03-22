import {
  LOGIN_USER,
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
  fbtoken: null,
  loading: false,
  profile_pics: [],
  selectedPics: {},
  loggedIn: false,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
        return { ...state, loading: true, loggedIn: true };
    case LOGOUT_USER:
        return { ...state, loading: false, loggedIn: false };
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
