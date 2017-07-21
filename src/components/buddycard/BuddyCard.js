import _ from 'lodash';
import React, { Component } from 'react';
import { Dimensions, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActivitySet from './ActivitySet';
import FirstConnectionHelperModal from '../common/FirstConnectionHelperModal';
import { ProfileImages, ProfileImagesModal } from '../common';
import { buttonStyle, centeredTextStyle } from '../common/styles';
import styles from './styles.js';
import CustomIcon from '../../assets/icons';

const { width, height } = Dimensions.get('window');

const BOTTOM_PADDING = 150; //creates space for the Connect button
const MARGIN = 15;

class BuddyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionExpanded: false,
      showModal: false,
      currentImageIndexOnSwiper: 0,
      scrollDirection: null,
    };
  }

  onOpenModal(index) {
    this.setState({ showModal: true, currentImageIndexOnSwiper: index });
  }
  onClose() {
    this.setState({ showModal: false });
  }

  showEditableButton(editable) {
    if(!editable) return;
    return (
      <View accessible>
        <TouchableOpacity
          onPress={() => Actions.userEdit()}
          style={buttonStyle}
          accessibilityLabel={'userEditButton'}
          testID={'userEditButton'}
        >
          <CustomIcon
            name="edit_icon"
            size={20}
            color="black"
            style={{padding: 4, marginTop: 10}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderMatchControls(likeable, uid, onConnect) {
    if(!likeable) return;
    return (
      <View style={localStyles.footer}>
        <TouchableOpacity onPress={() => onConnect()} style={localStyles.connectButton}>
            <Text style={localStyles.footerText}>Connect</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderActivitiesAffiliations(activities, affiliations, editable, imageLoaded) {
    //if there are none and this is a browseable profile, then return null
    if(!activities && !affiliations) {
      if(editable) {
        return (
          <TouchableOpacity onPress={() => Actions.userEdit()} style={buttonStyle}>
            <View style={{ justifyContent: 'center', padding: 75 }}>
              <Text style={centeredTextStyle}>Update your profile</Text>
            </View>
          </TouchableOpacity>
        );
      } else return null;
    }
    let activitiesAndAffiliations = [];
    // if there are none and this is an editable profile (user viewing their own profile) then
    // return a call to action to edit your profile
    if(activities && affiliations) {
      if(editable && activities.length === 0 && affiliations.length === 0) {
        return (
          <TouchableOpacity onPress={() => Actions.userEdit()} style={buttonStyle}>
            <View style={{ justifyContent: 'center', padding: 75 }}>
              <Text style={centeredTextStyle}>Update your profile</Text>
            </View>
          </TouchableOpacity>
        );
      }
      if(activities.length === 0 && affiliations.length === 0) return null;
      if(!activities && affiliations.length === 0) return null;
      if(activities.length === 0 && !affiliations) return null;

      let affs = affiliations;
      let acts = activities;
      if(typeof affiliations === 'object')
        affs = _.values(affiliations);
      if(typeof activities === 'object')
        acts = _.values(activities);
      activitiesAndAffiliations = [...acts, ...affs];
    }
    // at least some activities or affiliations exist, so render them
    if(activities && !affiliations) {
      activitiesAndAffiliations = activities;
    } else if(!activities && affiliations) {
      activitiesAndAffiliations = affiliations;
    }
    return (
      <View>
        <ActivitySet value={{activitiesAndAffiliations}} imageLoaded={imageLoaded} />
      </View>
    );
  }

  renderAge(age) {
    if(age) {
      return `, ${age}`;
    }
  }

  renderLocation(location, locationTextStyle) {
    if(_.isEmpty(location)) return;
    return <Text style={locationTextStyle}>{location.city}, {location.state}</Text>;
  }

  renderDescription(description, editable, likeable) {
    if(!description) return null;
    let descStyle = localStyles.descriptionStyle;
    if(editable || !likeable) descStyle = [descStyle, {marginBottom: 10}];
    return (
      <View style={descStyle}>
        <Text style={localStyles.descriptionText}>{description}</Text>
      </View>
    );
  }

  renderBuddyInfo() {
    const { firstName, age, editable, imageLoaded, likeable, location, profileImages, activities, affiliations, description, uid } = this.props.value;
    const { locationText, nameText } = styles;

    return (
        <View>
         <View style={{flexDirection: 'row'}}>
            <Text style={nameText}>
              {firstName}
              {this.renderAge(age)}
            </Text>
            {this.showEditableButton(editable)}
          </View>
          {this.renderLocation(location, locationText)}
          {this.renderActivitiesAffiliations(activities, affiliations, editable, imageLoaded)}
          {this.renderDescription(description, editable, likeable)}
      </View>
    );
  }

  render() {
    const { editable, likeable, profileImages, uid } = this.props.value;

    return (
      <View style={{flex: 1}}>
      <ScrollView>
          <ProfileImages
            value={{profileImages, editable}}
            onOpenModal={this.onOpenModal.bind(this)}
            imageLoaded={this.props.imageLoaded}
          />
          <ProfileImagesModal
            profileImages={profileImages}
            onClose={this.onClose.bind(this)}
            visible={this.state.showModal}
            initialIndex={this.state.currentImageIndexOnSwiper}
          />
        {this.renderBuddyInfo()}
      </ScrollView>
      {this.renderMatchControls(likeable, uid, this.props.onConnect)}
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 60 : 84,
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    backgroundColor: '#42D3D3',
    opacity: 0.97,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Source Sans Pro',
    alignItems: 'center',
    fontSize: 18,
  },
  descriptionStyle: {
    borderTopWidth: 1,
    borderColor: '#D5D5D5',
    marginTop: 10,
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginBottom: BOTTOM_PADDING,
  },
  descriptionText: {
    fontSize: 18,
    marginTop: MARGIN,
    fontFamily: 'Source Sans Pro',
    backgroundColor: 'white',
    color: 'black',
  },
});

export default BuddyCard;
