import {
  CONNECT_WITH_USER,
  KEEP_BROWSING,
  CHAT_SELECTED,
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  LOGOUT_USER,
  POTENTIALS_ADD_SUCCESS,
  SET_NEW_NOTIFICATION,
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchPic: '',
  potentials: [],
  browseCursor: 0,
  notification: false,
  addedPotentialUsers: []
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POTENTIALS_FETCH: {
      return { ...state };
    }
    case POTENTIALS_FETCH_SUCCESS: {
      return { ...state, potentials: action.payload };
    }
    case POTENTIALS_ADD_SUCCESS: {
      if (action.payload.user.uid && typeof addedPotentialUsers[action.payload.user.uid] === 'undefined') {
        addedPotentialUsers[action.payload.user.uid] = true;
        const potentialsTemp = potentials.slice(0); //clone
        potentialsTemp[action.payload.index] = action.payload.user;
        return { ...state, potentials: potentialsTemp, loadingPotentials: false };
      }else{
        return { ...state };
      }
    }
    case SET_NEW_NOTIFICATION: {
      return { ...state, notification: action.payload.notification, listeningForNotifications: true };
    }
    case CONNECT_WITH_USER: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchName: action.payload.name, selectedMatchPic: action.payload.pic, browseCursor: action.payload.index };
    }
    case CHAT_SELECTED: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchPic: action.payload.avatar, selectedMatchName: action.payload.name };
    }
    case KEEP_BROWSING: {
//      const lastMatch = state.potentials.splice(state.browseCursor, 1);
//      return { ...state, potentials: state.potentials, browseCursor: 0 };
      return state;
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
