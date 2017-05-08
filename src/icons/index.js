import React from 'react';
import { Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
//import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CloseIcon from 'react-native-vector-icons/Octicons';
//import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CLOSE_ICON_SIZE, ICON_SIZE, ICON_PADDING, ICON_CLICKABLE_AREA_WIDTH } from '../constants';

/* Custom Icons */
import CustomIcon from '../assets/icons';

const { width } = Dimensions.get('window');

export const chatIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.matches(ActionConst.RESET)}
      style={{
        marginLeft: width - ICON_CLICKABLE_AREA_WIDTH,
        alignItems: 'flex-end',
      }}
    >
      <CustomIcon
        name="message_icon"
        size={ICON_SIZE}
        color="black"
        style={{
          marginTop: -1 * ICON_SIZE,
          paddingRight: ICON_PADDING,
        }}
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
      <CustomIcon
        name="message_icon"
        size={ICON_SIZE}
        color="black"
        style={{marginLeft: ICON_PADDING, marginTop: 29, width: ICON_SIZE }}
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
      <CustomIcon
        name="home_icon"
        size={20}
        color="black"
        style={{marginLeft: ICON_PADDING, marginTop: 29, width: ICON_SIZE}}
      />
    </TouchableOpacity>
    );
};

export const homeRightIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.main()}
      style={{
        marginLeft: width - ICON_CLICKABLE_AREA_WIDTH,
        alignItems: 'flex-end',
      }}
    >
      <CustomIcon
        name="home_icon"
        size={20}
        color="black"
        style={{
          marginTop: -1 * ICON_SIZE,
          paddingRight: ICON_PADDING,
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
      <CustomIcon
        name="profile_icon"
        size={ICON_SIZE}
        color="black"
        style={{marginLeft: ICON_PADDING, marginTop: 29, width: ICON_SIZE}}
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
        size={ICON_SIZE}
        color="black"
        style={{
          marginLeft: ICON_PADDING,
          marginTop: 29,
          width: ICON_SIZE,
        }}
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
