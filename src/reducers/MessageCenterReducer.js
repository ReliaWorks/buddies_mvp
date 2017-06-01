import _ from 'lodash';
import {
  MATCHES_FETCH,
  MATCHES_FETCH_START,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  matchesWithChat: [],
  matchesWithoutChat: [],
  loading: false,
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MATCHES_FETCH: {
      const matches = action.payload;
      const matchesWithoutChat = _.filter(matches, (match) => {
        return(match.status === 'ACTIVE');
      });
      const sortedMatchesWithoutChat = _.sortBy(matchesWithoutChat, (match) => {
        return match.matchedDate;
      });
      const matchesWithChat = _.filter(matches, (match) => {
        return (!match.status);
      });
      const sortedMatchesWithChat = _.sortBy(matchesWithChat, (match) => {
        return match.createdAt;
      });

      return {...state, matchesWithChat: sortedMatchesWithChat.reverse(), matchesWithoutChat: sortedMatchesWithoutChat.reverse(), loading: false};
    }
    case MATCHES_FETCH_START: {
      return {...state, loading: true};
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
