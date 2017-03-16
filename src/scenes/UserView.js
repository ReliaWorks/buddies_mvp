import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { currentUserFetch } from '../actions';
import BuddyCard from '../components/buddycard/BuddyCard';

class UserView extends Component {
  componentWillMount() {
    this.props.currentUserFetch();
  }

  render() {
    const { firstName, age, location, profileImages, activities, affiliations, description } = this.props;

    return (
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
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return currentUser;
};

export default connect(mapStateToProps, { currentUserFetch })(UserView);
