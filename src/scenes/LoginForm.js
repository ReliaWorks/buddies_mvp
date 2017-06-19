import React, { Component } from 'react';
import { Dimensions, View, Image, Text, TouchableHighlight, WebView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Spinner, GlowLoader } from '../components/common';
import { legalTextStyle } from '../components/common/styles';
import { loginUser } from '../actions';
import { TOS } from '../constants';

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

  animationRef(animation) {
    this.animation = animation;
    if(this.animation)
      this.animation.play();
  }

  render() {
//    if(this.props.loading)
//      return <GlowLoader animationRef={this.animationRef} />;
    const loadingComponent = this.props.loading
      ? (
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
          <Spinner size="large" color="white" />
        </View>
      )
      : null;

    return (
      <LinearGradient colors={['#FF4F7D', '#6091FF', '#75FED8']} style={styles.linearGradient}>
        <View style={{justifyContent: 'center', flex: 35}}>
          <Text style={styles.nameText}>Wavelength</Text>
          <View style={{height: 10}} />
          <Text style={styles.taglineText}>Meet people who share</Text>
          <Text style={styles.taglineText}>your interests.</Text>
        </View>

        {loadingComponent}

        <Button
          onPress={this.onButtonPress.bind(this)}
          styles={{buttonStyle: styles.loginButtonContainer, textStyle: styles.fbLoginText }}
          disabled={this.props.loading}
        >
          Login with Facebook
        </Button>

        <View style={styles.termsContainer}>
          <Text
            style={legalTextStyle}
            onPress={() => Actions.tos({path: TOS})}
          >
            Terms of Service
          </Text>
        </View>

      </LinearGradient>
    );
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
  const { loggedIn, loading } = state.auth;

  return { loggedIn, loading };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
