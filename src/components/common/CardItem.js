import React from 'react';
import { View } from 'react-native';

const CardItem = (props) => {
    return (
      <View style={[styles.containerStyle, props.style]}>
        {props.children}
      </View>
    );
};

const styles = {
  containerStyle: {
      borderBottomWidth: 1,
      padding: 5,
      flex: 1
  }
};

export { CardItem };
