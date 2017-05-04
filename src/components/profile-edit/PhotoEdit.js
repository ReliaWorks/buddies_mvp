import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MARGIN } from '../common/styles';
import { Button } from '../common';
import EditablePhoto from './EditablePhoto';
import { TRASH_ICON } from '../../scenes/profile-setup/strings';
import CameraRollPicker from 'react-native-camera-roll-picker';
import CustomIcon from '../../assets/icons';
import AddPhotosModal from './AddPhotosModal';
import UploadingPhoto from './UploadingPhoto';

const { width } = Dimensions.get('window');
const MAX_NUM_PHOTOS = 5 + 3;

class PhotoEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }
  closeModal(){
    this.setState({modalVisible: false})
  }
  getSelectedImages(images) {
    this.props.onImagesSelected(images)
  }

  renderPics() {
    const { profileImages, onRemove } = this.props;
    const firstProfileImage = profileImages[0];
    const otherImages = profileImages.slice(1, MAX_NUM_PHOTOS - 1);

    return (
      <View style={{flex: 0.75, marginBottom: 5}}>
      <ScrollView>
        <View style={{width: width}}>
          {this.renderPrimaryPic(firstProfileImage, onRemove)}

          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignSelf: 'center'}}>
            {otherImages.map((img) => {
              return (
                <EditablePhoto
                  url={img.url}
                  photo={img}
                  key={img.key}
                  onRemove={onRemove}
                />
              );
            })}
            {this.props.uploadingPhotos.map((img) => {
              const key = img + new Date().getTime()
              return (
                <UploadingPhoto
                  url={img}
                  key={key}
                />
              );
            })}
            <TouchableOpacity
              style={styles.camera}
              onPress={() => this.setState({modalVisible: true})}>
              <CustomIcon
                name="camera_icon"
                size={44}
                color="#42D3D3"
              />
            </TouchableOpacity>

            <AddPhotosModal
              visible={this.state.modalVisible}
              close={this.closeModal.bind(this)}
              getSelectedImages={this.getSelectedImages.bind(this)}/>
        </View>
      </View>
      </ScrollView>
      </View>
    );
  }

  renderPrimaryPic(firstProfileImage, onRemove) {
    return(
      <View style={{ marginLeft: MARGIN, marginTop: MARGIN, height: 300, width: width - (MARGIN * 2) }}>
        <Image
          style={styles.mainImageStyle}
          source={{ uri: firstProfileImage.url }}
        >
        <View style={styles.removeIconContainer}>
          <TouchableOpacity onPress={() => onRemove(firstProfileImage)}>
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

  renderSaveButton(onNext) {
    return (
      <View style={{flex: 0.1, justifyContent: 'flex-end' }}>
      <Button onPress={onNext}>
        Save
      </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderPics()}
        {this.renderSaveButton(this.props.onSave)}
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
  mainImageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    height: 300,
    width: null,
    padding: 5,
    borderRadius: 10,
  },
  smallImageStyle: {
    height: 115,
    width: 115,
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  camera: {
    height: 115,
    width: 115,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    marginRight: 5,
    marginTop: 5
  },
  cameraIcon: {
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: 'black',
    padding: 2,
  }
};

export default PhotoEdit;
