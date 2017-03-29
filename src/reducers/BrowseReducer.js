import {
  CONNECT_WITH_USER,
  KEEP_BROWSING,
  LAST_MESSAGES_FETCH,
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchPic: '',
  browseCursor: 0,
  lastMsgs: {},
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_WITH_USER: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchName: action.payload.name, selectedMatchPic: action.payload.pic };
    }
    case KEEP_BROWSING: {
      return { ...state, ...INITIAL_STATE };
    }
    case LAST_MESSAGES_FETCH: {
      return { ...state, lastMsgs: action.payload };
    }
    default:
      return state;
  }
};
