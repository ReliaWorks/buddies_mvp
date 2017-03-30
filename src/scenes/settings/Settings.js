import React, { Component } from 'react';
import { Dimensions, Linking, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/common';
import { GenderPreference, AgePreference, LocationPreference } from '../../components/preferences';
import styles from './styles';

const { width } = Dimensions.get('window');
const LOGINFORM_MARGIN = 15;

class Settings extends Component {
  openPrivacyPolicy() {
    const url = 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/legal%2FApple_Developer_Program_License_Agreement_20160921.pdf?alt=media&token=07bb73b8-b294-42a0-817a-92fd8150d347';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  openTermsOfService() {
    const url = 'http://www.cnn.com';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  renderHeader() {
    const { textStyle } = styles;

    return (
      <View style={{marginBottom: 30, flex: 0.5 }}>
        <Text style={textStyle}>
          {this.props.value.firstName}
        </Text>
        <Text style={styles.headerText}>
          Match Preferences
        </Text>
      </View>
    );
  }

  renderPreferences() {
    return (
      <View style={{flex: 8, justifyContent: 'space-between', marginTop: 10, marginBottom: 10}}>
        <GenderPreference />
        <AgePreference />
        <LocationPreference />
      </View>
    );
  }

  renderFeedbackButton() {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text
          style={{
            fontFamily: 'Avenir-Book',
            fontWeight: '700',
            fontSize: 16,
            textAlign: 'center',
            textDecorationLine: 'underline'
          }}
        >
          Provide Feedback
        </Text>
      </View>
    );
  }
  renderLinks() {
    return (
      <View style={styles.linkContainerStyle}>
        <TouchableOpacity onPress={this.openPrivacyPolicy}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <View style={{borderWidth: 1, borderColor: 'lightgray', height: 25 }}/>
        <TouchableOpacity onPress={this.openTermsOfService}>
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderLogoutButton() {
    return (
      <Button
        onPress={this.props.onLogout}
        style={localStyles}
      >
        Logout
      </Button>
    );
  }
/*  renderLogoutButton() {
    return (
      <View style={styles.logoutContainerStyle}>
        <LoginButton
          onLogoutFinished={() => {
            firebase.auth().signOut().then(() => {
              this.props.value.onLogout();
              Actions.root();
            }, (error) => {
              console.log(`Error signing out ${error}`);
            });
          }}
        />
      </View>
    );
  }
*/
//  {this.renderLinks()}

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between', backgroundColor: '#F8F8F8'}}>
        {this.renderHeader()}
        {this.renderPreferences()}
        {this.renderFeedbackButton()}
        {this.renderLogoutButton()}
      </View>
    );
  }
}

const localStyles = {
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    fontWeight: '700',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    width: width - (LOGINFORM_MARGIN * 2),
    marginLeft: LOGINFORM_MARGIN,
    marginRight: LOGINFORM_MARGIN,
    marginBottom: 5,
  }
};

export default Settings;
