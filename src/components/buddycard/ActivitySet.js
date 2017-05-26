import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Tile } from '../common';

const MARGIN = 15;

//Displays a list of activities visually as tiles (with icons).
class ActivitySet extends Component {
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let actsAndAffs = this.props.value.activitiesAndAffiliations;
    if(!actsAndAffs) actsAndAffs = [];

    dataSource = ds.cloneWithRows(actsAndAffs);

    return (
      <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          renderRow={(rowData) => <Tile tileName={rowData.name} tileIcon={rowData.icon} tileAttribute={rowData.attribute} />}
          enableEmptySections
          initialListSize={25}
      />
    );
  }
}

const styles = {
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    marginLeft: MARGIN,
    marginRight: MARGIN,
  },
};

export default ActivitySet;
