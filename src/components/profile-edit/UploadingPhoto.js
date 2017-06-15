import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, Image, View } from 'react-native';
import { MARGIN } from '../common/styles';

const { width } = Dimensions.get('window');

class UploadingPhoto extends Component {
  render() {
    return (
      <View
        style={this.props.primary
          ? { marginLeft: MARGIN, marginTop: MARGIN, height: 300, width: width - (MARGIN * 2) }
          : { marginRight: 5, marginTop: 5 }}
      >
        <Image
          style={this.props.primary ? styles.mainImageStyle : styles.smallImage}
          source={{ uri: this.props.url }}
        >
          <ActivityIndicator size='large' />
        </Image>
      </View>
    );
  }
}

const styles = {
  smallImage: {
    height: 115,
    width: 115,
    justifyContent: 'center',
  },
  mainImageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    height: 300,
    width: null,
    padding: 1,
  },
};


export default UploadingPhoto;
