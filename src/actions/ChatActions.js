import {
  CHAT_SELECTED,
  MESSAGE_SENT,
} from './types';

export const selectChat = (uid, name, avatar) => {
  return ({
    type: CHAT_SELECTED,
    payload: { uid, name, avatar }
  });
};

export const saveLastMessage = (msg, otherUserId) => {
  return ({
    type: MESSAGE_SENT,
    payload: { msg, otherUserId }
  });
};
