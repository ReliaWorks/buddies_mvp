import _ from 'lodash';
import React, { Component } from 'react';
import { Dimensions, Image, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivitySet from './ActivitySet';
import { ProfileImages } from '../common';
import { buttonStyle, centeredTextStyle } from '../common/styles';
import styles from './styles.js';

//const { width, height } = Dimensions.get('window');
const BOTTOM_PADDING = 120;
const MARGIN = 15;

class BuddyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionExpanded: false,
    };
  }

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

  renderMatchControls(likeable, uid, onConnect, onPass) {
    if(!likeable) return;
    return (
      <View style={localStyles.footer}>
        <TouchableOpacity
          onPress={onPass}
          style={localStyles.connectButton}
        >
          <Text style={localStyles.footerText}>Pass</Text>
        </TouchableOpacity>

        <View style={{width: 2}} />

        <TouchableOpacity
          onPress={onConnect}
          style={localStyles.connectButton}
        >
            <Text style={localStyles.footerText}>Connect</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderActivitiesAffiliations(activities, affiliations, editable) {
    //if there are none and this is a browseable profile, then return null
    if(!activities && !affiliations) {
      if(editable) {
        return (
          <TouchableOpacity onPress={() => Actions.userEdit()} style={buttonStyle}>
            <View style={{ justifyContent: 'center', padding: 75 }}>
              <Text style={centeredTextStyle}>Update your profile</Text>
            </View>
          </TouchableOpacity>
        );
      } else return null;
    }
    let activitiesAndAffiliations = [];
    // if there are none and this is an editable profile (user viewing their own profile) then
    // return a call to action to edit your profile
    if(activities && affiliations) {
      if(editable && activities.length === 0 && affiliations.length === 0) {
        return (
          <TouchableOpacity onPress={() => Actions.userEdit()} style={buttonStyle}>
            <View style={{ justifyContent: 'center', padding: 75 }}>
              <Text style={centeredTextStyle}>Update your profile</Text>
            </View>
          </TouchableOpacity>
        );
      }
      if(activities.length === 0 && affiliations.length === 0) return null;
      if(!activities && affiliations.length === 0) return null;
      if(activities.length === 0 && !affiliations) return null;

      let affs = affiliations;
      let acts = activities;
      if(typeof affiliations === 'object')
        affs = _.values(affiliations);
      if(typeof activities === 'object')
        acts = _.values(activities);
      activitiesAndAffiliations = [...acts, ...affs];
    }
    // at least some activities or affiliations exist, so render them
    if(activities && !affiliations) {
      activitiesAndAffiliations = activities;
    } else if(!activities && affiliations) {
      activitiesAndAffiliations = affiliations;
    }
    return (
      <View style={{marginTop: MARGIN}}>
        <ActivitySet value={{activitiesAndAffiliations}} />
      </View>
    );
  }

  renderAge(age) {
    if(age) {
      return `, ${age}`;
    }
  }

  renderLocation(location, locationTextStyle) {
    if(_.isEmpty(location)) return;
    return <Text style={locationTextStyle}>{location.city}, {location.state}</Text>;
  }
// {location.distance} away

  expandDescription() {
    LayoutAnimation.easeInEaseOut();
    this.setState({descriptionExpanded: !this.state.descriptionExpanded});
  }
  descContainerStyle() {
    if(this.state.descriptionExpanded) {
      return {
        flex: 1.8,
        backgroundColor: 'white',
      };
    } else {
      return {
        flex: 0.5,
        backgroundColor: 'white',
      };
    }
  }

  render() {
    const { firstName, age, editable, likeable, location, profileImages, activities, affiliations, description, uid } = this.props.value;
    const { locationText, nameText } = styles;
//    <Image source={{ uri: profileImages[0]}} style={{height: 300, width: width - 20, alignSelf: 'stretch'}} />
    return (
        <View style={{flex: 1, alignSelf: 'stretch' }}>
          <ProfileImages value={{profileImages, editable}} />
            <View style={this.descContainerStyle()}>
              <ScrollView>
                <TouchableWithoutFeedback onPress={this.expandDescription.bind(this)}>
                <View>
                 <View style={{flexDirection: 'row'}}>
                    <Text style={nameText}>
                      {firstName}
                      {this.renderAge(age)}
                    </Text>
                    {this.showEditableButton(editable)}
                  </View>
                  {this.renderLocation(location, locationText)}
                  {this.renderActivitiesAffiliations(activities, affiliations, editable)}
                  <View style={localStyles.descriptionStyle}>
                    <Text style={localStyles.descriptionText}>{description}</Text>
                  </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
              {this.renderMatchControls(likeable, uid, this.props.onConnect, this.props.onPass)}
            </View>
        </View>
    );
  }
}

const localStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 50,
    backgroundColor: '#1DABB5',
    opacity: 0.75,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Source Sans Pro',
    alignItems: 'center',
    fontSize: 18,
  },
  descriptionStyle: {
    borderTopWidth: 1,
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginTop: MARGIN,
    marginBottom: BOTTOM_PADDING,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '100',
    marginLeft: 10,
    marginTop: MARGIN,
    fontFamily: 'Source Sans Pro',
    backgroundColor: 'white',
  },
});

export default BuddyCard;
