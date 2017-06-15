import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { textStyle } from '../../components/common/styles';
import { Button } from '../../components/common';
import ActivitySet from '../../components/buddycard/ActivitySet';
import {currentUserFetch} from '../../actions';

const BUTTON_TEXT = "Get Started!";
class ProfileSetupComplete extends Component {
  startBrowsing() {
    this.props.currentUserFetch();
    Actions.main();
  }

  renderPhoto(profileImages) {
    if(!profileImages) return null;
    const url = profileImages[Object.keys(profileImages)[0]];
    return(
      <Image source={{ uri: url }} style={{width: 170, height: 170}} />
    );
  }
  renderActivities(activities) {
    if(!activities || activities.length === 0) return null;
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <Text style={{...styles.titleText, textAlign: 'center'}}>Find a partner for:</Text>
        <View style={{height: 15}} />
        <ActivitySet value={{activitiesAndAffiliations: activities}} />
      </View>
    );
  }

  render() {
    const { firstName, profileImages, activities, startBrowsing } = this.props.currentUser;

    return (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Nice looking profile, {firstName}.</Text>
          <View style={{height: 15}} />
          {this.renderPhoto(profileImages)}
          {this.renderActivities(activities)}
          <View style={{margin: 15}}>
          <Button onPress={this.startBrowsing.bind(this)}>{BUTTON_TEXT}</Button>
          </View>
        </View>
    );
  }
}

const styles = {
  titleText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 24,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 15
  }
};

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, {currentUserFetch})(ProfileSetupComplete);
