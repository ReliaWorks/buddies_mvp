import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { textStyle } from '../../components/common/styles';
import { Button } from '../../components/common';
import ActivitySet from '../../components/buddycard/ActivitySet';

const BUTTON_TEXT = "Let's go!";
class ProfileSetupComplete extends Component {
  startBrowsing() {
    Actions.main();
  }

  render() {
    const { firstName, activities, startBrowsing } = this.props.currentUser;

    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Nice looking profile, {firstName}.</Text>
          <Text style={styles.titleText}>Find a partner for:</Text>
          <View style={{height: 15}} />
          <ActivitySet value={{activitiesAndAffiliations: activities}} />
          <View style={{margin: 15}}>
            <Button onPress={this.startBrowsing}>{BUTTON_TEXT}</Button>
          </View>
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
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
};

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps)(ProfileSetupComplete);
