import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const NoConvoMatch = (props) => (
  <TouchableOpacity onPress={() => { Actions.conversation(); }}>
    <View>
      <Image
        style={styles.noConvoThumbnailStyle}
        source={{ uri: props.picture.large }}
      />
    </View>
  </TouchableOpacity>
);

const styles = {
  noConvoThumbnailStyle: {
    height: 75,
    width: 75,
    marginRight: 10
  },
};

export { NoConvoMatch };
