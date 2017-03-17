import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ActivitySet from './ActivitySet';
import AffiliationSet from './AffiliationSet';
import { ProfileImages } from '../common';
import styles from './styles.js';

class BuddyCard extends Component {
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
    const { firstName, age, location, profileImages, activities, affiliations, description } = this.props.value;
    const { containerStyle, locationTextStyle, nameTextStyle, textStyle, descriptionContainerStyle } = styles;

    return (
        <View style={{flex: 1, padding: 4, alignSelf: 'stretch' }}>
          <ProfileImages value={{profileImages, containerStyle}} />
          <View style={descriptionContainerStyle}>
            <ScrollView>
              <Text style={nameTextStyle}>
                {firstName}
                {this.renderAge(age)}
              </Text>
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
