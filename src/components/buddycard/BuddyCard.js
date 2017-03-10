import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import ActivitySet from './ActivitySet';
import AffiliationSet from './AffiliationSet';
import { profileImageStyle } from '../common/styles';
import styles from './styles.js';

class BuddyCard extends Component {
  renderActivities(activities) {
    if(activities.length > 0) return <ActivitySet value={{activities}} />;
  }

  renderAffiliations(affiliations) {
    if(affiliations.length > 0) return <AffiliationSet value={{affiliations}} />;
  }

  render() {
    const { firstName, age, location, profileImages, activities, affiliations, description } = this.props.value;
    const { containerStyle, locationTextStyle, nameTextStyle, textStyle, descriptionContainerStyle } = styles;

    return (
        <View style={{flex: 1, padding: 4, alignSelf: 'stretch' }}>
          <View style={containerStyle}>
            <Swiper horizontal={false}>
              {profileImages.map((img, key) => {
                return (
                  <View key={key}>
                    <Image
                      source={{ uri: img.imageURI }}
                      style={profileImageStyle}
                    />
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View style={descriptionContainerStyle}>
            <ScrollView>
              <Text style={nameTextStyle}>{firstName}, {age}</Text>
              <Text style={locationTextStyle}>{location.city}, {location.distance} away</Text>
              {this.renderActivities(activities)}
              {this.renderAffiliations(affiliations)}
              <Text style={textStyle}>{description}</Text>
            </ScrollView>
          </View>
        </View>
    );
  }
}

export default BuddyCard;
