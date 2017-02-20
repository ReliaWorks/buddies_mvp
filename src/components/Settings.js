import React, { Component } from 'react';
import { ListView, Image, Switch, Text, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LoginButton } from 'react-native-fbsdk';
//import { Button } from './common';
import { buttonStyle, centeredTextStyle, legalTextStyle, textInputStyle, textStyle } from './common/styles';

const emailIcon = require('./common/img/add_icon.png');
const settingsBackground = require('./common/img/settingBackground.png');


class Settings extends Component {
  render() {
    const { containerStyle, labelStyle, settingsContainerStyle } = styles;

    return (
      <View contentContainerStyle={containerStyle}>
        <View>
          <Image source={settingsBackground} style={{width: null, height: 200, backgroundColor: '#D8D8D8'}} />
        </View>
        <View style={settingsContainerStyle}>
          <View>
            <Text style={labelStyle}>Full Name</Text>
            <Text style={{ marginLeft: 30, fontSize: 20, fontFamily: 'Avenir' }}>Shireen Brathwaite</Text>
          </View>
        </View>
        <View style={settingsContainerStyle}>
          <View>
            <Text style={labelStyle}>Email</Text>
            <TextInput style={textInputStyle} value="shireenb@gmail.com" />
          </View>
        </View>
        <View style={settingsContainerStyle}>
          <Text style={labelStyle}>Email Notifications</Text>
          <Switch
            style={{ marginRight: 30 }}
            value
          />
        </View>
        <View style={settingsContainerStyle}>
          <Text style={labelStyle}>Mobile Notifications</Text>
          <Switch
            style={{ marginRight: 30 }}
            value
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={legalTextStyle}>Privacy Policy</Text>
          <Text style={legalTextStyle}>Terms of Service</Text>
          <Text style={centeredTextStyle}>Contact Us</Text>
        </View>
        <View style={{flex: 1, alignSelf: 'center'}}>
          <LoginButton
            onLogoutFinished={() => {
              console.log('In Settings, onLogoutFinished');
              Actions.root();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  labelStyle: {
    fontFamily: 'Avenir',
    fontSize: 20,
    marginLeft: 30,
    opacity: 0.5,
  },
  containerStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  settingsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  }
};

export default Settings;
