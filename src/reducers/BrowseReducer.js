import {
  CONNECT_WITH_USER,
  KEEP_BROWSING,
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchPic: ''
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_WITH_USER: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchName: action.payload.name, selectedMatchPic: action.payload.pic };
    }
    case KEEP_BROWSING: {
      return { ...state, ...INITIAL_STATE };
    }
    default:
      return state;
  }
};
