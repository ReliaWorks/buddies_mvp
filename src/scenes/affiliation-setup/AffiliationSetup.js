import React, { Component } from 'react';
import { Dimensions, ListView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SelectableTile } from '../../components/common';
import { NEXT_BUTTON_CONTAINER_HEIGHT, PROGRESS_BAR_HEIGHT } from '../../constants';

const { width } = Dimensions.get('window');
const LOGINFORM_MARGIN = 15;

class AffiliationSetup extends Component {
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

  renderAffiliationRow(rowData) {
    const affs = this.props.currentAffiliations;
    let exists = false;
    if(affs && affs.length > 0) {
      exists = affs.find((aff) => {
        return aff.uid === rowData.uid;
      });
    }
    return(<SelectableTile
      tileId={rowData.uid}
      tileName={rowData.name}
      tileIcon={rowData.icon}
      onSelect={this.props.onSelected}
      isSelected={exists}
      source="affiliations"
    />);
  }

  renderAffiliationList(affiliationsDS) {
    return (
      <ScrollView style={{flex: 1, marginTop: 5, marginLeft: 11}}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={affiliationsDS}
          renderRow={this.renderAffiliationRow.bind(this)}
          enableEmptySections
          initialListSize={25}
        />
      </ScrollView>
    );
  }

  renderProgressBar() {
    if(this.props.navLabel == 'Done') {
      return null;
    }else{
      return(
        <View style={{height: PROGRESS_BAR_HEIGHT, flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#42D3D3'}}>
          <View style={{flex: 1, height: PROGRESS_BAR_HEIGHT, backgroundColor: '#FF4F7D', marginRight: 2}} />
          <View style={{flex: 1, height: PROGRESS_BAR_HEIGHT, backgroundColor: '#4A90E2', marginRight: 2}} />
          <View style={{flex: 1, height: PROGRESS_BAR_HEIGHT, backgroundColor: '#888888'}} />
        </View>
      );
    }
  }

  renderNextButton(onNext) {
    return (
      <TouchableOpacity
        onPress={onNext}
        color="white"
      >
        <View style={styles.nextButtonContainer}>
            <Text style={styles.nextButtonText}>{this.props.navLabel}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSearchBar(onChangeText){
	  return (
		  <View style={styles.searchBarContainer}>
			<TextInput
				style={styles.searchBar}
				placeholder="Search for an affiliation"
        onChangeText={onChangeText}
      />
		  </View>
	  )
  }

  render() {
    const { affiliationsDS, onNext, onSearchBarChangeText } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.renderSearchBar(onSearchBarChangeText)}
        {this.renderAffiliationList(affiliationsDS)}
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
  searchBarContainer: {
    backgroundColor: '#fbfbfb',
    margin: 15,
  },
  searchBar: {
    height: 35,
    padding: 10,
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
    height: NEXT_BUTTON_CONTAINER_HEIGHT,
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

export default AffiliationSetup;
