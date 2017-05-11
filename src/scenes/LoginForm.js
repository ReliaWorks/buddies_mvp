import React, { Component } from 'react';
import { Dimensions, View, Image, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Spinner } from '../components/common';
import { legalTextStyle } from '../components/common/styles';
import { loginUser } from '../actions';

const appName = "wavelength";
const backgroundImageURL = require("../assets/img/wavelength.png");

const { width } = Dimensions.get('window');
const LOGINFORM_MARGIN = 15;

class LoginForm extends Component {
  onButtonPress() {
    this.props.loginUser();
  }

  renderAppName() {
    return(
      <View style={styles.nameContainer}>
        <Text
          style={{
            fontFamily: 'Source Sans Pro',
            fontSize: 45,
            fontWeight: 'bold',
          }}
        >
          {appName}
        </Text>
      </View>
    );
  }
//  {this.renderAppName()}

  renderLoginForm() {
    return (
      <View style={styles.container}>
        <Image source={backgroundImageURL} style={styles.backgroundImage} />
        <Button
          onPress={this.onButtonPress.bind(this)}
          styles={{buttonStyle: styles.loginButtonContainer, textStyle: styles.fbLoginText }}
        >
          Log in with Facebook
        </Button>
        <View style={styles.termsContainer}>
          <Text style={legalTextStyle}>Terms of Service</Text>
        </View>
      </View>
    );
  }

//  <View style={styles.solidContainer}>

  renderLoginForm2() {
    return (
      <LinearGradient colors={['#FF4F7D', '#6091FF', '#75FED8']} style={styles.linearGradient}>
        <View style={{justifyContent: 'center', flex: 35}}>
        <Text style={styles.nameText}>Wavelength</Text>
        <View style={{height: 10}}/>
        <Text style={styles.taglineText}>Meet people who share</Text>
        <Text style={styles.taglineText}>your interests.</Text>
        </View>
        <Button
          onPress={this.onButtonPress.bind(this)}
          styles={{buttonStyle: styles.loginButtonContainer, textStyle: styles.fbLoginText }}
        >
          Login with Facebook
        </Button>
        <View style={styles.termsContainer}>
          <Text style={legalTextStyle}>Terms of Service</Text>
        </View>
      </LinearGradient>
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
    return this.renderLoginForm2();
  }

  render() {
    return this.renderContent();
  }
}

// Valid Source Sans Pro FontFamily names are: 'SourceSansPro-Regular', 'Source Sans Pro', 'SourceSansPro-It'

const styles = {
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  solidContainer: {
   flex: 1,
   backgroundColor: '#FF4F7D',
   justifyContent: 'flex-end'
  },
  nameText: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'transparent'
  },
  taglineText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'SourceSansPro-SemiBold',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'transparent'
  },
  fbLoginText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    fontWeight: '500',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  nameContainer: {
    alignItems: 'center',
    flex: 3,
    marginTop: -35,
    marginBottom: 10,
  },
  loginButtonContainer: {
    flex: 4,
    width: width - (LOGINFORM_MARGIN * 2),
    marginTop: 10,
    marginLeft: LOGINFORM_MARGIN,
    marginRight: LOGINFORM_MARGIN,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  termsContainer: {
    flex: 3,
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -30,
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
