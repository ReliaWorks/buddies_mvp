import React, { Component } from 'react';
import { ListView } from 'react-native';
import EditableTile from './EditableTile';

const MARGIN = 15;

class AffiliationSet extends Component {
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    dataSource = ds.cloneWithRows(this.props.value.affiliations);

    return (
      <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          renderRow={(rowData) =>
            <EditableTile
              tileName={rowData.name}
              tileIcon={rowData.icon}
              tileId={rowData.uid}
              onRemove={this.props.onRemove}
            />
          }
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
    backgroundColor: 'white',
    marginLeft: MARGIN,
    marginRight: MARGIN,
    flex: 1,
  },
};

export default AffiliationSet;
