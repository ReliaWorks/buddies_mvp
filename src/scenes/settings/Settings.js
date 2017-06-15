import React, { Component } from 'react';
import { Dimensions, Linking, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../../components/common';
import { GenderPreference, AgePreference, LocationPreference } from '../../components/preferences';
import styles from './styles';
import { TOS, PRIVACY_POLICY } from '../../constants';

const { width } = Dimensions.get('window');
const MARGIN = 15;

class Settings extends Component {
  openTermsOfService() {
    Actions.pdf({path: TOS});
  }
  openPrivacyPolicy() {
    Actions.pdf({path: PRIVACY_POLICY});
/*    const url = 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/legal%2FApple_Developer_Program_License_Agreement_20160921.pdf?alt=media&token=07bb73b8-b294-42a0-817a-92fd8150d347';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
    */
  }

  openFeedbackLink() {
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdJHltyOCqdnsafVNCyBOC55MDEx9ixnZ9gIyb3eZRJCMxBIg/viewform?usp=sf_link';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

/*  <Text style={styles.textStyle}>
    {this.props.value.firstName}
  </Text>
*/
  renderHeader() {
    return (
      <View style={{marginBottom: MARGIN, marginTop: MARGIN, flex: 0.3 }}>
        <Text style={styles.headerText}>
          Preferences
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
          style={localStyles.feedbackLinkStyle}
          onPress={this.openFeedbackLink}
        >
          Provide Feedback
        </Text>
      </View>
    );
  }
  renderLinks() {
    return (
      <View style={styles.linkContainerStyle}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.openPrivacyPolicy}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderWidth: 1, borderColor: 'lightgray', height: 25 }} />
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.openTermsOfService}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
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

  renderDeactivateButton() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
      <Text
        onPress={this.props.onDeactivate}
        style={{...localStyles.feedbackLinkStyle, fontSize: 14}}
      >
        Deactivate Account
      </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between', backgroundColor: '#F8F8F8'}}>
        {this.renderHeader()}
        {this.renderPreferences()}
        {this.renderFeedbackButton()}
        {this.renderLinks()}
        {this.renderLogoutButton()}
        {this.renderDeactivateButton()}
      </View>
    );
  }
}

const localStyles = {
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    width: width - (MARGIN * 2),
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginBottom: 5,
  },
  feedbackLinkStyle: {
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
};

export default Settings;
