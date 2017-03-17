import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SELECT_PIC,
  SAVE_PICS,
  DESCRIPTION_SAVED,
} from './types';

export const addPic = (url) => {
  console.log("Action url");
  console.log(url);
  return (dispatch) => {
    dispatch({
      type: SELECT_PIC,
      payload: url
    });
  };
};

export const savePics = (selectedPics) => {
  const auth = firebase.auth();

  const images = [];
  Object.keys(selectedPics).forEach(key => {
    images.push(key);
  });

  return (dispatch) => {
    dispatch({
      type: SAVE_PICS,
      payload: {}
    });
    Actions.activitySetup();
  };
};

export const descriptionSaved = (text) => {
  return {
    type: DESCRIPTION_SAVED,
    payload: text
  };
};
