import React, { Component } from 'react';
import { Button, ListView, Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { textStyle } from '../common/styles';
import { Header, Tile } from '../common';
import sampleAffiliationData from '../demo-data/affiliations';

const addIcon = require('../common/img/add_icon.png');

class AffiliationSetup extends Component {
  constructor() {
    super();

    const activitiesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: activitiesDS.cloneWithRows(sampleAffiliationData),
    };
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
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
        <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Tile tileName={rowData.affiliationName} tileIcon={rowData.affiliationIcon.medium} />}
        />
        <Text style={{ marginLeft: 50 }}>Add New</Text>
        <TouchableOpacity onPress={() => { Actions.root(); }}>
          <View style={{ alignSelf: 'center', marginBottom: 20 }}>
            <Image
              style={styles.iconStyle}
              source={addIcon}
            />
          </View>
        </TouchableOpacity>
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
  list: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  item: {
    backgroundColor: 'red',
    margin: 3,
    width: 100,
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

export { AffiliationSetup };
