import {
  BROWSED_TO_NEXT_USER,
  CONNECT_WITH_USER,
  CONNECTION_SUCCESSFUL,
  KEEP_BROWSING,
  CHAT_SELECTED,
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  POTENTIALS_FETCH_FAILURE,
  LOAD_MORE_POTENTIALS,
  LOAD_MORE_POTENTIALS_SUCCESS,
  RESET_CURRENT_INDEX,
  CURRENT_USER_FETCH_START,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILURE,
  IMAGE_LOADED,
  LOGOUT_USER,
  SET_NEW_NOTIFICATION,
  SET_CURRENT_LOCATION
} from '../actions/types';

const INITIAL_STATE = {
  currentIndex: 0,
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchPic: '',
  potentials: [],
  loadingPotentials: false,
  potentialsLoaded: false,
  potentialsFetchStatus: true,
  currentUserFetchStatus: true,
  morePotentialsLoading: false,
  shouldLoadMorePotentials: true,
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
      console.log(`BROWSED_TO_NEXT_USER, currentIndex = ${action.payload}`);
      return { ...state, currentIndex: action.payload };
    }
    case RESET_CURRENT_INDEX:
      console.log(`RESET_CURRENT_INDEX`);
      return { ...state, currentIndex: 0 };
    case CURRENT_USER_FETCH_START: {
      return { ...state, loadingCurrentUser: true };
    }
    case CURRENT_USER_FETCH_SUCCESS: {
      return { ...state, loadingCurrentUser: false };
    }
    case CURRENT_USER_FETCH_FAILURE: {
      return { ...state, loadingCurrentUser: false, currentUserFetchStatus: false };
    }
    case POTENTIALS_FETCH: {
      return { ...state, loadingPotentials: true, loadingCurrentUser: false };
    }
    case POTENTIALS_FETCH_SUCCESS: {
      return { ...state, potentials: action.payload, loadingPotentials: false, potentialsLoaded: true };
    }
    case POTENTIALS_FETCH_FAILURE:
      return { ...state, loadingPotentials: false, potentialsFetchStatus: false};
    case LOAD_MORE_POTENTIALS:
      return { ...state, morePotentialsLoading: true};
    case LOAD_MORE_POTENTIALS_SUCCESS: {
      return {
        ...state,
        potentials: [...state.potentials, ...action.payload],
        shouldLoadMorePotentials: action.payload.length > 0,
        morePotentialsLoading: false
      };
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
        potentials: state.potentials.filter(potential => potential.uid !== action.payload.uid),
        selectedMatchId: action.payload.uid,
        selectedMatchName: action.payload.name,
        selectedMatchPic: action.payload.pic,
        currentIndex: action.payload.index,
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
    case SET_CURRENT_LOCATION: {
      return { ...state, potentialsLoaded: false };
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
