import {
  CONNECT_WITH_USER,
  KEEP_BROWSING,
  CHAT_SELECTED,
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchPic: '',
  potentials: [],
  browseCursor: 0,
  loadingPotentials: false,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POTENTIALS_FETCH: {
      return { ...state, loadingPotentials: true };
    }
    case POTENTIALS_FETCH_SUCCESS: {
      return { ...state, potentials: action.payload, loadingPotentials: false };
    }
    case CONNECT_WITH_USER: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchName: action.payload.name, selectedMatchPic: action.payload.pic, browseCursor: action.payload.index };
    }
    case CHAT_SELECTED: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchPic: action.payload.avatar, selectedMatchName: action.payload.name };
    }
    case KEEP_BROWSING: {
      const lastMatch = state.potentials.splice(state.browseCursor, 1);
      state.potentials.push(lastMatch[0]);
      return { ...state, potentials: state.potentials, browseCursor: 0 };
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
