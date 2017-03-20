import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const ICON_WIDTH = 25;
const ICON_PADDING = 6;

//const homeImageLocation = require('./components/common/img/home.png');
//const wrenchImageLocation = require('./components/common/img/wrench.png');
//const sprocketImageLocation = require('./components/common/img/224_gear.png');
//const chatImageLocation = require('./components/common/img/224_chat.png');

export const chatIconButton = () => {
  return (
    <TouchableOpacity onPress={() => Actions.matchesConversations()}>
      <Icon
        name="commenting"
        size={25}
        color="black"
        style={{marginTop: -1 * ICON_WIDTH, marginLeft: width - ICON_WIDTH - ICON_PADDING, width: ICON_WIDTH}}
      />
    </TouchableOpacity>
    );
};
export const homeLeftIconButton = () => {
  return (
    <TouchableOpacity onPress={() => Actions.main()}>
      <Icon
        name="home"
        size={25}
        color="black"
        style={{marginLeft: 6, marginTop: 29, width: 25}}
      />
    </TouchableOpacity>
    );
};
export const homeRightIconButton = () => {
  return (
    <TouchableOpacity onPress={() => Actions.main()}>
      <Icon
        name="home"
        size={25}
        color="black"
        style={{marginTop: -1 * ICON_WIDTH, marginLeft: width - ICON_WIDTH - ICON_PADDING, width: ICON_WIDTH}}
      />
    </TouchableOpacity>
    );
};

export const profileIconButton = () => {
  return (
    <TouchableOpacity onPress={() => Actions.profileSettings()}>
      <Icon
        name="user-o"
        size={25}
        color="black"
        style={{marginLeft: 6, marginTop: 29, width: 25}}
      />
    </TouchableOpacity>
    );
};
export const wrenchIconButton = () => {
  return (
    <TouchableOpacity onPress={() => Actions.settings()}>
      <Icon
        name="wrench"
        size={25}
        color="black"
        style={{marginLeft: 6, marginTop: 29, width: 25}}
      />
    </TouchableOpacity>
    );
};
