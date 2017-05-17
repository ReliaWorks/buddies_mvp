import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from '../../common';

export default class AddPhotosModal extends Component {
  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        style={styles.container}
        transparent
      >

        <Button onPress={() => this.renderImageCropper()}>
          <Text>Camera Roll</Text>
        </Button>

        <Button
          onPress={() => {
            this.props.close();
            Actions.addPhotoFbAlbums();
          }}
        >
          <Text>Facebook</Text>
        </Button>

        <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.close()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

      </Modal>
    );
  }

  renderImageCropper() {
    ImagePicker.openPicker({
      width: 650,
      height: 650,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log('image picker da image seçildi: ', image);
      this.setState({ imagesComponent: 'none', images: [] });
      this.props.getSelectedImages([image], 'facebook');
      this.props.close();
    }).catch(error => {
      console.log('image picker', error);
      this.setState({ imagesComponent: 'none', images: [] });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    color: 'white',
    backgroundColor: 'transparent',
  }
});
