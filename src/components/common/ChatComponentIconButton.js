import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';

//import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ICON_SIZE, ICON_PADDING, ICON_CLICKABLE_AREA_WIDTH } from '../../constants';
import CustomIcon from '../../assets/icons';

const { width } = Dimensions.get('window');

class ChatComponentIconButton extends Component {

  componentWillMount() {
  }

  renderNotification(newNotification) {
    if (newNotification)
      return (
        <View style={styles.newMessage} />
      );
    else
      return null;
  }

  render() {
    const newNotification = this.props.connection.notification;

    return (
      <TouchableOpacity
        onPress={() => Actions.matches(ActionConst.RESET)}
        style={{
          ...styles.button,
          ...(Platform.OS === 'android' ? styles.buttonAndroid : {})}}
      >
        {this.renderNotification(newNotification)}
        <CustomIcon
          name="message_icon"
          size={ICON_SIZE}
          color="black"
          style={Platform.OS === 'ios' ? styles.iconIos : {}}
        />
      </TouchableOpacity>
      );
  }
}

const styles = {
  button: {
    marginLeft: width - ICON_CLICKABLE_AREA_WIDTH,
    alignItems: 'flex-end',
  },
  buttonAndroid: {
    marginTop: -35,
  },
  iconIos: {
    marginTop: -1 * ICON_SIZE,
    paddingRight: ICON_PADDING,
  },
  newMessage: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: '#FF4F7D',
    top: -1 * (ICON_SIZE + 3),
    right: ICON_SIZE + (ICON_PADDING - 2),
    zIndex: 99,
    borderWidth: 1,
    borderColor: 'white',
  },
};

const mapStateToProps = ({connection}) => {
  return {connection};
};

export default connect(mapStateToProps, {})(ChatComponentIconButton);
