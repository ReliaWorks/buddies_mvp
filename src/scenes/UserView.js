import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';

class UserView extends Component {
  render() {
    const { firstName, age, location, profileImages, activities, affiliations, description } = this.props;
    return (
      <View style={{flex: 1}}>
        <BuddyCard
          value={{
            firstName,
            age,
            profileImages,
            activities,
            affiliations,
            location,
            description,
            editable: true,
            likeable: false,
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return currentUser;
};

export default connect(mapStateToProps)(UserView);
