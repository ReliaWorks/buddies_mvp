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
      (data) => {
        if (data) {
          Actions.main();
        }
      }
    ).catch((error) => {
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
//    if (this.props.loggedIn) {
//      Actions.main();
//    } else {
      return this.renderLoginForm();
//    }
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
//export default LoginForm;
/*  loginWithFacebook() {
    const auth = firebase.auth();
    const provider = firebase.auth.FacebookAuthProvider;

    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_photos'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
            .then(accessTokenData => {
              const credential = provider.credential(accessTokenData.accessToken);
              return auth.signInWithCredential(credential);
            }).then(credData => {
              console.log(credData);
            }).catch(err => {
              console.log(err);
            });
          this.loggedIn = true;
          Actions.profileSetup();
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      }
    );
  }
  initUser(token) {
    const profileRequestParams = {
      fields: {
        string: 'id, name, email, first_name, last_name, gender, user_photos'
      }
    };

    const profileRequestConfig = {
      httpMethod: 'GET',
      version: 'v2.5',
      parameters: profileRequestParams,
      accessToken: token.toString()
    };

    const profileRequest = new GraphRequest(
      '/me',
      profileRequestConfig,
      responseCallback,
    );
    console.log("Start the graph request.");

    new GraphRequestManager().addRequest(profileRequest).start();
    console.log('After new GraphRequestManager');
    console.log(response.json.first_name);
    this.setState({ first_name: response.json.first_name, last_name: response.json.last_name });
    console.log(this);
    this.setState({ name: req.name });
    this.setState({ email: req.email });
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        // Some user object has been set up somewhere, build that user here
        this.setState({ email: json.email });
        this.setState({ name: json.name });
        user.id = json.id;
        user.user_friends = json.friends;
        user.email = json.email;
        user.username = json.name;
        user.loading = false;
        user.loggedIn = true;
        user.avatar = setAvatar(json.id);
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
      });
  }

*/