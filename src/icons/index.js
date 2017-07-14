import React from 'react';
import { Dimensions, TouchableOpacity, TouchableHighlight, Platform } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
//import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CloseIcon from 'react-native-vector-icons/Octicons';
//import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CLOSE_ICON_SIZE, ICON_SIZE, ICON_PADDING, ICON_CLICKABLE_AREA_WIDTH } from '../constants';

/* Custom Icons */
import CustomIcon from '../assets/icons';

const { width } = Dimensions.get('window');

//Used in Conversation.js
export const backIconButton = () => {
  return(
    <TouchableOpacity
      onPress={() => Actions.matches()}
      style={{width: 70, height: 57}}
    >
      <IonIcon
        name="ios-arrow-back-outline"
        size={ICON_SIZE}
        style={{
          paddingLeft: ICON_PADDING,
          paddingTop: 15,
        }}
      />
    </TouchableOpacity>
  );
};

export const moreIconButton = (onPress) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 75,
      }}
    >
      <IonIcon
        name="md-more"
        size={ICON_SIZE}
        color="black"
        style={{
          paddingRight: 15,
          paddingTop: 15,
        }}
      />
    </TouchableOpacity>
  );
};

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
        size={ICON_SIZE - 5}
        color="black"
        style={{marginLeft: ICON_PADDING, width: ICON_SIZE, marginTop: Platform.OS === 'ios' ? 29 : 19}}
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
        ...(Platform.OS === 'android' ? {marginTop: -30, marginRight: ICON_PADDING} : {})
      }}
    >
      <CustomIcon
        name="home_icon"
        size={ICON_SIZE - 5}
        color="black"
        style={
          Platform.OS === 'ios' ? {
            marginTop: -1 * ICON_SIZE,
            paddingRight: ICON_PADDING,
          } : {}
        }
      />
    </TouchableOpacity>
  );
};

export const profileIconButton = () => {
  return (
    <TouchableOpacity
      onPress={() => Actions.userView()}
      style={{width: ICON_CLICKABLE_AREA_WIDTH}}
      accessibilityLabel={'profileIconButton'}
      testID={'profileIconButton'}
    >
      <CustomIcon
        name="profile_icon"
        size={ICON_SIZE}
        color="black"
        style={{marginLeft: ICON_PADDING, width: ICON_SIZE, marginTop: Platform.OS === 'ios' ? 29 : 12}}
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
          marginTop: Platform.OS === 'ios' ? 29 : 15,
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
      testID={'removeActivityIcon'}
    >
      <CloseIcon
        name="x"
        size={CLOSE_ICON_SIZE}
        color="#FF4F70"
      />
    </TouchableHighlight>
  );
};
