import _ from 'lodash';
import {
  MATCHES_FETCH_START,
  MATCHES_FETCH,
  MATCHES_FETCH_SUCCESS,
  LAST_MESSAGES_FETCH,
  MESSAGE_SENT,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  matches: {},
  lastMsgs: {},
  matchesWithChat: {},
  sortedMatches: [],
  matchesWithoutChat: {},
  loading: false,
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MATCHES_FETCH_START: {
      return {...state, loading: true};      
    }
    case MATCHES_FETCH_SUCCESS:
      return {...state, loading: false};
    case MATCHES_FETCH: {
      return {...state, matches: action.payload, matchesWithoutChat: action.payload};
    }
    case LAST_MESSAGES_FETCH: {
      /* 3 cases:
       * 1) msg exists but no match (unmatched)
       * 2) msg exists and match exists
       * 3) no msg exists and match exists
       */
      let match = state.matches[action.payload.uid];
      let matchesWithChat = {...state.matchesWithChat};
      let matchesWithoutChat = {...state.matchesWithoutChat};
      if(match) {
        match = {...match, lastMsg: action.payload.msg};
        matchesWithChat = {...matchesWithChat, [action.payload.uid]: match};
        matchesWithoutChat = _.omit(matchesWithoutChat, [action.payload.uid]);
      }
      const updatedMsgs = {...state.lastMsgs, [action.payload.uid]: action.payload.msg};
      const sortedMatches = _.sortBy(matchesWithChat, (item) => {
        return item.lastMsg.timestamp;
      });
      return {...state, lastMsgs: updatedMsgs, matchesWithChat: matchesWithChat, matchesWithoutChat: matchesWithoutChat, sortedMatches: sortedMatches.reverse() };
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
