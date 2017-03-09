import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Tile } from './common';

class AffiliationSet extends Component {
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    dataSource = ds.cloneWithRows(this.props.value.affiliations);

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
  },
};

export default AffiliationSet;
