import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActivityList from './ActivityList';
import Affiliation from './Affiliation';

const defaultProfileImageURL = require('./common/img/sarahpallittacrop.jpg');

class UserEdit extends Component {
  renderProfileImages() {
    return (
      <ScrollView
        style={{ flexDirection: 'row', flex: 3, alignSelf: 'stretch' }}
        horizontal
      >
        <TouchableOpacity onPress={() => { Actions.root(); }}>
          <View style={{ padding: 10 }}>
            <Image
              style={styles.imageStyle}
              source={defaultProfileImageURL}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Actions.root(); }}>
          <View style={{ padding: 10 }}>
            <Image
              style={styles.imageStyle}
              source={defaultProfileImageURL}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { Actions.root(); }}>
          <View style={{ padding: 10 }}>
            <Image
              style={styles.imageStyle}
              source={defaultProfileImageURL}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.renderProfileImages()}
        <View style={{ flex: 2, padding: 10 }}>
          <Text style={styles.textStyle}>Activities</Text>
          <ActivityList />
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={styles.textStyle}>Affiliations</Text>
          <Affiliation />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    alignSelf: 'center'
  },
  imageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 175,
    width: 175
  },
};

export default UserEdit;
