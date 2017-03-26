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
    dataSource = ds.cloneWithRows(this.props.value.activitiesAndAffiliations);

    return (
      <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          renderRow={(rowData) => <Tile tileName={rowData.name} tileIcon={rowData.icon} />}
          enableEmptySections
      />
    );
  }
}

const styles = {
  list: {
    justifyContent: 'flex-start',
//    alignItems: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
//    backgroundColor: 'red',
    marginLeft: MARGIN,
    marginRight: MARGIN,
  },
};

export default ActivitySet;
