import React, { Component } from 'react';
import { Dimensions, View, Image, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Spinner } from '../components/common';
import { legalTextStyle } from '../components/common/styles';
import { loginUser } from '../actions';

const appName = "wavelength";
const backgroundImageURL = require('../components/common/img/wavelengthLoginBackground.png');

const { width } = Dimensions.get('window');
const LOGINFORM_MARGIN = 15;

class LoginForm extends Component {
  componentWillMount() {
    if(this.props.loggedIn) Actions.main();
  }

  onButtonPress() {
    this.props.loginUser();
  }

  renderAppName() {
    return(
      <View style={styles.nameContainer}>
        <Text
          style={{
            fontFamily: 'Avenir-Book',
            fontSize: 45,
            fontWeight: 'bold',
          }}
        >
          {appName}
        </Text>
      </View>
    );
  }
  renderLoginForm() {
    return (
      <View style={styles.container}>
        {this.renderAppName()}
        <Image source={backgroundImageURL} style={styles.backgroundImage} />
          <View style={styles.loginButtonContainer}>
            <TouchableHighlight
              onPress={this.onButtonPress.bind(this)}
              color="white"
            >
              <Text style={styles.fbLoginText}>Log in with Facebook</Text>
            </TouchableHighlight>
          </View>
        <View style={styles.termsContainer}>
          <Text style={legalTextStyle}>Terms of Service</Text>
        </View>
      </View>
    );
  }

  renderContent() {
    if(this.props.loading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Spinner size="large" />
        </View>
      );
    }
    return this.renderLoginForm();
  }

  render() {
    return this.renderContent();
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
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  nameContainer: {
    alignItems: 'center',
    flex: 3,
    marginTop: -35,
    marginBottom: 10
  },
  loginButtonContainer: {
    flex: 3,
    width: width - (LOGINFORM_MARGIN * 2),
    marginTop: 10,
    marginLeft: LOGINFORM_MARGIN,
    marginRight: LOGINFORM_MARGIN,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  termsContainer: {
    flex: 3,
  },
  backgroundImage: {
    flex: 35,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    marginLeft: LOGINFORM_MARGIN,
    marginRight: LOGINFORM_MARGIN,
    width: null,
    height: null,
  }
};

const mapStateToProps = (state) => {
  const { token, loggedIn, loading } = state.auth;

  return { token, loggedIn, loading };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
