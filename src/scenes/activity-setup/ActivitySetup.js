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
              fontFamily: 'Source Sans Pro',
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
      <ScrollView style={{flex: 1, marginTop: 16, marginLeft: 11}}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={activitiesDS}
          renderRow={this.renderActivityRow.bind(this)}
          enableEmptySections
          initialListSize={25}
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
  renderProgressBar() {
    console.log("props",this.props);

    if(this.props.navLabel == 'Done') {
      return null;
    }else{
      return(
        <View style={{height: 4, flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#42D3D3'}}>
          <View style={{flex: 1, height: 4, backgroundColor: '#FF4F7D', marginRight: 2}} />
          <View style={{flex: 1, height: 4, backgroundColor: '#888888', marginRight: 2}} />
          <View style={{flex: 1, height: 4, backgroundColor: '#888888'}} />
        </View>
      );
    }
  }
  render() {
    const { activitiesDS, onNext } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.renderActivityList(activitiesDS)}
        {this.renderProgressBar()}
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    height: 50,
    width: width,
    marginTop: 0,
    justifyContent: 'center',
    backgroundColor: '#42D3D3',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
};

export default ActivitySetup;
