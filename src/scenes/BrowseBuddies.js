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
        let arr = [];

        keys.forEach((key) => {
          arr.push(response.data[key]);
        });

        this.setState({ matches: arr });
        console.log('arr',this.state);
      });
  }

  renderProfile() {
    let i=0;
    return this.state.matches.map((buddy,key) =>
        <Text key={i++}>{buddy.first_name || "Unkown"}</Text>
    );
  }

  render() {

    console.log('On render');

    if(this.state.matches.length === 0) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Spinner size="large" />
        </View>
      );
    } else {
        console.log("got results", this.state.matches);

        return (
        <Swiper>
          <View>
          {this.renderProfile()}
          </View>
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

export default connect(null)(BrowseBuddies);
