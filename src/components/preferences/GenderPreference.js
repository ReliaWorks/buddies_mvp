import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const ICON_SIZE = 25;

const renderHeader = () => {
  return(
    <View style={localStyles.genderHeaderContainer}>
      <Text style={styles.headerText}>Gender</Text>
      <Text style={styles.comingSoonText}>Coming Soon!</Text>
    </View>
  );
};

const renderChoices = () => {
  const { genderText, genderChoiceContainer, genderTable } = localStyles;

  return(
    <View style={genderTable}>
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
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
  },
  genderHeaderContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  genderChoiceContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#ECECEC',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1
  },
  genderTable: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  }
};

export { GenderPreference };
