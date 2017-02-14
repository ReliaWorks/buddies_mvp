import React, { Component } from 'react';
import { View } from 'react-native';
import BuddyCard from './BuddyCard';

const profileImageURL = require('./common/img/peter.png');

class BrowseBuddies extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BuddyCard
          value={{
            firstName: 'Peter',
            age: '35',
            profileImageURL: profileImageURL,
            activities: 'Running, Tennis'
          }}
        />
    </View>
    );
  }
}

export default BrowseBuddies;
