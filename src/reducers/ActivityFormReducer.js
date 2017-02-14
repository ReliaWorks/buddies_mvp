import {
  ACTIVITY_UPDATE,
  ACTIVITY_CREATE,
  ACTIVITY_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: ''
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVITY_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ACTIVITY_CREATE:
      return INITIAL_STATE;
    case ACTIVITY_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
