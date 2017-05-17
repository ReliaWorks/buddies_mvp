import { GiftedChat } from 'react-native-gifted-chat';
import {
  CURRENT_CHAT_FETCH,
  MESSAGE_SENT,
  LOGOUT_USER,
  CLOSE_CONVERSATION
} from '../actions/types';

const INITIAL_STATE = {
  chatId: '',
  messages: [],
  loading: true,
  typingText: false,
  justConnected: false
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CURRENT_CHAT_FETCH: {
      return { ...state, chatId: action.payload.chatId, loading: false, messages: action.payload.messages, justConnected: action.payload.justConnected };
    }
    case MESSAGE_SENT: {
      if(state.justConnected) {
        const updatedMsgs = GiftedChat.append(state.messages, action.payload.messages);
        return { ...state, messages: updatedMsgs };
      }
      return state;
    }
    case CLOSE_CONVERSATION: {
      return {...state, messages: []};
    }
    case LOGOUT_USER:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
