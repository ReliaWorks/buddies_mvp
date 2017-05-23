import {
  FIND_COMMONALITY,
} from '../actions/types';

const INITIAL_STATE = {
  commonInterests: []
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FIND_COMMONALITY: {
      return { ...state, commonInterests: action.payload };
    }
    default:
      return state;
  }
};
