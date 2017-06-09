import {
  CONNECT_WITH_USER,
  KEEP_BROWSING,
  CHAT_SELECTED,
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  CURRENT_USER_FETCH_START,
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
  listeningForNotifications: false
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENT_USER_FETCH_START: {
      return { ...state, loadingCurrentUser: true };
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
      return { ...state, notification: action.payload.notification, listeningForNotifications: true };
    }
    case CONNECT_WITH_USER: {
      return { ...state, selectedMatchId: action.payload.uid, selectedMatchName: action.payload.name, selectedMatchPic: action.payload.pic, browseCursor: action.payload.index };
    }
    case CHAT_SELECTED: {
      const {uid, avatar, name, conversationId} = action.payload;
      return {...state, selectedMatchId: uid, selectedMatchPic: avatar, selectedMatchName: name, selectedConversationId: conversationId};
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
