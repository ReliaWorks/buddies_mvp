import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import { MARGIN } from '../common/styles';
import EditablePhoto from './EditablePhoto';
import CustomIcon from '../../assets/icons';
import { AddIcon } from '../../icons/AddIcon';
import AddPhotosModal from './addPhoto/AddPhotosModal';
import UploadingPhoto from './UploadingPhoto';
import ImagePanResponder from './ImagePanResponder';
import { Confirm } from '../common';
import styles from './styles';

const { width } = Dimensions.get('window');
const MAX_NUM_PHOTOS = 25;

class PhotoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      showDeleteConfirmModal: false,
      removedPhoto: null,
      scrollEnabled: true
    };
  }
  closeModal() {
    this.setState({modalVisible: false});
  }
  getSelectedImages(images, from) {
    // if (this.props.profileImages.length === 0) {
    //   this.props.onImagesSelected(images, true, from);
    // } else {
    //   this.props.onImagesSelected(images, false, from);
    // }
    this.props.onImagesSelected(images);
  }
  setScrollEnabled(enabled) {
    this.setState({scrollEnabled: enabled});
    this.props.setScrollEnabled(enabled);
  }

  renderPics() {
    const { profileImages, onRemove, uploadingPhotos } = this.props;
    if(!profileImages) return null;

    const firstProfileImage = profileImages[0];
    let otherImages = [];
    if(profileImages.length > 1) {
      otherImages = profileImages.slice(1, MAX_NUM_PHOTOS - 2);
    }

    const addIcon = this.props.profileImages.length < 7
      ? (
        <AddIcon
          onPress={() => this.setState({modalVisible: true})}
          styles={{addActivityIcon: localStyles.camera}}
        />
      )
      : null;
    return (
      <View style={{flex: 0.75}}>
      <ScrollView scrollEnabled={this.state.scrollEnabled}>
        <ImagePanResponder
          setScrollEnabled={this.setScrollEnabled.bind(this)}
          getImageContainerRefs={this.getImageContainerRefs.bind(this)}
          profileImages={this.props.profileImages}
        >
        <View style={{width: width}}>
          {this.renderPrimaryPic(firstProfileImage, onRemove)}

          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignSelf: 'center'}}>
            {otherImages.map((img) => {
              return (
                <EditablePhoto
                  ref={img.key}
                  url={img.url}
                  photo={img}
                  key={img.key}
                  onRemove={(photo) => this.removePic(photo)}
                  onImagePanStarted={this.props.onImagePanStarted}
                />
              );
            })}
            {uploadingPhotos.map((img) => {
              const key = img + new Date().getTime();
              return (
                <UploadingPhoto
                  url={img}
                  key={key}
                />
              );
            })}

            {addIcon}

            <AddPhotosModal
              visible={this.state.modalVisible}
              close={this.closeModal.bind(this)}
              getSelectedImages={this.getSelectedImages.bind(this)}
            />
          </View>
        </View>
        </ImagePanResponder>
      </ScrollView>
      </View>
    );
  }

  getImageContainerRefs() {
    return _.map(this.props.profileImages, i => {
      return {
        ref: this.refs[i.key].measure ? this.refs[i.key] : this.refs[i.key].containerRef(),
        key: i.key
      };
    });
  }

  cancelDelete() {
    this.setState({showDeleteConfirmModal: false});
  }

  confirmDelete() {
    this.setState({showDeleteConfirmModal: false});
    this.props.onRemove(this.state.removedPhoto, this.state.isPrimary);
  }

  removePic(photo, isPrimary = false) {
    this.setState({showDeleteConfirmModal: true, removedPhoto: photo, isPrimary: isPrimary});
  }

  renderPrimaryPic(firstProfileImage, onRemove) {
    return(
      <View
        ref={firstProfileImage.key}
        style={{ marginLeft: MARGIN, marginTop: MARGIN, height: 300, width: width - (MARGIN * 2) }}
      >
        <Image
          style={localStyles.mainImageStyle}
          source={{ uri: firstProfileImage.url }}
        >
          <TouchableOpacity onPress={() => this.removePic(firstProfileImage, true)}>
            <View style={styles.removeIconContainer}>
              <CustomIcon
                name='add_circle_icon' size={20}
                style={{backgroundColor: 'transparent', color: 'black', transform: [{ rotate: '45deg'}] }}
              />
            </View>
          </TouchableOpacity>
        </Image>
        <Confirm
          visible={this.state.showDeleteConfirmModal}
          onAccept={this.cancelDelete.bind(this)}
          onDecline={this.confirmDelete.bind(this)}
        >
          Are you sure you want to delete this picture?
        </Confirm>
      </View>
    );
  }

  renderAddImageButtons() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'SourceSansPro-Bold',
            fontSize: 18,
            marginBottom: 15,
          }}
        >
          Add photos:
        </Text>
        <TouchableOpacity
          style={localStyles.camera}
          onPress={() => this.setState({modalVisible: true})}
        >
         <CustomIcon
           name="camera_icon"
           size={44}
         />
       </TouchableOpacity>
       <AddPhotosModal
         visible={this.state.modalVisible}
         close={this.closeModal.bind(this)}
         getSelectedImages={this.getSelectedImages.bind(this)}
       />
      </View>
    );
  }
  render() {
    if(this.props.profileImages.length === 0) {
      if (this.props.uploadingPhotos && this.props.uploadingPhotos.length > 0) {
        const img = this.props.uploadingPhotos[0];
        const key = img + new Date().getTime();

        return (
          <UploadingPhoto
            url={img}
            key={key}
            primary
          />
        );
      }
      return(this.renderAddImageButtons());
    } else
      return (
        <View style={{flex: 1}}>
          {this.renderPics()}
        </View>
      );
  }
}

const WIDTH = Dimensions.get('window').width;
const ITEMS_PER_ROW = Math.floor(WIDTH / 115);
const TOTAL_MARGIN = (15 * 2) + (ITEMS_PER_ROW * 1);
const IMAGE_WIDTH = (WIDTH - TOTAL_MARGIN) / (ITEMS_PER_ROW);

const localStyles = {
  iconStyle: {
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderColor: 'black',
    padding: 2,
  },
  mainImageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    height: 300,
    width: null,
    padding: 1,
  },
  camera: {
    height: IMAGE_WIDTH,
    width: IMAGE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    marginRight: 5,
    marginTop: 5,
    backgroundColor: '#F8F8F8',
//    backgroundColor: 'transparent'
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
