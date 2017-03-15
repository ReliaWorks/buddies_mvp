import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class PictSetup extends Component {

  componentWillMount() {
      console.log("On picsetup");
  }

  render() {
    return(
      <View>
        <Text>Pict setup</Text>
      </View>
    );
  }
}


export default PictSetup;
