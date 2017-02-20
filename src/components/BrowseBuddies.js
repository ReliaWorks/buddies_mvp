import React, { Component } from 'react';
import { View } from 'react-native';
import BuddyCard from './BuddyCard';

const profileImageURL = "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fpeter.png?alt=media&token=5b0f6836-0cf6-42ce-bd8f-6c99d8b8a19e";

class BrowseBuddies extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BuddyCard
          value={{
            firstName: 'Peter',
            age: '35',
            profileImageURL: profileImageURL,
            activities: 'Running',
            description: 'Looking for a running buddy'
          }}
        />
    </View>
    );
  }
}

export default BrowseBuddies;
