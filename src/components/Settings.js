import React, { Component } from 'react';
import { Button, Linking, ListView, Image, Switch, Text, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LoginButton } from 'react-native-fbsdk';
//import { Button } from './common';
import { buttonStyle, centeredTextStyle, legalTextStyle, textStyle } from './common/styles';

const emailIcon = require('./common/img/add_icon.png');
const settingsBackground = require('./common/img/settingBackground.png');

const url = 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/legal%2FApple_Developer_Program_License_Agreement_20160921.pdf?alt=media&token=07bb73b8-b294-42a0-817a-92fd8150d347';

class Settings extends Component {
  openLink() {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { containerStyle, labelStyle, settingsContainerStyle, switchStyle, textInputStyle } = styles;

    return (
      <View contentContainerStyle={containerStyle}>
        <View>
          <Image source={settingsBackground} style={{width: null, height: 200,backgroundColor: 'gray'}} />
        </View>
        <View style={settingsContainerStyle}>
          <View>
            <Text style={labelStyle}>Full Name</Text>
            <Text style={{ marginLeft: 30, fontSize: 20, fontFamily: 'Avenir', opacity: 1 }}>Shireen Brathwaite</Text>
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
            style={switchStyle}
            value
          />
        </View>
        <View style={settingsContainerStyle}>
          <Text style={labelStyle}>Mobile Notifications</Text>
          <Switch
            style={switchStyle}
            value
          />
        </View>
        <View style={{marginTop: 20}}>
          <Button
            onPress={this.openLink}
            title="Privacy Policy"
          />
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
    opacity: 0.6,
  },
  textInputStyle: {
    borderStyle: 'solid',
    height: 40,
    width: 315,
    opacity: 1,
  //  borderBottomColor: 'black',
  //  fontSize: 24,
    fontFamily: 'Avenir-Book',
    marginLeft: 30,
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
  },
  switchStyle: {
    marginRight: 30,
    marginBottom: 10,
    height: 10,
  }
};

export default Settings;
