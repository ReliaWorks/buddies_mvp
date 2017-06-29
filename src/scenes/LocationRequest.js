import React, { Component } from 'react';
import { Dimensions, findNodeHandle, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setLocationFromAddress, potentialsFetch } from '../actions';
import { Button } from '../components/common';
import { LOCATION_ICON } from '../constants';

const { width } = Dimensions.get('window');
const ICON_WIDTH = 25;
const MARGIN = 15;

class LocationRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onClose() {
    Actions.pop();
  }

  onPress(address) {
    if(address) {
      this.props.setLocationFromAddress(address);
      Actions.pop();
    } else {
      alert("You need to type a city, state");
    }
  }

  renderLocationPrompt() {
    return(
      <KeyboardAvoidingView style={styles.textContainer} behavior="padding">
        <Text style={styles.semiBoldText}>Enter your location below or enable</Text>
        <Text style={styles.semiBoldText}>location services in your phone settings.</Text>
        <TextInput
          style={styles.locationInput}
          placeholder="City, State or Zipcode"
          onChangeText={(text) => { this.setState({text}); }}
        />
        <Button styles={buttonStyles} onPress={() => this.onPress(this.state.text)}>Save Location</Button>
      </KeyboardAvoidingView>
    );
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your location is needed</Text>
          <Text style={styles.text}>to find partners.</Text>
        </View>
        <Image source={LOCATION_ICON} style={styles.imageStyle} />
        {this.renderLocationPrompt()}
        <View style={{height: 250}} />
      </View>
      </ScrollView>
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
    textAlign: 'center'
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

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { setLocationFromAddress, potentialsFetch })(LocationRequest);
