import React, { Component } from 'react';
import { View } from 'react-native';
import BuddyCard from './BuddyCard';

const profileImageURL = "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fpeter.png?alt=media&token=5b0f6836-0cf6-42ce-bd8f-6c99d8b8a19e";

class BrowseBuddies extends Component {
  render() {
    return (
      <View style={styles.cardStyle}>
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

const styles = {
  cardStyle: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  }
};

export default BrowseBuddies;
