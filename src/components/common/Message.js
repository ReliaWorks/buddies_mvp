import React from 'react';
import { Text, View } from 'react-native';

const Message = ({ name, text }) => {
  return (
    <View style={styles.messageContainer}>
      <Text>
        {name}: {text}
      </Text>
    </View>
  );
};

const styles = {
  messageContainer: {
    padding: 5
  }
};
export { Message };
