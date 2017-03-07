import { ActionConst } from 'react-native-router-flux';

const INITIAL_STATE = {
  scene: {},
};

export default (state = INITIAL_STATE, {type, scene}) => {
  switch(type) {
    case ActionConst.FOCUS:
      return {
        ...state,
        scene,
      };
    default:
      return state;
  }
};
