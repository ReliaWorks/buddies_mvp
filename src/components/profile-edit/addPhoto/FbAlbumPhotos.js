import React, { Component } from 'react';
import { ListView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import { photosSelected, fetchFacebookAlbumPhotos } from '../../../actions';

class FbAlbums extends Component {

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

    //name: albumName will be used in future
    const {id: albumId, photos} = this.props.currentUser.facebookAlbumPhotos;

    return (
      <ListView
        initialListSize={25}
        contentContainerStyle={styles.photosList}
        enableEmptySections
        dataSource={ds.cloneWithRows(photos)}
        renderRow={(rowData) => this.renderFacebookPicAsListItem(rowData)}
        onEndReachedThreshold={20}
        onEndReached={() => {
          if (photos.length > 24) {
            this.props.fetchFacebookAlbumPhotos(albumId, photos.length);
          }
        }}
      />
    );
  }
<<<<<<< HEAD
=======

>>>>>>> ReliaWorks/qa
  renderFacebookPicAsListItem(rowData) {
    return (
      <TouchableOpacity
        style={styles.photosItem}
        onPress={() => {
          this.renderImageCropper(rowData.source);
        }}
      >
        <Image style={styles.picItemImage} source={{ uri: rowData.source }} />
      </TouchableOpacity>
    );
  }

  renderImageCropper(source) {
    ImagePicker.openCropper({
      path: source,
      width: 650,
      height: 650
    }).then(croppedUri => {
      Actions.pop({popNum: 2});
      this.props.photosSelected([croppedUri], 'facebook');
    }).catch(error => {
      console.log('imagepicker catch:', error);
      this.setState({imagesComponent: 'facebook-album-photos'});
    });
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};
export default connect(mapStateToProps, { photosSelected, fetchFacebookAlbumPhotos })(FbAlbums);

const styles = StyleSheet.create({
  photosList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  photosItem: {
    width: 91,
    marginTop: 3,
  },
  picItemImage: {
    width: 88,
    height: 88
  }
});
