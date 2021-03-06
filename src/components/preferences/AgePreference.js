import React from 'react';
import { View, Slider, Text } from 'react-native';
import styles from './styles';

const renderHeader = () => {
  return(
    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
      <Text style={styles.headerText}>Age</Text>
      <Text style={styles.comingSoonText}>Coming Soon!</Text>
    </View>
  );
};

const renderChoices = () => {
  return (
    <View style={styles.sliderContainer}>
      <Slider style={styles.slider} />
    </View>
  );
};

const AgePreference = () => {
  return (
    <View style={{...styles.preferenceContainer, flex: 0.7}}>
      {renderHeader()}
      {renderChoices()}
    </View>
  );
};

export { AgePreference };
