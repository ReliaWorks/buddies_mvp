import {
  CHAT_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchAvatar: '',
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_SELECTED: {
      return {...state, selectedMatchId: action.payload.uid, selectedMatchAvatar: action.payload.avatar, selectedMatchName: action.payload.name};
    }
    default:
      return state;
  }
};
