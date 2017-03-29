import {
  MATCHES_FETCH,
  LAST_MESSAGES_FETCH,
} from '../actions/types';

const INITIAL_STATE = {
  matches: {},
  lastMsgs: {},
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MATCHES_FETCH:
      return {...state, matches: action.payload};
    case LAST_MESSAGES_FETCH: {
      const updatedMsgs = {...state.lastMsgs, [action.payload.uid]: action.payload.msg};
      return {...state, lastMsgs: updatedMsgs };
    }
    default:
      return state;
  }
};
