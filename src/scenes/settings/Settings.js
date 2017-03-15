import React, { Component } from 'react';
import { Linking, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LoginButton } from 'react-native-fbsdk';
import { centeredTextStyle, legalTextStyle } from '../../components/common/styles';
import styles from './styles';

const settingsBackground = require('../../components/common/img/settingBackground.png');

class Settings extends Component {
  openPrivacyPolicy() {
    const url = 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/legal%2FApple_Developer_Program_License_Agreement_20160921.pdf?alt=media&token=07bb73b8-b294-42a0-817a-92fd8150d347';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  openTermsOfService() {
    const url = 'http://www.cnn.com';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { containerStyle, labelStyle, linkContainerStyle, logoutContainerStyle, settingsContainerStyle, settingsBackgroundImgStyle, textStyle, textInputStyle } = styles;
    const { firstName, email } = this.props.value;

    return (
      <View contentContainerStyleStyle={containerStyle} style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
        <View>
          <Image source={settingsBackground} style={settingsBackgroundImgStyle} />
        </View>
        <View style={settingsContainerStyle}>
          <View>
            <Text style={labelStyle}>Name</Text>
            <Text style={textStyle}>{firstName}</Text>
          </View>
        </View>
        <View style={settingsContainerStyle}>
          <View>
            <Text style={labelStyle}>Email</Text>
            <TextInput style={textInputStyle} value={email} />
          </View>
        </View>
        <View style={linkContainerStyle}>
          <Text style={centeredTextStyle}>
            Contact Us
          </Text>
          <TouchableOpacity onPress={this.openPrivacyPolicy}>
            <Text style={legalTextStyle}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.openTermsOfService}>
            <Text style={legalTextStyle}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
        <View style={logoutContainerStyle}>
          <LoginButton
            onLogoutFinished={() => {
              Actions.root();
            }}
          />
        </View>
      </View>
    );
  }
}

export default Settings;
