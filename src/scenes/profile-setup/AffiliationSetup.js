import React, { Component } from 'react';
import { Button, ListView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { affiliationsSaved, affiliationSelected } from '../../actions';
import { textStyle } from '../../components/common/styles';
import { SelectableTile } from '../../components/common';
import sampleAffiliationData from '../../components/demo-data/affiliations';

class AffiliationSetup extends Component {
  constructor(props) {
    super(props);

    const activitiesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: activitiesDS.cloneWithRows(sampleAffiliationData),
    };
  }

  handleSelect(id, name, icon) {
/*    console.log("In handleSelect");
    const newAffiliation = { id: id };
    const selectedAffs = [...this.state.selectedAffs, newAffiliation];
    console.log(selectedAffs);
    this.setState({ selectedAffs });
    debugger;
*/
    this.props.affiliationSelected({id, name, icon});
  }

  selectedAffiliations() {
    const affiliations = [
      {
        name: 'GGTC',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2Fggtc.png?alt=media&token=7126aaf1-2e91-4be5-bc0a-af442696edb3'
      },
      {
        name: 'NRC',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2FNikeRunClub.jpg?alt=media&token=c4c31ca9-18d1-4a60-a7e0-a2a7d60b5baa'
      },
    ];

    return affiliations;
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text style={{ padding: 10, fontSize: 21 }}>
          Select Affiliations:
          </Text>
          <Button
            onPress={() => {
                Actions.descriptionSetup();
              }
            }
            style={textStyle}
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
                tileName={rowData.affiliationName}
                tileIcon={rowData.affiliationIcon.medium}
                onSelect={(id, name, icon) => this.handleSelect(id, name, icon)}
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
    marginLeft: 25,
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

export default connect(null, { affiliationsSaved, affiliationSelected })(AffiliationSetup);
