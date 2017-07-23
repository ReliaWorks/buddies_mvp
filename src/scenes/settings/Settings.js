import React, { Component } from 'react';
import { Dimensions, Linking, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Confirm } from '../../components/common';
import { buttonStyle } from '../../components/common/styles';
import { GenderPreference, AgePreference, LocationPreference } from '../../components/preferences';
import styles from './styles';
import CustomIcon from '../../assets/icons';
import { TOS, PRIVACY_POLICY, SAFETY_TIPS } from '../../constants';

const { width } = Dimensions.get('window');
const MARGIN = 15;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeactivateConfirmModal: false,
      showLogoutConfirmModal: false
    };
  }

  openPDF(path) {
    Actions.pdf({path});
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

  renderHeader() {
    return (
      <View style={localStyles.headerContainer}>
        <Text style={styles.headerText}>
          Preferences
        </Text>
      </View>
    );
  }

//  <AgePreference />

  renderPreferences() {
    return (
      <View style={{flex: 25, justifyContent: 'space-between', marginTop: 10, marginBottom: 10}}>
        <GenderPreference />
        <LocationPreference />
      </View>
    );
  }

  renderFeedbackButton() {
    return (
      <View style={{justifyContent: 'center', flex: 10}}>
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
          <TouchableOpacity onPress={() => this.openPDF(PRIVACY_POLICY)}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderWidth: 1, borderColor: 'lightgray', height: 25 }} />
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => this.openPDF(TOS)}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderWidth: 1, borderColor: 'lightgray', height: 25 }} />
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => this.openPDF(SAFETY_TIPS)}>
            <Text style={styles.linkText}>Safety Tips</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  showLogoutConfirmModal() {
    this.setState({showLogoutConfirmModal: true});
  }
  cancelLogout() {
    this.setState({showLogoutConfirmModal: false});
  }
  acceptLogout() {
    this.props.onLogout();
    this.setState({showLogoutConfirmModal: false});
  }

/*  <Button
    onPress={this.showLogoutConfirmModal.bind(this)}
    style={localStyles}
  >
*/
  renderLogout() {
    return (
      <View style={styles.linkContainerStyle}>
        <Text
          onPress={this.showLogoutConfirmModal.bind(this)}
          style={styles.linkText}
        >Logout</Text>
        <Confirm
          visible={this.state.showLogoutConfirmModal}
          onAccept={this.cancelLogout.bind(this)}
          onDecline={this.acceptLogout.bind(this)}
          actionText='Logout'
        >
          Are you sure you want to logout?
        </Confirm>
        <View style={{borderWidth: 1, borderColor: 'lightgray', height: 25 }} />
        {this.renderDeactivateButton()}
      </View>
    );
  }

  showDeactivationConfirmModal() {
    this.setState({showDeactivateConfirmModal: true});
  }
  cancelDeactivation() {
    this.setState({showDeactivateConfirmModal: false});
  }
  acceptDeactivation() {
    this.props.onDeactivate();
    this.setState({showDeactivateConfirmModal: false});
  }
  renderDeactivateButton() {
    return (
      <View>
        <Text
          onPress={this.showDeactivationConfirmModal.bind(this)}
          style={styles.linkText}
        >Deactivate Account</Text>
        <Confirm
          visible={this.state.showDeactivateConfirmModal}
          onAccept={this.cancelDeactivation.bind(this)}
          onDecline={this.acceptDeactivation.bind(this)}
          actionText='Deactivate'
        >
          Are you sure you want to deactivate your account?
        </Confirm>
      </View>
    );
  }

  editIcon() {
    return (
      <View accessible>
        <TouchableOpacity
          onPress={() => Actions.location()}
          style={{...buttonStyle, marginRight: 15}}
        >
          <CustomIcon
            name="edit_icon"
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderLocation() {
    const { location } = this.props.value;
    return (
      <View style={{...styles.preferenceContainer, flex: 7, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={localStyles.locationHeaderText}>Location: <Text style={{fontFamily: 'Source Sans Pro', fontWeight: '400'}}>{location.city}, {location.state}
          </Text>
        </Text>
        {this.editIcon()}
      </View>
    );
  }

//        {this.renderFeedbackButton()}
  render() {
    return (
      <View style={localStyles.pageContainer}>
        {this.renderHeader()}
        {this.renderPreferences()}
        {this.renderLocation()}
        {this.renderLinks()}
        {this.renderLogout()}
      </View>
    );
  }
}

const localStyles = {
  pageContainer: {
    flex: 10,
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    marginTop: -10,
  },
  headerContainer: {
    marginTop: MARGIN + 10,
  },
  locationContainer: {
    margin: MARGIN,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  locationHeaderText: {
    fontFamily: 'Source Sans Pro',
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  locationText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
  buttonStyle: {
    flex: 10,
    justifyContent: 'center',
    backgroundColor: 'black',
    width: width - (MARGIN * 2),
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginBottom: 5,
  },
  feedbackLinkStyle: {
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
};

export default Settings;
