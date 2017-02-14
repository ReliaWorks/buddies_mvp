import React, { Component } from 'react';
import { Switch, Text, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LoginButton } from 'react-native-fbsdk';
//import { Button } from './common';
import { buttonStyle, legalTextStyle, textStyle } from './common/styles';

class Settings extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.settingsContainerStyle}>
          <Text style={textStyle}>Email</Text>
          <TextInput style={{ height: 30, borderColor: 'gray', borderWidth: 1, flex: 1, marginRight: 10 }} />
        </View>
        <View style={styles.settingsContainerStyle}>
          <Text style={textStyle}>Email Notifications</Text>
          <Switch
            style={{ marginBottom: 10 }}
          />
        </View>
        <View style={styles.settingsContainerStyle}>
          <Text style={textStyle}>Mobile Notifications</Text>
          <Switch
            style={{ marginBottom: 10 }}
          />
        </View>
          <Text style={legalTextStyle}>Privacy Policy</Text>
          <Text style={legalTextStyle}>Terms of Service</Text>
            <Text>Contact Us</Text>
        <LoginButton
          onLogoutFinished={() => {
            console.log('In Settings, onLogoutFinished');
            Actions.root();
          }}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  settingsContainerStyle: {
//    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  }
};

export default Settings;
