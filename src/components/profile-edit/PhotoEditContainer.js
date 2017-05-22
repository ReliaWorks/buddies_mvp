import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PhotoEdit from './PhotoEdit';
import { photoRemoved, photosSelected, fetchFacebookAlbums, fetchFacebookAlbumPhotos } from '../../actions';

class PhotoEditContainer extends Component {
  onImageSave() {
    Actions.pop();
  }

  onImageRemove(photo) {
    this.props.photoRemoved(photo);
  }

  onImagesSelected(images, from = 'cameraRoll') {
    this.props.photosSelected(images, from);
  }

  onFetchFacebookAlbums() {
     this.props.fetchFacebookAlbums();
  }

  onFetchFacebookAlbumPhotos(albumId) {
     this.props.fetchFacebookAlbumPhotos(albumId);
  }

  render() {
    return (
      <PhotoEdit
        profileImages={this.props.currentUser.profileImages}
        onSave={this.onImageSave}
        onRemove={this.onImageRemove.bind(this)}
        onImagesSelected={this.onImagesSelected.bind(this)}
        uploadingPhotos={this.props.currentUser.profileImagesUploadProgress}
        onFetchFacebookAlbums={this.onFetchFacebookAlbums.bind(this)}
        facebookAlbums={this.props.currentUser.facebookAlbums}
        onFetchFacebookAlbumPhotos={this.onFetchFacebookAlbumPhotos.bind(this)}
        facebookAlbumPhotos={this.props.currentUser.facebookAlbumPhotos}
      />
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { photoRemoved, photosSelected, fetchFacebookAlbums, fetchFacebookAlbumPhotos })(PhotoEditContainer);
