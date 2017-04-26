import React from 'react';
import { Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CloseIcon from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CLOSE_ICON_SIZE, ICON_WIDTH, ICON_PADDING, ICON_CLICKABLE_AREA_WIDTH } from '../constants';

const { width } = Dimensions.get('window');

export const chatIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.matches(ActionConst.RESET)}
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
        style={{marginLeft: ICON_PADDING, marginTop: 29, width: ICON_WIDTH }}
      />
    </TouchableOpacity>
    );
};

export const homeLeftIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.browse()}
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
      onPress={() => Actions.main()}
      style={{
        width: ICON_CLICKABLE_AREA_WIDTH,
        alignSelf: 'flex-end',
        flex: 1,
      }}
    >
      <IonIcon
        name="ios-home"
        size={25}
        color="black"
        style={{
          marginTop: -29,
          marginLeft: 70,
        }}
      />
    </TouchableOpacity>
  );
};

export const profileIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.userView()}
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

export const renderCloseIcon = (onRemove, tileId, tileName) => {
  return (
    <TouchableHighlight
      onPress={() => onRemove(tileId, tileName)}
      style={{alignSelf: 'flex-end'}}
    >
      <CloseIcon
        name="x"
        size={CLOSE_ICON_SIZE}
        color="#FF4F70"
      />
    </TouchableHighlight>
  );
};
