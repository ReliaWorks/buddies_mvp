import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../components/common';
import { LOCATION_ICON } from '../constants';

const { width } = Dimensions.get('window');
const ICON_WIDTH = 25;
const MARGIN = 15;

class LocationRequest extends Component {

  onClose() {
    Actions.pop();
  }

  onPress() {
    Actions.browse();
  }

  renderCloseIcon() {
    return (
      <TouchableOpacity onPress={this.onClose}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Icon
            name="close"
            size={ICON_WIDTH}
            style={{marginRight: MARGIN}}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderLocationPrompt(onChangeText) {
    return(
      <View style={styles.textContainer}>
        <Text style={styles.semiBoldText}>Enter your location</Text>
        <TextInput
          style={styles.locationInput}
          placeholder="City, State"
          onChangeText={onChangeText}
        />
        <Button styles={buttonStyles} onPress={this.onPress}>Save Location</Button>
      </View>
    );
  }

  render() {
    return(
      <View style={{flex: 1}}>
        {this.renderCloseIcon()}
        <View style={styles.container}>
          <View style={{height: 50}} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Your location is needed</Text>
            <Text style={styles.text}>You can also enable location</Text>
            <Text style={styles.text}>services in your app settings</Text>
          </View>
          <View style={{height: 25}} />
          <Image source={LOCATION_ICON} style={styles.imageStyle} />
          {this.renderLocationPrompt()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
    alignItems: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: MARGIN,
  },
  semiBoldText: {
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '500',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Source Sans Pro'
  },
  imageStyle: {
    width: 52,
    height: 80,
    margin: MARGIN
  },
  locationInput: {
    height: 40,
    padding: 10,
    margin: MARGIN,
    fontFamily: 'Source Sans Pro',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black'
  }
});

const buttonStyles = {
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: '#42D3D3',
    width: width - (MARGIN * 4),
    height: 60,
//    marginLeft: MARGIN,
//    marginRight: MARGIN,
//    marginBottom: 5,
  }
};


export default LocationRequest;
