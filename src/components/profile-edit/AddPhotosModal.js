import React, {Component} from 'react'
import { Text, Modal, View, StyleSheet } from 'react-native'
import { Button } from '../common';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class AddPhotosModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesComponent: 'none',
      images: []
    }
  }

  // set to initial state when modal closed to be able to reopen it with default values
  componentWillReceiveProps(nextProps) {
    if (!nextProps.visible) {
      this.setState({
        imagesComponent: 'none',
        images: []
      })
    }
  }

  render(){
    let imagesComponent = null
    let actionComponent = null

    switch (this.state.imagesComponent) {
      case 'camera':
        imagesComponent = this.renderCameraRoll()
        actionComponent = this.renderCameraRollAction()
        break;
      case 'facebook':
        imagesComponent = this.renderFacebook()
        actionComponent = this.renderFacebookAction()
        break;
      default:
        imagesComponent = null
        actionComponent = this.renderDefaultAction()
    }

    return (
      <Modal style={styles.container}
        visible={this.props.visible}
        animationType={"slide"}
        transparent={false}>
        <View style={styles.imagesComponent}>
          {imagesComponent}
        </View>

        {actionComponent}

        <Button onPress={() => this.props.close()}>
          <Text>Cancel</Text>
        </Button>
      </Modal>
    )
  }

  renderCameraRoll(){
    return (
      <View style={styles.cameraRollContainer}>
        <Text style={styles.selectedImagesInfo}>{this.state.images.length} images selected</Text>
        <CameraRollPicker
          selected={this.state.images}
          callback={(images, current) => this.setState({images: images})} />
      </View>
    )
  }

  renderFacebook() {
    return <Text>images from facebook (to be developped)</Text>
  }

  renderCameraRollAction() {
    return (
      <View>
        <Button  onPress={() => {
          this.props.getSelectedImages(this.state.images)
          this.props.close()
        }}>
          <Text>Add selected image(s)</Text>
        </Button>
      </View>
    )
  }

  renderFacebookAction() {
    return (
      <View>
      </View>
    )
  }

  renderDefaultAction() {
    return (
      <View>
        <Button  onPress={() => this.setState({imagesComponent: 'camera'})}>
          <Text>Camera Roll</Text>
        </Button>

        <Button onPress={() => this.setState({imagesComponent: 'facebook'})}>
          <Text>Facebook</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  imagesComponent: {
    flex:1,
    marginTop: 18,
  },
  cameraRollContainer: {
    flex: 1
  },
  selectedImagesInfo: {
    textAlign: 'center',
    backgroundColor: 'antiquewhite',
    padding: 5,
    margin: 5,
  }
})
