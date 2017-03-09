import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { Tile } from './common';

//Displays a list of activities visually as tiles (with icons).
class ActivitySet extends Component {
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    dataSource = ds.cloneWithRows(this.props.value.activities);

    return(
      <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          renderRow={(rowData) => <Tile tileName={rowData.name} tileIcon={rowData.icon} />}
      />
    );
  }
}

const styles = {
  list: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
//    flex: 1,
    backgroundColor: 'yellow'
  },
};

export default ActivitySet;
