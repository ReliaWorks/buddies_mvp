import {
  SELECT_PIC
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
