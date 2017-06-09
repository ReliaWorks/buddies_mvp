import React, { Component } from 'react';
import { ListView, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditableTile from './EditableTile';

const ICON_SIZE = 50;
const MARGIN = 15;

class AffiliationSet extends Component {
  renderAddAffiliationIcon() {
    return (
      <View style={{marginLeft: 2, marginRight: 2 }}>
        <View
          style={{
            height: 95,
            width: 95,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F8F8F8'
          }}
        >
          <TouchableOpacity
            onPress={this.props.onAdd}
            testID={'addAffiliationButton'}
          >
            <Icon
              name="add-circle"
              size={ICON_SIZE}
              color="black"
              style={{justifyContent: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>New</Text>
      </View>
    );
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let affiliations = this.props.value.affiliations;
    if(!affiliations) affiliations = [];

    dataSource = ds.cloneWithRows(affiliations);

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
          renderFooter={() => this.renderAddAffiliationIcon()}
          enableEmptySections
          initialListSize={25}
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
  title: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '100',
    fontFamily: 'Source Sans Pro',
    textAlign: 'center',
    paddingTop: 10,
  }
};

export default AffiliationSet;
