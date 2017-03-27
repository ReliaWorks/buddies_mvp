import React, { Component } from 'react';
import axios from 'axios';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';
import { Spinner } from '../components/common';

class BrowseBuddies extends Component {
  state = { matches: [] };

  componentWillMount() {
    axios.get('https://matching-api.appspot.com/match/0du4iTIWosZCGXvMmd0jmUYFoUW2')
      .then(response => {
        const keys = Object.keys(response.data);
        const arr = [];

        keys.forEach((key) => {
          arr.push(response.data[key]);
        });
        this.setState({ matches: arr });
      });
  }

  render() {
    if(this.state.matches.length === 0) {
      return (
        <Spinner size="large" />
      );
    } else {
      return (
      <Swiper>
        {this.state.matches.map((buddy, key) => {
          return (
            <View key={key} style={styles.cardStyle}>
              <BuddyCard
                value={{
                  firstName: buddy.first_name,
                  age: "36",
                  location: { city: 'San Francisco, CA', distance: "4 miles" },
                  profileImages: buddy.profileImages,
                  activities: buddy.activities,
                  affiliations: buddy.affiliations,
                  description: buddy.description,
                  likeable: true,
                  editable: false
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

export default connect()(BrowseBuddies);
