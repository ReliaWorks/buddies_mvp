import React, { Component } from 'react';
import { Image, View } from 'react-native'
// import { createIconSetFromFontello } from 'react-native-vector-icons';
// import fontelloConfig from './fontello-app-icons/config.json';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './icomoon-app-icons/selection.json';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig);

export default class CustomIcon extends Component {

  render() {
    const {name} = this.props

    if (name === 'camera_icon') {
      //convert size to width/height for png's
      let styles = [this.props.style]
      if (this.props.size) {
        styles = [{ width: this.props.size, height: this.props.size }, ...styles];
      }
      return (
        <Image style={styles}
          source={require('./png-app-icons/camera_icon.png')}
          resizeMode='contain'/>
        )
    }

    return <IcoMoonIcon name={name} {...this.props} />



    // const FontelloIcon = createIconSetFromFontello(fontelloConfig);
    // return <FontelloIcon {...this.props} />
  }
}
