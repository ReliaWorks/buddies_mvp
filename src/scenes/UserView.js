import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { textStyle } from '../components/common/styles/Styles';
import { currentUserFetch } from '../actions';
import BuddyCard from '../components/buddycard/BuddyCard';
//import currentUser from '../components/demo-data/CurrentUser.js';

class UserView extends Component {
  componentWillMount() {
    this.props.currentUserFetch();
  }

  render() {
    const { firstName, age, location, profileImages, activities, affiliations, description } = this.props;

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

const mapStateToProps = (state) => {
  const { currentUser } = state;
  return currentUser;
};

export default connect(mapStateToProps, { currentUserFetch })(UserView);
