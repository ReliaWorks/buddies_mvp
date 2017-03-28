import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivitySet from './ActivitySet';
import { ProfileImages } from '../common';
import { buttonStyle, centeredTextStyle } from '../common/styles';
import styles from './styles.js';

class BuddyCard extends Component {
  showEditableButton(editable) {
    if(!editable) return;
    return (
      <View>
        <TouchableOpacity onPress={() => Actions.userEdit()} style={buttonStyle}>
          <Icon
            name="edit"
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
        <TouchableOpacity
          onPress={onConnect}
          style={localStyles.connectButton}
        >
            <Text style={localStyles.footerText}>Connect</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderActivitiesAffiliations(activities, affiliations, editable) {
    //if there are none and this is a browseable profile, then return null
    if(!activities && !affiliations) return null;
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
    }
    // at least some activities or affiliations exist, so render them
    let activitiesAndAffiliations = affiliations;
    if(activities) {
      if(activities.length > 0) activitiesAndAffiliations = activities.concat(affiliations);
    }
    return (
        <ActivitySet value={{activitiesAndAffiliations}} />
    );
  }

  renderAge(age) {
    if(age) {
      return `, ${age}`;
    }
  }

  renderLocation(location, locationTextStyle) {
    if(_.isEmpty(location)) return;
    return <Text style={locationTextStyle}>{location.city}, {location.distance} away</Text>;
  }

  render() {
    const { firstName, age, editable, likeable, location, profileImages, activities, affiliations, description, uid } = this.props.value;
    const { locationTextStyle, nameTextStyle, descriptionContainerStyle } = styles;

    return (
        <View style={{flex: 1, alignSelf: 'stretch' }}>
          <ProfileImages value={{profileImages, editable}} />
          <View style={descriptionContainerStyle}>
            <ScrollView>
              <View style={{ flexDirection: 'row' }}>
                <Text style={nameTextStyle}>
                  {firstName}
                  {this.renderAge(age)}
                </Text>
                {this.showEditableButton(editable)}
              </View>
              {this.renderLocation(location, locationTextStyle)}
              {this.renderActivitiesAffiliations(activities, affiliations, editable)}
              <View style={{ marginTop: 15, borderTopWidth: 0.5 }}>
                <Text style={localStyles.descriptionText}>{description}</Text>
              </View>
            </ScrollView>
            {this.renderMatchControls(likeable, uid, this.props.onConnect)}
          </View>
        </View>
    );
  }
}

const localStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 100,
    right: 100,
    bottom: 55,
    backgroundColor: 'white',
    borderColor: 'black',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
    backgroundColor: '#1DABB5',
    opacity: 0.75,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
    alignItems: 'center',
    fontSize: 18,
  },
  descriptionText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 15,
    fontFamily: 'Avenir-Book',
    backgroundColor: 'white',
  }
});

export default BuddyCard;
