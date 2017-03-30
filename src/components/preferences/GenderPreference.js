import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const ICON_SIZE = 25;

const renderHeader = () => {
  return(
    <View style={{borderBottomWidth: 1, borderColor: 'gray', flexDirection: 'row'}}>
      <Text style={styles.headerText}>Gender</Text>
      <Text style={styles.comingSoonText}>Coming Soon!</Text>
    </View>
  );
};

const renderChoices = () => {
  const { genderText, genderChoiceContainer } = localStyles;

  //      <View style={{backgroundColor: '#dddddd', height: 1}}/>

  return(
    <View style={{justifyContent: 'space-between', flex: 1, alignItems: 'stretch'}}>
      <View style={genderChoiceContainer}>
        <Text style={genderText}>Men</Text>
      </View>
      <View style={genderChoiceContainer}>
        <Text style={genderText}>Women</Text>
      </View>
      <View style={{...genderChoiceContainer, borderBottomWidth: 0}}>
        <Text style={genderText}>Both</Text>
        <Icon
          name="ios-checkmark-circle"
          size={ICON_SIZE}
          color="#4A90E2"
          style={{width: ICON_SIZE, height: ICON_SIZE}}
        />
      </View>
    </View>
  );
};

const GenderPreference = () => {
  return (
    <View style={styles.preferenceContainer}>
      {renderHeader()}
      {renderChoices()}
    </View>
  );
};

const localStyles = {
  genderText: {
    marginLeft: 20,
    fontFamily: 'Avenir-Book',
    fontSize: 14,
  },
  genderChoiceContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#ECECEC',
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1
  }
};

export { GenderPreference };
