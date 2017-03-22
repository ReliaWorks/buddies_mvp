import React, { Component } from 'react';
import { Button, ListView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { affiliationsSaved } from '../../actions';
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

  selectedAffiliations() {
    const selectedAffiliations = {1: true, 2: true};

    return selectedAffiliations;
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text style={textStyle}>
          Select Affiliations:
          </Text>
          <Button
            onPress={() => {
                this.props.affiliationsSaved(this.selectedAffiliations());
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
            renderRow={(rowData) => <SelectableTile tileName={rowData.affiliationName} tileIcon={rowData.affiliationIcon.medium} />}
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

export default connect(null, { affiliationsSaved })(AffiliationSetup);
