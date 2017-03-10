import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { textStyle } from './common/styles/Styles';
import BuddyCard from './buddycard/BuddyCard';
import currentUser from './demo-data/CurrentUser.js';

class UserView extends Component {
  render() {
    const { firstName, age, location, profileImages, activities, affiliations, description } = currentUser[0];

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, padding: 5, elevation: 1}}>
          <BuddyCard
            value={{
              firstName,
              age,
              profileImages,
              activities,
              affiliations,
              location,
              description,
            }}
          />
        </View>
        <View style={styles.editContainerStyle}>
          <Text style={textStyle} onPress={() => Actions.userEdit()}>
            Edit Profile
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  editContainerStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
  }
};

export default UserView;
