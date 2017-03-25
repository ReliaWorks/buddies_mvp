import React, { Component } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
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
          arr[key] = response.data[key];
        });

        console.log('arr',arr);

        this.setState({ matches: arr });
      });
  }

  render() {
    if(this.state.matches.length === 0) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Spinner size="large" />
        </View>
      );
    } else {
        console.log("got results");
        return(
          <Swiper>
          {this.state.matches.map((buddy, key) => {
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
