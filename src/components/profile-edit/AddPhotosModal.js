import React, {Component} from 'react';
import { Image, Text, Modal, ListView, View, TouchableOpacity, StyleSheet } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, GlowLoader } from '../common';

export default class AddPhotosModal extends Component {
  cameraRollPicker:Object;

  constructor(props) {
    super(props);
    this.state = {
      imagesComponent: 'none',
      images: [],
      albumId: null,
      loading: false,
    };
  }

  // set to initial state when modal closed to be able to reopen it with default values
  componentWillReceiveProps(nextProps) {
    if (!nextProps.visible) {
      this.setState({
        imagesComponent: 'none',
        images: [],
      });
    }
  }

  render() {
    let imagesComponent = null;
    let actionComponent = null;

    switch (this.state.imagesComponent) {
      case 'camera':
        imagesComponent = this.renderCameraRoll();
        actionComponent = this.renderCameraRollAction();
        break;
      case 'facebook-albums':
        imagesComponent = this.renderFacebookAlbums();
        actionComponent = this.renderFacebookAlbumsAction();
        break;
      case 'facebook-album-photos':
        imagesComponent = this.renderFacebookAlbumPhotos();
        actionComponent = this.renderFacebookAlbumPhotosAction();
        break;
      case 'facebook-pic':
        imagesComponent = this.renderFacebookPic();
        actionComponent = null;
        break;
      default:
        imagesComponent = null;
        actionComponent = this.renderDefaultAction();
        break;
    }

    return (
      <Modal
        style={styles.container}
        visible={this.props.visible}
        animationType={"slide"}
        transparent={false}
      >

        <View style={styles.imagesComponent}>
          {imagesComponent}
        </View>

        {actionComponent}

        <Button onPress={() => this.props.close()}>
          <Text>Cancel</Text>
        </Button>

      </Modal>
    );
  }

  animationRef(animation) {
    this.animation = animation;
    if(this.animation)
      this.animation.play();
  }


  renderCameraRoll() {
    return (
      <View style={styles.cameraRollContainer}>
        <Text style={styles.selectedImagesInfo}>{this.state.images.length} images selected</Text>
        <CameraRollPicker
          ref={(component) => { this.cameraRollPicker = component; }}
          initialListSize={1}
          selected={this.state.images}
          batchSize={5}
          imageMargin={5}
          maximum={7}
          callback={(images, current) => this.setState({images: images, loading: false})}
        />
      </View>
    );
  }

  renderCameraRollAction() {
    return (
      <View>
        <Button
          onPress={() => {
            this.props.getSelectedImages(this.state.images);
            this.props.close();
          }}
        >
          <Text>Add selected image(s)</Text>
        </Button>

        <Button
          onPress={() => {
            this.setState({ imagesComponent: 'none', images: [] });
          }}
        >
          <Text>Back</Text>
        </Button>
      </View>
    );
  }

  renderFacebookAlbums() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    const albums = this.props.facebookAlbums.filter((album) => album.count > 0);

    return (
      <ListView
        contentContainerStyle={styles.albumList}
        enableEmptySections
        dataSource={ds.cloneWithRows(albums)}
        renderRow={(rowData) => this.renderAlbumAsListItem(rowData)}
      />
    )
  }
  renderAlbumAsListItem(rowData) {
    const { id, name, cover_photo, count } = rowData;
    const source = cover_photo && cover_photo.images[0].source;

    return (
      <TouchableOpacity
        style={styles.albumItem}
        onPress={() => {
          this.props.onFetchFacebookAlbumPhotos(id)
          this.setState({ imagesComponent: 'facebook-album-photos', albumId: id })
        }}>
        <Image style={styles.albumItemImage} source={{ uri: source }} />
        <View style={styles.albumItemRightContainer}>
          <Text style={styles.albumItemName}>{name}</Text>
          <Text style={styles.albumItemImageCount}>{count} images</Text>
        </View>
      </TouchableOpacity>
    )
  }
  renderFacebookAlbumsAction() {
    return (
      <View>
        <Button
          onPress={() => {
            this.setState({ imagesComponent: 'none' });
          }}
        >
          <Text>Back</Text>
        </Button>
      </View>
    );
  }

  renderFacebookAlbumPhotos() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView
        contentContainerStyle={styles.photosList}
        enableEmptySections={true}
        dataSource={ds.cloneWithRows(this.props.facebookAlbumPhotos)}
        renderRow={(rowData) => this.renderFacebookPicAsListItem(rowData)}
      />
    )
  }

  renderFacebookPicAsListItem(source){
    return (
      <TouchableOpacity
        style={styles.photosItem}
        onPress={() => {
          this.setState({ imagesComponent: 'facebook-pic', picSource: source })
        }}>
        <Image style={styles.picItemImage} source={{ uri: source }} />
      </TouchableOpacity>
    )
  }

  renderFacebookAlbumPhotosAction() {
    return (
      <View>
        <Button onPress={() => {
          this.setState({ imagesComponent: 'facebook-albums' })
          this.props.onFetchFacebookAlbums()
        }}>
          <Text>Back</Text>
        </Button>
      </View>
    );
  }

  renderFacebookPic() {
    ImagePicker.openCropper({
      path: this.state.picSource,
      width: 650,
      height: 650
    }).then(croppedUri => {
      this.props.getSelectedImages([croppedUri], 'facebook');
      this.props.close();
    }).catch(error => {
      console.log('imagepicker catch:', error);
      this.setState({imagesComponent: 'facebook-album-photos'});
    });
  }

  renderDefaultAction() {
    return (
      <View>
        <Button onPress={() => this.setState({imagesComponent: 'camera', loading: true})}>
          <Text>Camera Roll</Text>
        </Button>

        <Button
          onPress={() => {
            this.setState({ imagesComponent: 'facebook-albums' });
            this.props.onFetchFacebookAlbums();
          }}
        >
          <Text>Facebook</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  imagesComponent: {
    flex: 1,
    marginTop: 18,
  },
  cameraRollContainer: {
    flex: 1
  },
  selectedImagesInfo: {
    fontFamily: 'SourceSansPro-Bold',
    textAlign: 'center',
    backgroundColor: 'antiquewhite',
    padding: 5,
    margin: 5,
  },
  albumList: {
    alignItems: 'stretch',
    margin: 10,
  },
  albumItem: {
    flexDirection: 'row',
    margin: 5,
  },
  albumItemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  albumItemName: {
    fontSize: 16,
    marginTop: 14,
  },
  albumItemImageCount: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5
  },
  photosList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    //alignSelf: 'center'
  },
  photosItem: {
    width: 100,
    margin: 0,
  },
  picItemImage: {
    width: 90,
    height: 90
  }
});
