import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { textStyle } from '../components/common/styles';
import { Header } from '../components/common';

class PhotoSetup extends Component {

  componentWillMount() {
      console.log("On picsetup");
  }

  editPhoto() {

  }

  render() {
    return(
      <View>
      <Header headerTitle="Get Started" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text style={textStyle}>
          Review photos:
          </Text>
          <Button
            onPress={() => Actions.activitySetup()}
            style={textStyle}
            title="Next"
            color="#4267B2"
          />
        </View>


          <View style={styles.editIconStyle}>
            <TouchableOpacity onPress={this.editPhoto()}>

            </TouchableOpacity>
          </View>
        

      </View>
    );
  }
}

const styles = {
  editIconStyle: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    width: 30,
    padding: 5,
  },
  iconStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 25,
    width: 25
  },
  mainImageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    height: 300,
    width: null,
    padding: 5,
  },
  smallImageStyle: {
    height: 120,
    width: 120,
    justifyContent: 'flex-end',
    padding: 5,
  },
};

export default PhotoSetup;
