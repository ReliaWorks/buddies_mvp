import _ from 'lodash';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActivitySet from './ActivitySet';
import AffiliationSet from './AffiliationSet';
import { ProfileImages } from '../common';
import { EDIT_ICON } from '../../scenes/profile-setup/strings';
import { buttonStyle, iconStyle, textStyle } from '../common/styles';
import styles from './styles.js';

class BuddyCard extends Component {
  showEditableButton(editable) {
    if(!editable) return;
    return (
      <View>
        <TouchableOpacity onPress={() => Actions.userEdit()} style={buttonStyle}>
          <Image
            style={iconStyle}
            source={{ uri: EDIT_ICON}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderMatchControls(likeable) {
    if(!likeable) return;
    return (
      <View style={localStyles.footer}>
        <TouchableOpacity style={localStyles.passButton}>
          <Text style={localStyles.footerText}>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={localStyles.connectButton}>
            <Text style={localStyles.footerText}>Connect</Text>
        </TouchableOpacity>
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
    return <Text style={locationTextStyle}>{location.city}, {location.distance} away</Text>;
  }

  render() {
    const { firstName, age, editable, likeable, location, profileImages, activities, affiliations, description } = this.props.value;
    const { locationTextStyle, nameTextStyle, descriptionContainerStyle } = styles;

    return (
        <View style={{flex: 1, padding: 4, alignSelf: 'stretch' }}>
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
              <ActivitySet value={{activities}} />
              <AffiliationSet value={{affiliations}} />
              <Text style={textStyle}>{description}</Text>
            </ScrollView>
            {this.renderMatchControls(likeable)}
          </View>
        </View>
    );
  }
}

const localStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: -15,
    right: -15,
    bottom: 45,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'teal',
    opacity: 0.75,
  },
  passButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'darkgray',
    opacity: 0.75,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18,
  },
});

export default BuddyCard;
