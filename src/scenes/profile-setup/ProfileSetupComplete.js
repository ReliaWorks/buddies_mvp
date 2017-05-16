import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { textStyle } from '../../components/common/styles';
import { Button } from '../../components/common';

class ProfileSetupComplete extends Component {
  startBrowsing() {
    Actions.main();
  }

  render() {
    const localTextStyle = {...textStyle, textAlign: 'left'};

    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <View style={{marginLeft: 30, marginRight: 30}}>
            <Text style={localTextStyle}>
            Dear friends and family,
            </Text>
            <View style={{height: 10}} />
            <Text style={localTextStyle}>
            Thank you for helping test this beta release. Now that you’ve created a profile you can browse, connect, and chat!  Feel free to update your profile photos. We appreciate your feedback.
            </Text>
            <View style={{height: 15}} />
            <Text style={localTextStyle}>
            Best regards,
            </Text>
            <Text style={localTextStyle}>
            Shireen, Kayleigh, Oscar, Ali and Amber
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <Button onPress={this.startBrowsing}>Let's go!</Button>
          </View>
        </View>
      </View>
    );
  }
}

export { ProfileSetupComplete };
