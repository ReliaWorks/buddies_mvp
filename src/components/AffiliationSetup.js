import React, { Component } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { textStyle } from './common/styles';
import { Header } from './common';

const defaultProfileImageURL = require('./common/img/sarahpallittacrop.jpg');
const addIcon = require('./common/img/add_icon.png');

class AffiliationSetup extends Component {
  render() {
    return(
      <View>
        <Header headerTitle="Profile Setup" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text style={textStyle}>
          Select Affiliations:
          </Text>
          <Button
            onPress={() => Actions.descriptionSetup()}
            style={textStyle}
            title="Next"
            color="#4267B2"
          />
        </View>
        <TouchableOpacity onPress={() => { Actions.root(); }}>
          <View style={{ padding: 10 }}>
            <Image
              style={styles.mainImageStyle}
              source={defaultProfileImageURL}
            />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <TouchableOpacity onPress={() => { Actions.root(); }}>
            <View style={{ padding: 10 }}>
              <Image
                style={styles.smallImageStyle}
                source={defaultProfileImageURL}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Actions.root(); }}>
            <View style={{ padding: 10 }}>
              <Image
                style={styles.smallImageStyle}
                source={defaultProfileImageURL}
              />
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => { Actions.root(); }}>
            <View style={{ padding: 10 }}>
              <Image
                style={styles.iconStyle}
                source={addIcon}
              />
            </View>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  iconStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 25,
    width: 25
  },
  mainImageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 300,
    width: null
  },
  smallImageStyle: {
    height: 120,
    width: 120,
  },
};

export default AffiliationSetup;
