import {
  CHAT_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatch: 'rKymFdHeUUfuXlhVl9E4Ad0hJ4B3',
  selectedMatchAvatar: 'https://facebook.github.io/react/img/logo_og.png',
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_SELECTED: {
      return state;
    }
    default:
      return state;
  }
};
