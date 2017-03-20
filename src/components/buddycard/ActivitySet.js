import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Tile } from '../common';

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
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
};

export default ActivitySet;
