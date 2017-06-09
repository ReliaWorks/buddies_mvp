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
        <View style={{flex: 0.1}} />
        <View style={{justifyContent: 'center', flex: 0.2}}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Nice looking profile, {firstName}.</Text>
            <Text style={styles.titleText}>Find a partner for:</Text>
            <ActivitySet value={{activitiesAndAffiliations: activities}} />
          </View>
        </View>
        <View style={{flex: 0.1}}>
          <Button onPress={this.startBrowsing}>{BUTTON_TEXT}</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  titleText: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 24,
  },
  titleContainer: {
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps)(ProfileSetupComplete);
