import {
  CONNECT_WITH_USER,
  KEEP_BROWSING,
  LAST_MESSAGES_FETCH,
  CHAT_SELECTED,
  POTENTIALS_FETCH,
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchPic: '',
  lastMsgs: {},
  potentials: [],
  browseCursor: 0,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POTENTIALS_FETCH: {
      return { ...state, potentials: action.payload };
    }
    case CONNECT_WITH_USER: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchName: action.payload.name, selectedMatchPic: action.payload.pic, browseCursor: action.payload.index };
    }
    case LAST_MESSAGES_FETCH: {
      return { ...state, lastMsgs: action.payload };
    }
    case CHAT_SELECTED: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchPic: action.payload.avatar, selectedMatchName: action.payload.name };
    }
    case KEEP_BROWSING: {
      const lastMatch = state.potentials.splice(state.browseCursor, 1);
      state.potentials.push(lastMatch[0]);
      return { ...state, potentials: state.potentials, browseCursor: 0 };
    }
    default:
      return state;
  }
};
