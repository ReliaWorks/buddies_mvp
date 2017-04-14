import { GiftedChat } from 'react-native-gifted-chat';
import {
  CURRENT_CHAT_FETCH,
  MESSAGE_SENT,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  chatId: '',
  messages: [],
  loading: true,
  typingText: false,
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CURRENT_CHAT_FETCH: {
      return { ...state, chatId: action.payload.chatId, loading: false, messages: action.payload.messages };
    }
    case MESSAGE_SENT: {
      if(action.payload.messages[0]._id === state.messages[0]._id) return state;
      const updatedMsgs = GiftedChat.append(state.messages, action.payload.messages);
      return { ...state, messages: updatedMsgs };
    }
    case LOGOUT_USER:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
