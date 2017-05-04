import React, { Component } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

class UploadingPhoto extends Component {
  render() {
    return (
      <View style={{ marginRight: 5, marginTop: 5 }}>
        <Image
          style={styles.smallImageStyle}
          source={{ uri: this.props.url }}
        >
          <ActivityIndicator size='large' />
        </Image>
      </View>
    );
  }
}

const styles = {
  smallImageStyle: {
    height: 115,
    width: 115,
    justifyContent: 'center',
    borderRadius: 10,
  },
};


export default UploadingPhoto;
