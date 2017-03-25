import React, { Component } from 'react';
import { Button, ListView, Text, View } from 'react-native';
import { SelectableTile } from '../../components/common';

class ActivitySetup extends Component {
  renderSectionHeader(onNext) {
    return(
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, flex: 0.07 }}>
        <Text style={{ padding: 10, fontSize: 20 }}>
        Select Activities:
        </Text>
        <Button
          onPress={onNext}
          style={{
            flex: 1,
            fontSize: 16,
            color: 'black',
            fontFamily: 'Avenir-Book',
          }}
          title="Next"
          color="#4267B2"
        />
      </View>
    );
  }

  renderActivityList(activitiesDS, onSelected) {
    return (
      <ListView
          contentContainerStyle={styles.list}
          dataSource={activitiesDS}
          renderRow={(rowData) =>
            <SelectableTile
              tileId={rowData.uid}
              tileName={rowData.name}
              tileIcon={rowData.icon}
              onSelect={onSelected}
            />}
          enableEmptySections
      />
    );
  }

  render() {
    const { activitiesDS, onNext, onSelected } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.renderSectionHeader(onNext)}
        {this.renderActivityList(activitiesDS, onSelected)}
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
    flex: 1,
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

export default ActivitySetup;
