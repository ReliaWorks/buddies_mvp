import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_FB_SUCCESS,
  LOGIN_USER,
  CREATE_USER,
  PROFILE_INFO,
  PROFILE_PIC,
  SELECT_PIC
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  uid: 'duZphaxR0ue1OjaPOEewe0UjbZV2',
  email: '',
  first_name: '',
  newUser: true,
  error: '',
  fbtoken: null,
  loading: false,
  profile_pics: [],
  selectedPics: {}
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, loading: true, user: action.payload, newUser: false };
    case SELECT_PIC:
      const selectedPics = Object.assign({}, state.selectedPics);
      if (!selectedPics[action.payload]) selectedPics[action.payload] = true;
      return { ...state, selectedPics: selectedPics };
    case PROFILE_INFO:
      console.log('On profile info');
      return { ...state, user: action.payload, email: action.payload.email, first_name: action.payload.first_name, };
    case LOGIN_USER:
        return { ...state,
          loading: true,
          error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case PROFILE_PIC:
      console.log('On profile pic adding');
      const pics = state.profile_pics.slice();
      pics.push(action.payload);
      console.log(pics);
      return {...state, profile_pics: pics};
    case LOGIN_FB_SUCCESS:
      return { ...state, ...INITIAL_STATE, fbtoken: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    default:
      return state;
  }
};
