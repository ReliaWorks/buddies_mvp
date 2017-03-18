import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { backgroundImage, legalTextStyle } from '../components/common/styles';
import { loginUser, createUser } from '../actions';

//const backgroundImageURL = require('../components/common/img/WorkoutBuddiesImage.jpg');
const backgroundImageURL = require('../components/common/img/wavelengthLoginBackground.png');
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
  }

  renderLoginForm() {
    return (
      <View style={styles.container}>
        <Image source={backgroundImageURL} style={backgroundImage}>
          <View style={{ flex: 2, marginTop: 20 }}>
            <Image source={buddiesLogo} style={{height: 79, width: 102, opacity: 1.0}} />
          </View>
          <View style={styles.loginButtonContainer}>
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
    marginLeft: 10,
    marginRight: 10,
  },
  loginButtonContainer: {
    flex: .2,
    height: null,
    width: null,
    justifyContent: 'center',
    backgroundColor: '#4267B2',
    borderRadius: 10,
    marginBottom: 30,
  }
};

const mapStateToProps = ({ auth }) => {
  const { token } = auth;

  return { token };
};

export default connect(mapStateToProps, { loginUser, createUser })(LoginForm);
