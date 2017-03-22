import React, { Component } from 'react';
import { Button, ListView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { activitiesSaved, activitySelected } from '../../actions';
import { SelectableTile } from '../../components/common';
import sampleActivityData from '../../components/demo-data/activities';

class ActivitySetup extends Component {
  constructor(props) {
    super(props);

    const activitiesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: activitiesDS.cloneWithRows(sampleActivityData),
    };
  }


  render() {
    return(
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, flex: 0.07 }}>
          <Text style={{ padding: 10, fontSize: 20 }}>
          Select Activities:
          </Text>
          <Button
            onPress={() => {
              Actions.affiliationSetup();
            }}
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
        <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <SelectableTile
                tileId={rowData._id}
                tileName={rowData.activityName}
                tileIcon={rowData.activityIcon.medium}
                onSelect={(id, name, icon) => {
                  this.props.activitySelected({id: id, name: name, icon: icon});
                }}
              />}
        />
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

export default connect(null, { activitiesSaved, activitySelected })(ActivitySetup);
