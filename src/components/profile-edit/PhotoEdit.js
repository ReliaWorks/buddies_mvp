import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { MARGIN } from '../common/styles';
import EditablePhoto from './EditablePhoto';
import CustomIcon from '../../assets/icons';
import AddPhotosModal from './addPhoto/AddPhotosModal';
import UploadingPhoto from './UploadingPhoto';

const { width } = Dimensions.get('window');
const MAX_NUM_PHOTOS = 25;

class PhotoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  closeModal() {
    this.setState({modalVisible: false});
  }
  getSelectedImages(images, from) {
    this.props.onImagesSelected(images, from);
  }

  renderPics() {
    const { profileImages, onRemove } = this.props;
    const firstProfileImage = profileImages[0];
    const otherImages = profileImages.slice(1, MAX_NUM_PHOTOS - 1);

    return (
      <View style={{flex: 0.75}}>
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
              const key = img + new Date().getTime();
              return (
                <UploadingPhoto
                  url={img}
                  key={key}
                />
              );
            })}
            <TouchableOpacity
              style={styles.camera}
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
            <CustomIcon
              name='add_circle_icon'
              size={20}
              style={{ backgroundColor: 'transparent', transform: [{ rotate: '45deg'}] }}
            />
          </TouchableOpacity>
        </View>
        </Image>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderPics()}
      </View>
    );
  }
}

const styles = {
  removeIconContainer: {
    //backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginRight: 2,
    marginBottom: 2,
  },
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
    padding: 5,
  },
  smallImageStyle: {
    height: 115,
    width: 115,
    justifyContent: 'flex-end',
  },
  camera: {
    height: 115,
    width: 115,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    marginRight: 5,
    marginTop: 5,
    backgroundColor: 'transparent'
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
