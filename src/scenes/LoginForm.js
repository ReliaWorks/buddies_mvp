import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import {
  AccessToken,
} from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import { backgroundImage, loginButtonStyle, legalTextStyle } from '../components/common/styles';
import { loginUser, createUser } from '../actions';
//import { Card, CardItem, Button, Input, Spinner } from './common';

const backgroundImageURL = require('../components/common/img/WorkoutBuddiesImage.jpg');
const buddiesLogo = require('../components/common/img/buddies_logo.png');

/* LoginForm.js
 * ------------
 * Check to see if the user had already authenticated
 *  - if so, direct to the browse page
 *  - if not, display login form
 * Login Form: prompt user to login via FB
 *  - if user already has an account, then direct to the browse page
 *  - if not, direct to the profile setup scene
 */

class LoginForm extends Component {
  componentWillMount() {
    console.log("in LoginForm componentWillMount");
    AccessToken.getCurrentAccessToken().then(
      (accessTokenData) => {
        console.log("LoginForm");
        console.log(accessTokenData);
        if (accessTokenData) {
          Actions.main();
        }
      }
    ).catch((error) => {
      console.log("no token");
      console.log(error);
    });
  }

  renderLoginForm() {
    return (
      <View style={styles.container}>
        <Image source={backgroundImageURL} style={backgroundImage}>
          <View>
            <Image source={buddiesLogo} style={{height: 79, width: 102, opacity: 1.0}} />
          </View>
          <View style={loginButtonStyle}>
            <TouchableHighlight
              onPress={this.props.loginUser}
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
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
};

const mapStateToProps = ({ auth }) => {
  const { token } = auth;

  return { token };
};

export default connect(mapStateToProps, { loginUser, createUser })(LoginForm);
