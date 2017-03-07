import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import BuddyCard from './BuddyCard';

const peterProfileImages = [
  { imageURI: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fpeter.png?alt=media&token=5b0f6836-0cf6-42ce-bd8f-6c99d8b8a19e' },
  { imageURI: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2FPeter2.png?alt=media&token=debe4efa-7318-46fb-a47f-18ab9e34e9b1' },
  { imageURI: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2FPeter3.JPG?alt=media&token=7844831f-a89b-439b-9e66-0774432d527f' }
];

const oscarProfileImages = [
  { imageURI: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Foscar.jpg?alt=media&token=26ba8d11-7e2e-4620-a0b9-ea0dba5080ef'}
];

const kayleighProfileImages = [
  { imageURI: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fkayleigh.jpg?alt=media&token=2c0af25f-c4d1-4691-b27a-a6ef0f63e011' },
  { imageURI: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fkayleigh2.jpg?alt=media&token=6518a380-374d-4f29-b40a-0ddcfcad79c7' }
];

class BrowseBuddies extends Component {
  render() {
    return (
      <Swiper>
        <View style={styles.cardStyle}>
          <BuddyCard
            value={{
              firstName: 'Peter',
              age: '35',
              profileImages: peterProfileImages,
              activities: 'Running',
              description: 'Looking for a running buddy',
            }}
          />
        </View>
        <View style={styles.cardStyle}>
          <BuddyCard
            value={{
              firstName: 'Oscar',
              age: '21',
              profileImages: oscarProfileImages,
              activities: 'Biking',
              description: 'Looking for a biking buddy',
            }}
          />
        </View>
        <View style={styles.cardStyle}>
          <BuddyCard
            value={{
              firstName: 'Kayleigh',
              age: '31',
              profileImages: kayleighProfileImages,
              activities: 'Dancing',
              description: 'Looking for a dancing buddy',
            }}
          />
        </View>
      </Swiper>
    );
  }
}

const styles = {
  cardStyle: {
    flex: 1,
//    marginTop: 5,
    padding: 5,
//    borderRadius: 25,
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 2,
    elevation: 1
  },
};

export default BrowseBuddies;
