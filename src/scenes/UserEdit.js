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
      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderText}>Activities</Text>
          <Text style={styles.comingSoonText}>Coming Soon!</Text>
        </View>
        <ActivitySet value={{activitiesAndAffiliations: activities}} />
      </View>
    );
  }

  renderAffiliations(affiliations) {
    return(
      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderText}>Affiliations</Text>
          <Text style={styles.comingSoonText}>Coming Soon!</Text>
        </View>
      <AffiliationSet value={{affiliations}} />
      </View>
    );
  }

  renderDescription(description) {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>About Me</Text>
        <Text style={styles.comingSoonText}>Coming Soon!</Text>
        </View>
        <Text style={textStyle}>{description}</Text>
      </View>
    );
  }

  render() {
    const { activities, affiliations, description } = this.props;

    return (
      <ScrollView>
        {this.renderActivities(activities)}
        {this.renderAffiliations(affiliations)}
        {this.renderDescription(description)}
      </ScrollView>
    );
  }
}

const styles = {
  sectionHeaderText: {
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  comingSoonText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    color: 'red',
  },
};

const mapStateToProps = ({ currentUser }) => {
  return currentUser;
};

export default connect(mapStateToProps, { currentUserFetch })(UserEdit);
