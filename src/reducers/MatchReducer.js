import _ from 'lodash';
import {
  MATCHES_FETCH,
  LAST_MESSAGES_FETCH,
  MESSAGE_SENT,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  matches: {},
  lastMsgs: {},
  matchesWithConv: {},
  matchesWithNoConv: {}
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MATCHES_FETCH: {
      return {...state, matches: action.payload};
    }
    case LAST_MESSAGES_FETCH: {
      console.log("State.Matches = ");
      console.log(state.matches);
      console.log("LastMsgs = ");
      console.log(state.lastMsgs);
      const updatedMsgs = {...state.lastMsgs, [action.payload.uid]: action.payload.msg};
      return {...state, lastMsgs: updatedMsgs};
    }
    case MESSAGE_SENT: {
      const msg = action.payload.msg;
      const uid = action.payload.otherUserId;
      const text = msg.text;
      const updatedMsgs = {...state.lastMsgs, [uid]: text};
      return { ...state, lastMsgs: updatedMsgs};
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
