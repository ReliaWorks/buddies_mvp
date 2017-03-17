import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ActivitySet from './ActivitySet';
import AffiliationSet from './AffiliationSet';
import { ProfileImages } from '../common';
import { buttonStyle, textStyle } from '../common/styles';
import styles from './styles.js';

class BuddyCard extends Component {
  showEditableButton(editable) {
    if(!editable) return;
    return (
      <View>
        <TouchableOpacity style={buttonStyle}>
          <Text style={textStyle}>
          Edit
          </Text>
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
    const { firstName, age, editable, location, profileImages, activities, affiliations, description } = this.props.value;
    const { locationTextStyle, nameTextStyle, descriptionContainerStyle } = styles;

    return (
        <View style={{flex: 1, padding: 4, alignSelf: 'stretch' }}>
          <ProfileImages value={{profileImages, editable}} />
          <View style={descriptionContainerStyle}>
            <ScrollView>
              <Text style={nameTextStyle}>
                {firstName}
                {this.renderAge(age)}
              </Text>
              {this.showEditableButton(editable)}
              {this.renderLocation(location, locationTextStyle)}
              <ActivitySet value={{activities}} />
              <AffiliationSet value={{affiliations}} />
              <Text style={textStyle}>{description}</Text>
            </ScrollView>
          </View>
        </View>
    );
  }
}

export default BuddyCard;
