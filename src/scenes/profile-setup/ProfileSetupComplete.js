import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { textStyle } from '../../components/common/styles';
import { Button } from '../../components/common';

class ProfileSetupComplete extends Component {
  render() {
    const localTextStyle = {...textStyle, textAlign: 'left', marginLeft: 30, marginRight: 30};
    return(
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <View style={{flex: 0.8, marginTop: 100}}>
          <Text style={localTextStyle}>
          Dear friends and family,
          </Text>
          <View style={{height: 10}} />
          <Text style={localTextStyle}>
          Thank you for helping test this alpha release. Now that you’ve created a profile you can browse, connect, and chat! We appreciate your feedback on technical bugs.
          </Text>
          <View style={{height: 15}} />
          <Text style={localTextStyle}>
          Best regards,
          </Text>
          <Text style={localTextStyle}>
          Shireen, Kayleigh, and Oscar
          </Text>
        </View>
        <View style={{flex: 0.18, marginBottom: 200}}>
        <Button onPress={() => Actions.main()}>Find an activity partner!</Button>
        </View>
      </View>
    );
  }
}

export { ProfileSetupComplete };
