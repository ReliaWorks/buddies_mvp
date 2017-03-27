//import { Actions } from 'react-native-router-flux';
import {
  CHAT_SELECTED,
} from './types';

export const selectChat = (uid, name, avatar) => {
  return ({
    type: CHAT_SELECTED,
    payload: { uid, name, avatar }
  });
};
