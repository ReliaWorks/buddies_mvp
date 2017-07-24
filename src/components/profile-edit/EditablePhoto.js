import React, { Component } from 'react';
import { Image, TouchableOpacity, TouchableWithoutFeedback, View, PanResponder } from 'react-native';
import CustomIcon from '../../assets/icons';
import styles from './styles';

class EditablePhoto extends Component {
  onRemove() {
    this.props.onRemove(this.props.photo);
  }

  containerRef() {
    return this.refs.container;
  }

  render() {
    return (
      <View
        ref='container'
        style={{ marginRight: 5, marginTop: 5 }}
      >
        <Image
          style={styles.smallImageStyle}
          source={{ uri: this.props.url }}
        >
        <View style={styles.removeIconContainer}>
          <TouchableOpacity onPress={this.onRemove.bind(this)}>
            <CustomIcon
              name='add_circle_icon' size={20}
              style={{backgroundColor: 'transparent', color: 'black', transform: [{ rotate: '45deg'}] }}
            />
          </TouchableOpacity>
        </View>
        </Image>
      </View>
    );
  }
}

export default EditablePhoto;
