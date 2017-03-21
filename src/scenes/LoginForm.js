import React, { Component } from 'react';
import { Dimensions, View, Image, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { backgroundImage, legalTextStyle } from '../components/common/styles';
import { loginUser } from '../actions';

const backgroundImageURL = require('../components/common/img/wavelengthLoginBackground.png');
//const buddiesLogo = require('../components/common/img/buddies_logo.png');

const { width } = Dimensions.get('window');
const LOGINFORM_MARGIN = 14;

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
//  <Image source={buddiesLogo} style={{height: 79, width: 102, opacity: 1.0}} />

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

const mapStateToProps = ({ auth }) => {
  const { token } = auth;

  return { token };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
