import { GiftedChat } from 'react-native-gifted-chat';
import {
  CURRENT_CHAT_FETCH,
  MESSAGE_SENT,
  LOGOUT_USER,
  CLOSE_CONVERSATION,
  NEW_MESSAGE,
  LOAD_EARLIER
} from '../actions/types';
import {DEFAULT_PROFILE_PHOTO, MESSAGE_COUNT_FOR_EACH_LOAD} from '../constants';

const INITIAL_STATE = {
  chatId: '',
  messages: [],
  loading: true,
  typingText: false,
  justConnected: false,
  loadEarlier: false,
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CURRENT_CHAT_FETCH: {
      const {messages, chatId, justConnected, currentUser, connection} = action.payload;

      const messagesWithUsers = messages.map(message => {
        if (message.otherUserId === currentUser.uid) {
          return {...message, user: {_id: connection.selectedMatchId, name: connection.selectedMatchName, avatar: connection.selectedMatchPic}};
        } else {
          const avatar = currentUser.profileImages && currentUser.profileImages.length > 0 ? currentUser.profileImages[0] : DEFAULT_PROFILE_PHOTO;
          return {...message, user: {_id: currentUser.uid, name: currentUser.firstName, avatar}};
        }
      });

      return { ...state,
        chatId: action.payload.chatId,
        loading: false,
        messages: messagesWithUsers,
        justConnected: action.payload.justConnected,
        loadEarlier: messagesWithUsers.length === MESSAGE_COUNT_FOR_EACH_LOAD
      };
    }

    case NEW_MESSAGE: {
      const {message, chatId, justConnected, currentUser, connection} = action.payload;

      const messageWithUser = message.otherUserId === currentUser.uid
        ? {...message, user: {_id: connection.selectedMatchId, name: connection.selectedMatchName, avatar: connection.selectedMatchPic}}
        : {
            ...message,
            user: {
              _id: currentUser.uid,
              name: currentUser.firstName,
              avatar: currentUser.profileImages && currentUser.profileImages.length > 0 ? currentUser.profileImages[0] : DEFAULT_PROFILE_PHOTO
            }
          };

      return { ...state,
        chatId: action.payload.chatId,
        loading: false,
        messages: [messageWithUser, ...state.messages],
        justConnected: justConnected
      };
    }

    case LOAD_EARLIER: {
      const {messages, chatId, justConnected, currentUser, connection} = action.payload;

      const messagesWithUsers = messages.map(message => {
        if (message.otherUserId === currentUser.uid) {
          return {...message, user: {_id: connection.selectedMatchId, name: connection.selectedMatchName, avatar: connection.selectedMatchPic}};
        } else {
          const avatar = currentUser.profileImages && currentUser.profileImages.length > 0 ? currentUser.profileImages[0] : DEFAULT_PROFILE_PHOTO;
          return {...message, user: {_id: currentUser.uid, name: currentUser.firstName, avatar}};
        }
      });

      return { ...state,
        chatId: action.payload.chatId,
        loading: false,
        messages: [...state.messages, ...messagesWithUsers],
        justConnected: action.payload.justConnected,
        loadEarlier: messagesWithUsers.length === MESSAGE_COUNT_FOR_EACH_LOAD
      };
    }


    // does not being used, can be deleted ?
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
