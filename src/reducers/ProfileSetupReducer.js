import {
  PICTURES_REQUESTED,
  PICTURE_REQUEST_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PICTURES_REQUESTED:
      return { ...state, loading: true};
    case PICTURE_REQUEST_SUCCESS:
      return { ...state, loading: false};
    default:
      return state;
  }
};
