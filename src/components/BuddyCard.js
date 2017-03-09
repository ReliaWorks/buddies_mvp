import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import ActivitySet from './ActivitySet';
import AffiliationSet from './AffiliationSet';

const { height, width } = Dimensions.get('window');

class BuddyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.value.firstName,
      age: this.props.value.age,
      location: this.props.value.location,
      profileImages: this.props.value.profileImages,
      activities: this.props.value.activities,
      affiliations: this.props.value.affiliations,
      description: this.props.value.description,
    };
  }
  renderActivities(activities) {
    if(activities.length > 0) return <ActivitySet value={{activities}} />;
  }

  renderAffiliations(affiliations) {
    if(affiliations.length > 0) return <AffiliationSet value={{affiliations}} />;
  }

  render() {
    const { firstName, age, location, profileImages, activities, affiliations, description } = this.state;
    const { containerStyle, imageStyle, textStyle, descriptionContainerStyle } = styles;

    return (
        <View style={{flex: 1, padding: 4 }}>
          <View style={containerStyle}>
            <Swiper horizontal={false}>
              {profileImages.map((img, key) => {
                return (
                  <View key={key}>
                    <Image
                      source={{ uri: img.imageURI }}
                      style={imageStyle}
                    />
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View style={descriptionContainerStyle}>
            <ScrollView>
              <Text style={textStyle}>{firstName}, {age}</Text>
              <Text style={textStyle}>{location.city}</Text>
              {this.renderActivities(activities)}
              {this.renderAffiliations(affiliations)}
              <Text style={textStyle}>{description}</Text>
            </ScrollView>
          </View>
        </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 3,
  },
  textStyle: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Avenir-Book',
  },
  imageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (height * 0.6) - 25, //60% of the screen - navbar height - padding
    width: width - 18,
  },
  descriptionContainerStyle: {
    flex: 2,
  }
};

export default BuddyCard;
