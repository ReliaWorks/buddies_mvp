import React, { Component } from 'react';
import { Button, ListView, Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActivityCard from './ActivityCard';
//import ActivityList from './components/ActivityList';
import { containerStyle, textStyle } from './common/styles';
import { Header } from './common';
import sampleActivityData from './demo-data/activities';


//const defaultProfileImageURL = require('./common/img/sarahpallittacrop.jpg');
const addIcon = require('./common/img/add_icon.png');

class ActivitySetup extends Component {
  constructor() {
    super();

    const activitiesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: activitiesDS.cloneWithRows(sampleActivityData),
    };
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Header headerTitle="Profile Setup" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text style={textStyle}>
          Select Activities:
          </Text>
          <Button
            onPress={() => Actions.affiliationSetup()}
            style={textStyle}
            title="Next"
            color="#4267B2"
          />
        </View>
        <View
          style={{
            flex: 4,
            padding: 10,
            alignSelf: 'flex-start'
          }}
        >
          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            horizontal
            renderRow={(data) => <ActivityCard {...data} />}
          />
        </View>
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

export default ActivitySetup;
