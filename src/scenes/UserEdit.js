import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ActivitySet from '../components/buddycard/ActivitySet';
import AffiliationSet from '../components/buddycard/AffiliationSet';
import { currentUserFetch } from '../actions';
import { textStyle } from '../components/common/styles';


class UserEdit extends Component {
  componentWillMount() {
    this.props.currentUserFetch();
  }

  renderActivities(activities) {
    return(
      <View style={{ flex: 3, padding: 10 }}>
        <Text style={styles.sectionHeader}>Activities</Text>
        <ActivitySet value={{activities}} />
      </View>
    );
  }

  renderAffiliations(affiliations) {
    return(
      <View style={{ flex: 2, padding: 10 }}>
      <Text style={styles.sectionHeader}>Affiliations</Text>
      <AffiliationSet value={{affiliations}} />
      </View>
    );
  }

  renderDescription() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.sectionHeader}>About Me</Text>
        <Text style={textStyle}>Im a stop and smell the roses runner</Text>
      </View>
    );
  }

  render() {
    const { activities, affiliations } = this.props;

    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {this.renderActivities(activities)}
        {this.renderAffiliations(affiliations)}
        {this.renderDescription()}
      </ScrollView>
    );
  }
}

const styles = {
  sectionHeader: {
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
};

const mapStateToProps = ({ currentUser }) => {
  return currentUser;
};

export default connect(mapStateToProps, { currentUserFetch})(UserEdit);
