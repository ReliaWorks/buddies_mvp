import {
  CHAT_SELECTED,
  KEEP_BROWSING,
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchAvatar: '',
  lastMsg: '',
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_SELECTED: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchAvatar: action.payload.avatar, selectedMatchName: action.payload.name };
    }
    case KEEP_BROWSING: {
      return { ...state, ...INITIAL_STATE };
    }
    default:
      return state;
  }
};
