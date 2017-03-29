import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const ICON_WIDTH = 25;
const ICON_PADDING = 6;
const ICON_CLICKABLE_AREA_WIDTH = 100;

export const chatIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.matches()}
      style={{width: ICON_CLICKABLE_AREA_WIDTH, height: -1 * ICON_WIDTH, marginLeft: width - ICON_CLICKABLE_AREA_WIDTH, alignItems: 'flex-end'}}
    >
      <MaterialCommunityIcon
        name="comment-text-outline"
        size={ICON_WIDTH}
        color="black"
        style={{marginTop: -1 * ICON_WIDTH, width: ICON_WIDTH, marginRight: ICON_PADDING}}
      />
    </TouchableOpacity>
    );
};
export const chatLeftIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.matches()}
      style={{width: ICON_CLICKABLE_AREA_WIDTH}}
    >
      <MaterialCommunityIcon
        name="comment-text-outline"
        size={ICON_WIDTH}
        color="black"
        style={{marginLeft: ICON_PADDING, marginTop: 200, width: ICON_WIDTH }}
      />
    </TouchableOpacity>
    );
};

export const homeLeftIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.pop()}
      style={{width: ICON_CLICKABLE_AREA_WIDTH}}
    >
      <IonIcon
        name="ios-home"
        size={25}
        color="black"
        style={{marginLeft: 6, marginTop: 29, width: ICON_WIDTH}}
      />
    </TouchableOpacity>
    );
};

export const homeRightIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.pop()}
      style={{width: ICON_CLICKABLE_AREA_WIDTH}}
    >
      <IonIcon
        name="ios-home"
        size={ICON_WIDTH}
        color="black"
        style={{
          marginTop: -1 * ICON_WIDTH,
          marginLeft: width - ICON_WIDTH - ICON_PADDING,
          width: ICON_WIDTH,
        }}
      />
    </TouchableOpacity>
    );
};

export const profileIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.profileSettings()}
      style={{width: ICON_CLICKABLE_AREA_WIDTH}}
    >
      <Icon
        name="user-o"
        size={ICON_WIDTH}
        color="black"
        style={{marginLeft: ICON_PADDING, marginTop: 29, width: ICON_WIDTH}}
      />
    </TouchableOpacity>
    );
};
export const wrenchIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.settings()}
      style={{width: ICON_CLICKABLE_AREA_WIDTH}}
    >
      <IonIcon
        name="ios-settings"
        size={ICON_WIDTH}
        color="black"
        style={{marginLeft: ICON_PADDING, marginTop: 29, width: ICON_WIDTH}}
      />
    </TouchableOpacity>
    );
};
