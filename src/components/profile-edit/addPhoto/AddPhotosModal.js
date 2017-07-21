
import React, {Component} from 'react';
import { Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from '../../common';

const { width } = Dimensions.get('window');

export default class AddPhotosModal extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.close()}>
      <Modal
        isVisible={this.props.visible}
        style={styles.container}
        transparent
      >
        <Button
          onPress={() => this.renderImageCropper()}
          styles={PhotoAddButtonStyles}
        >
          <Text>Camera Roll</Text>
        </Button>

        <Button
          onPress={() => {
            this.props.close();
            Actions.addPhotoFbAlbums();
          }}
          styles={PhotoAddButtonStyles}
        >
          <Text>Facebook</Text>
        </Button>

        <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.close()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
      </TouchableWithoutFeedback>
    );
  }

  renderImageCropper() {
    ImagePicker.openPicker({
      width: 650,
      height: 650,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      this.setState({ imagesComponent: 'none', images: [] });
      this.props.getSelectedImages(image, 'CR');
      this.props.close();
    }).catch(error => {
      console.log('image picker error = ', error);
      this.setState({ imagesComponent: 'none', images: [] });
    });
  }
}

const MARGIN = 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: 'transparent',
    marginTop: MARGIN * 1.5,
    marginBottom: MARGIN * 0.5,
  },
  cancelButtonText: {
    color: 'white',
    fontFamily: 'Source Sans Pro',
    fontWeight: '500',
    fontSize: 14,
    backgroundColor: 'transparent',
  }
});

const PhotoAddButtonStyles = {
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: '#42D3D3',
    width: width - (MARGIN * 2.25),
    height: 55,
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginBottom: 5,
  }
};
