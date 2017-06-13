import _ from 'lodash';
import {
  MATCHES_FETCH,
  MATCHES_FETCH_START,
  MATCHES_FETCH_FAIL,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  matchesWithChat: [],
  matchesWithoutChat: [],
  loading: false,
  loaded: false
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MATCHES_FETCH: {
      //const matches = _.filter(action.payload, match => match.status !== 'INACTIVE');
      const matches = action.payload;

      const keys = Object.keys(matches);
      let i = 0;
      const matchesWithIds = _.map(matches, match => {
        return {...match, otherUserId: keys[i++]};
      });

      const activeMatches = _.filter(matchesWithIds, match => match.status !== 'INACTIVE');

      const matchesWithoutChat = _.filter(activeMatches, (match) => {
        //return(match.status === 'ACTIVE');
        return(!match.text);
      });
      const sortedMatchesWithoutChat = _.sortBy(matchesWithoutChat, (match) => {
        return match.matchedDate;
      });
      const matchesWithChat = _.filter(activeMatches, (match) => {
        return (match.text);
      });
      const sortedMatchesWithChat = _.sortBy(matchesWithChat, (match) => {
        return match.createdAt;
      });

      return {...state,
        matchesWithChat: sortedMatchesWithChat.reverse(),
        matchesWithoutChat: sortedMatchesWithoutChat.reverse(),
        loading: false,
        loaded: true
      };
    }
    case MATCHES_FETCH_START: {
      return {...state, loading: true, loaded: false};
    }
    case MATCHES_FETCH_FAIL: {
      return {...state, loading: false, loaded: false};
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
