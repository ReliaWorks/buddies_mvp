import React, { Component } from 'react';
import { Dimensions, ListView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SelectableTile } from '../../components/common';

const { width } = Dimensions.get('window');
const LOGINFORM_MARGIN = 15;

class ActivitySetup extends Component {
  renderSectionHeader(onNext) {
    return(
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onNext}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: 'Avenir-Book',
              marginRight: LOGINFORM_MARGIN * 2,
              marginTop: 10,
            }}
          >
          {this.props.navLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderActivityRow(rowData) {
    const activities = this.props.currentActivities;
    let exists = false;
    if(activities && activities.length > 0) {
      exists = activities.find((activity) => {
        return activity.uid === rowData.uid;
      });
    }
    return(<SelectableTile
      tileId={rowData.uid}
      tileName={rowData.name}
      tileIcon={rowData.icon}
      onSelect={this.props.onSelected}
      isSelected={exists}
    />);
  }

  renderActivityList(activitiesDS) {
    return (
      <ScrollView style={{flex: 0.95}}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={activitiesDS}
          renderRow={this.renderActivityRow.bind(this)}
          enableEmptySections
        />
      </ScrollView>
    );
  }

  renderNextButton(onNext) {
    return (
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          onPress={onNext}
          color="white"
        >
          <Text style={styles.nextButtonText}>{this.props.navLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { activitiesDS, onNext } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {this.renderSectionHeader(onNext)}
        {this.renderActivityList(activitiesDS)}
        {this.renderNextButton(onNext)}
      </View>
    );
  }
}

const styles = {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0.1,
    borderTopWidth: 7,
  },
  iconStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 25,
    width: 25
  },
  list: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    paddingBottom: 100,
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
  nextButtonContainer: {
    flex: 0.1,
    width: width,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#42D3D3',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
};

export default ActivitySetup;
