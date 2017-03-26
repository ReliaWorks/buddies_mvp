import React, { Component } from 'react';
import { Dimensions, View, Image, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../components/common';
import { backgroundImage, legalTextStyle } from '../components/common/styles';
import { loginUser } from '../actions';

const backgroundImageURL = require('../components/common/img/wavelengthLoginBackground.png');
//const buddiesLogo = require('../components/common/img/buddies_logo.png');

const { width } = Dimensions.get('window');
const LOGINFORM_MARGIN = 14;

class LoginForm extends Component {
//  <Image source={buddiesLogo} style={{height: 79, width: 102, opacity: 1.0}} />

  onButtonPress() {
    this.props.loginUser();
  }

  renderLoginForm() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', flex: 0.1, marginTop: -30}}>
          <Text
            style={{
              fontFamily: 'Avenir-Book',
              fontSize: 45,
              fontWeight: 'bold',
            }}
          >
            Buddies
          </Text>
        </View>
        <Image source={backgroundImageURL} style={backgroundImage}>
          <View style={{ flex: 2, marginTop: 20 }} />
          <View style={styles.loginButtonContainer}>
            <TouchableHighlight
              onPress={this.onButtonPress.bind(this)}
              color="white"
            >
              <Text style={styles.fbLoginText}>Log in with Facebook</Text>
            </TouchableHighlight>
          </View>
        </Image>
        <View>
          <Text style={legalTextStyle}>Terms of Service</Text>
        </View>
      </View>
    );
  }

  render() {
    if(this.props.loading) {
      console.log("this.props.loading = true");
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Spinner size="large" />
        </View>
      );
    }
    console.log("Rendering login form");
    return this.renderLoginForm();
  }
}

const styles = {
  container: {
   flex: 1,
    justifyContent: 'flex-end'
  },
  fbLoginText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  loginButtonContainer: {
    flex: 0.2,
    height: null,
    width: width - (LOGINFORM_MARGIN * 2),
    justifyContent: 'center',
    backgroundColor: 'black',
  }
};

const mapStateToProps = (state) => {
  const { token, loggedIn, loading } = state.auth;

  return { token, loggedIn, loading };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
