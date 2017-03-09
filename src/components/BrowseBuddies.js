import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import BuddyCard from './buddycard/BuddyCard';
import userSampleData from './demo-data/Users.js';

class BrowseBuddies extends Component {
  render() {
    return (
      <Swiper>
        {userSampleData.map((buddy, key) => {
          return (
            <View key={key} style={styles.cardStyle}>
              <BuddyCard
                value={{
                  firstName: buddy.firstName,
                  age: buddy.age,
                  location: buddy.location,
                  profileImages: buddy.profileImages,
                  activities: buddy.activities,
                  affiliations: buddy.affiliations,
                  description: buddy.description,
                }}
              />
            </View>
          );
        })}
      </Swiper>
    );
  }
}

const styles = {
  cardStyle: {
    flex: 1,
    padding: 5,
    elevation: 1
  },
};

export default BrowseBuddies;
