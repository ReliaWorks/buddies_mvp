import React, { Component } from 'react';
import { ListView, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditableActivityListItem from './EditableActivityListItem';

const ICON_SIZE = 50;
const MARGIN = 15;

class ActivitySet extends Component {

  renderAddActivityIcon() {
    return (
      <TouchableOpacity style={styles.addActivityIcon} onPress={this.props.onAdd}>
        <Icon
          name="add-circle"
          size={ICON_SIZE - 12}
          color="black"
          style={{justifyContent: 'center'}}
        />
        <Text style={styles.addActivityIconTitle}>Add Activity</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.name !== r2.name
    });

    let activities = this.props.value.activities;
    if(!activities) activities = [];
    dataSource = ds.cloneWithRows(activities);

    return (
      <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          renderRow={(rowData) =>
            <EditableActivityListItem
              tileName={rowData.name}
              tileIcon={rowData.icon}
              tileId={rowData.uid}
              attributeValue={rowData.value}
              onRemove={this.props.onRemove}
              onEdit={this.props.onEdit}
            />
          }
          renderFooter={() => this.renderAddActivityIcon()}
          enableEmptySections
          initialListSize={25}
      />
    );
  }
}

const styles = {
  list: {
    margin: 15,
  },
  addActivityIcon: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addActivityIconTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  }
};

export default ActivitySet;
