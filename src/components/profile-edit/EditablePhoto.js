import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { TRASH_ICON } from '../../scenes/profile-setup/strings';

class EditablePhoto extends Component {
  onRemove() {
    this.props.onRemove(this.props.id);
  }
  render() {
    return (
      <View style={{ marginRight: 5, marginTop: 5 }}>
        <Image
          style={styles.smallImageStyle}
          source={{ uri: this.props.url }}
        >
        <View style={styles.removeIconContainer}>
          <TouchableOpacity onPress={this.onRemove.bind(this)}>
            <Image
              style={styles.iconStyle}
              source={TRASH_ICON}
            />
          </TouchableOpacity>
        </View>
        </Image>
      </View>
    );
  }
}

const styles = {
  removeIconContainer: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginRight: 2,
    marginBottom: 2,
    borderRadius: 2,
  },
  iconStyle: {
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: 'black',
    padding: 2,
  },
  smallImageStyle: {
    height: 115,
    width: 115,
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
};


export default EditablePhoto;
