import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';
import { Spinner } from '../components/common';
import userSampleData from '../components/demo-data/Users.js';

class BrowseBuddies extends Component {
  render() {
    if(!userSampleData) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Spinner size="large" />
        </View>
      );
    } else {
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
                    likeable: true,
                  }}
                />
              </View>
            );
          })}
        </Swiper>
      );
    }
  }
}

const styles = {
  cardStyle: {
    flex: 1,
    elevation: 1
  },
};

const mapStateToProps = ({ auth }) => {
  const { loading } = auth;
  return { loading };
};

export default connect(mapStateToProps)(BrowseBuddies);
