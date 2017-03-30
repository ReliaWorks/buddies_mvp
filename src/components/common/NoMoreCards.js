import React from 'react';
import { Text, View } from 'react-native';

const NoMoreCards = () => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.text}>
        You've matched with everyone
      </Text>
      <Text style={styles.text}>
        Check back later
      </Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 22
  },
};

export { NoMoreCards };
