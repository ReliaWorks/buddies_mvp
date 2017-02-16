import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { textStyle } from '../common/styles';

class ProfileSetupComplete extends Component {
  render() {
    return(
      <View>
        <Text style={textStyle}>
        Great Job!
        </Text>
      </View>
    );
  }
}

export { ProfileSetupComplete };
