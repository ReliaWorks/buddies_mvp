import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivitySet from './ActivitySet';
//import AffiliationSet from './AffiliationSet';
import { ProfileImages } from '../common';
import { buttonStyle } from '../common/styles';
import styles from './styles.js';

//const { height, width } = Dimensions.get('window');

class BuddyCard extends Component {
  showEditableButton(editable) {
    if(!editable) return;
    return (
      <View>
        <TouchableOpacity onPress={() => Actions.userEdit()} style={buttonStyle}>
          <Icon
            name="edit"
            size={20}
            color="black"
            style={{padding: 4, marginTop: 10}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderMatchControls(likeable) {
    if(!likeable) return;
    return (
      <View style={localStyles.footer}>
        <TouchableOpacity style={localStyles.connectButton}>
            <Text style={localStyles.footerText}>Connect</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderActivitiesAffiliations(activities, affiliations) {
    let activitiesAndAffiliations = affiliations;
    if(activities.length > 0) activitiesAndAffiliations = activities.concat(affiliations);
    return (
        <ActivitySet value={{activitiesAndAffiliations}} />
    );
  }

  renderAge(age) {
    if(age) {
      return `, ${age}`;
    }
  }

  renderLocation(location, locationTextStyle) {
    if(_.isEmpty(location)) return;
    return <Text style={locationTextStyle}>{location.city}, {location.distance} away</Text>;
  }

  render() {
    const { firstName, age, editable, likeable, location, profileImages, activities, affiliations, description } = this.props.value;
    const { locationTextStyle, nameTextStyle, descriptionContainerStyle } = styles;

    return (
        <View style={{flex: 1, alignSelf: 'stretch' }}>
          <ProfileImages value={{profileImages, editable}} />
          <View style={descriptionContainerStyle}>
            <ScrollView>
              <View style={{ flexDirection: 'row' }}>
                <Text style={nameTextStyle}>
                  {firstName}
                  {this.renderAge(age)}
                </Text>
                {this.showEditableButton(editable)}
              </View>
              {this.renderLocation(location, locationTextStyle)}
              {this.renderActivitiesAffiliations(activities, affiliations)}
              <View style={{ marginTop: 15, borderTopWidth: 0.5 }}>
                <Text style={localStyles.descriptionText}>{description}</Text>
              </View>
            </ScrollView>
            {this.renderMatchControls(likeable)}
          </View>
        </View>
    );
  }
}

const localStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 100,
    right: 100,
    bottom: 55,
    backgroundColor: 'white',
    borderColor: 'black',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
    backgroundColor: '#1DABB5',
    opacity: 0.75,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18,
  },
  descriptionText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 15,
    fontFamily: 'Avenir-Book',
    backgroundColor: 'white',
  }
});

export default BuddyCard;
