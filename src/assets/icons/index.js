import React, {Component} from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './fontello-app-icons/config.json';

export default class CustomIcon extends Component {

  render() {
    const {name} = this.props
    let config;

    const FontelloIcon = createIconSetFromFontello(fontelloConfig);
    return <FontelloIcon {...this.props} />

    // if ( ['profile_icon', 'message_icon', 'home_icon', 'camera_icon', 'edit_icon'].indexOf(name) > -1) {
    //   const FontelloIcon = createIconSetFromFontello(fontelloConfig1);
    //   return <FontelloIcon {...this.props} />
    // } else if (['add_icon', 'notification', 'delete_icon', 'add_circle_icon'].indexOf(name) > -1){
    //   console.log('else iffff');
    //
    // } else {
    //   throw new Error('there is no Custom Icon with name:' + name);
    //   return null
    // }

  }
}
