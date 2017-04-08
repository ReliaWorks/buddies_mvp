import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import ActivitySet from '../../components/buddycard/ActivitySet';
import AffiliationsEdit from '../../components/profile-editing/AffiliationsEdit';
//import { textStyle } from '../../components/common/styles';

const MARGIN = 15;

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.description,
      height: 300,
    };
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
      <AffiliationsEdit affiliations={affiliations} />
    );
  }

  renderDescription() {
    return (
      <View style={{ flex: 1, padding: 10, }}>
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>About Me</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <TextInput
            multiline
            style={styles.descriptionInput}
            onChangeText={text => {
              this.setState({text});
              this.props.descriptionSaved(text);
            }}
            onContentSizeChange={(event) => {
              this.setState({height: event.nativeEvent.contentSize.height});
            }}
            value={this.state.text}
          />
        </View>
      </View>
    );
  }
//  <Text style={textStyle}>{description}</Text>

  render() {
    const { activities, affiliations } = this.props;

    return (
      <ScrollView style={styles.scrollViewContainer}>
        {this.renderActivities(activities)}
        {this.renderAffiliations(affiliations)}
        {this.renderDescription()}
      </ScrollView>
    );
  }
}

const styles = {
  scrollViewContainer: {
    backgroundColor: '#F8F8F8'
  },
  sectionHeaderText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MARGIN,
    marginBottom: 10,
  },
  comingSoonText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    color: 'red',
  },
  descriptionContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginRight: 15,
    marginLeft: 15,
  },
  descriptionInput: {
    height: 300,
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    marginLeft: 10,
    color: '#000000',
    fontWeight: '100',
  }
};

export default UserEdit;
