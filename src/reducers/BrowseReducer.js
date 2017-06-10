import {
  CONNECT_WITH_USER,
  CONNECTION_SUCCESSFUL,
  KEEP_BROWSING,
  CHAT_SELECTED,
  DONE_CHECKING_CONNECTION_STATUS,
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  CURRENT_USER_FETCH_START,
  CURRENT_USER_FETCH_SUCCESS,
  IMAGE_LOADED,
  LOGOUT_USER,
  SET_NEW_NOTIFICATION,
} from '../actions/types';

const INITIAL_STATE = {
  selectedMatchId: '',
  selectedMatchName: '',
  selectedMatchPic: '',
  potentials: [],
  browseCursor: 0,
  loadingPotentials: false,
  loadingCurrentUser: false,
  numImagesOnScreen: 0,
  notification: false,
  listeningForNotifications: false,
  numTimesConnected: 0,
  doneCheckingConnectionStatus: false,
  seenConnectionHelper: true,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DONE_CHECKING_CONNECTION_STATUS: {
      console.log("In DONE_CHECKING_CONNECTION_STATUS");
      return { ...state, doneCheckingConnectionStatus: true, seenConnectionHelper: action.payload };
    }
    case KEEP_BROWSING: {
      console.log("In KEEP_BROWSING");
      return { ...state, seenConnectionHelper: true, doneCheckingConnectionStatus: false };
    }
    case CONNECTION_SUCCESSFUL: {
      console.log("In CONNECTION_SUCCESSFUL");
      return { ...state, doneCheckingConnectionStatus: true, seenConnectionHelper: true };
    }
    case CURRENT_USER_FETCH_START: {
      return { ...state, loadingCurrentUser: true };
    }
    case CURRENT_USER_FETCH_SUCCESS: {
      return { ...state, numTimesConnected: action.payload.numTimesConnected || 0};
    }
    case POTENTIALS_FETCH: {
      return { ...state, loadingPotentials: true, loadingCurrentUser: false };
    }
    case POTENTIALS_FETCH_SUCCESS: {
/*      let numImages = 0;
      if(action.payload) {
        const firstMatch = action.payload[0];
        if(firstMatch.activities)
          numImages = Object.keys(firstMatch.activities).length;
        if(firstMatch.affiliations)
          numImages += Object.keys(firstMatch.affiliations).length;
        if(firstMatch.profileImages && Object.keys(firstMatch.profileImages).length > 0)
          numImages += 1;
      }
      console.log(`numImagesOnScreen = ${numImages}`);*/
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
      console.log("In CONNECT_WITH_USER");
      return { ...state,
        selectedMatchId: action.payload.uid,
        selectedMatchName: action.payload.name,
        selectedMatchPic: action.payload.pic,
        browseCursor: action.payload.index,
        doneCheckingConnectionStatus: false,
        seenConnectionHelper: true
      };
    }
    case CHAT_SELECTED: {
      return { ...state,
        selectedMatchId: action.payload.uid,
        selectedMatchPic: action.payload.avatar,
        selectedMatchName: action.payload.name
      };
    }
//    case KEEP_BROWSING: {
//      return { ...state, numTimesConnected: state.numTimesConnected + 1, doneCheckingConnectionStatus: true };
//    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
