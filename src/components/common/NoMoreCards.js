import React from 'react';
import { Text, View } from 'react-native';

const NoMoreCards = () => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.text}>
        That's everyone
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
    fontFamily: 'Source Sans Pro',
    fontSize: 22
  },
};

export { NoMoreCards };
