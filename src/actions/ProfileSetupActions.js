import {
  SELECT_PIC,
  SAVE_PICS
} from './types';
import firebase from 'firebase';

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
  
  console.log("Saving pics");
  let images = [];
  Object.keys(selectedPics).forEach(key => {
    images.push(key);
  });
  console.log(images);
  return (dispatch) => {
    dispatch({
      type: SAVE_PICS,
      payload: {}
    });
  };
};
