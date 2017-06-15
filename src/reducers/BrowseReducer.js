import {
  BROWSED_TO_NEXT_USER,
  BROWSED_SELECTED_USER,
  CONNECT_WITH_USER,
  CONNECTION_SUCCESSFUL,
  KEEP_BROWSING,
  CHAT_SELECTED,
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  RESET_CURRENT_INDEX,
  CURRENT_USER_FETCH_START,
  CURRENT_USER_FETCH_SUCCESS,
  IMAGE_LOADED,
  LOGOUT_USER,
  SET_NEW_NOTIFICATION,
} from '../actions/types';

const INITIAL_STATE = {
  currentIndex: 0,
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchPic: '',
  potentials: [],
  browseCursor: 0,
  loadingPotentials: false,
  loadingCurrentUser: false,
  loadingConnectionHelper: false,
  connectingWithUser: false,
  numImagesOnScreen: 0,
  notification: false,
  listeningForNotifications: false,
  displayedUser: null,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECTION_SUCCESSFUL:
      return { ...state, connectingWithUser: false };
    case KEEP_BROWSING:
      return { ...state, loadingConnectionHelper: false, connectingWithUser: false };
    case BROWSED_TO_NEXT_USER: {
      return { ...state, currentIndex: action.payload };
    }
    case BROWSED_SELECTED_USER: {
        return { ...state, displayedUser: action.payload };
    }
    case RESET_CURRENT_INDEX:
      return { ...state, currentIndex: 0 };
    case CURRENT_USER_FETCH_START: {
      return { ...state, loadingCurrentUser: true };
    }
    case POTENTIALS_FETCH: {
      return { ...state, loadingPotentials: true, loadingCurrentUser: false };
    }
    case POTENTIALS_FETCH_SUCCESS: {
      return { ...state, potentials: action.payload, loadingPotentials: false };
    }
    case IMAGE_LOADED: {
//      return { ...state, numImagesOnScreen: state.numImagesOnScreen - 1 };
      return state;
    }
    case SET_NEW_NOTIFICATION: {
      return { ...state,
        notification: action.payload.notification,
        listeningForNotifications: true
      };
    }
    case CONNECT_WITH_USER: {
      return { ...state,
        selectedMatchId: action.payload.uid,
        selectedMatchName: action.payload.name,
        selectedMatchPic: action.payload.pic,
        browseCursor: action.payload.index,
        loadingConnectionHelper: true,
        connectingWithUser: true,
      };
    }
    case CHAT_SELECTED: {
      const {uid, avatar, name, conversationId} = action.payload;
      return { ...state,
        selectedMatchId: uid,
        selectedMatchPic: avatar,
        selectedMatchName: name,
        selectedConversationId: conversationId
      };
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
