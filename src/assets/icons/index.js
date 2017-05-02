import React, {Component} from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig1 from './fontello-5-of-app-icons/config.json';
//import fontelloConfig2 from './fontello-4/config.json';

export default class CustomIcon extends Component {

  render() {
    const {name} = this.props
    let config;

    if ( ['profile_icon', 'message_icon', 'home_icon', 'camera_icon', 'edit_icon'].indexOf(name) > -1) {
      console.log('iffff');
      const FontelloIcon = createIconSetFromFontello(fontelloConfig1);
      return <FontelloIcon {...this.props} />
    } else {
      throw new Error('there is no Custom Icon with name:' + name);
      return null
    }

  }
}
