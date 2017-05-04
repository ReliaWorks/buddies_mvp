import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PhotoEdit from '../components/profile-edit/PhotoEdit';
import { photoRemoved, photosSelected } from '../actions';

class PhotoEditContainer extends Component {
  onImageSave() {
    Actions.pop();
  }

  onImageRemove(photo) {
    this.props.photoRemoved(photo);
  }

  onImagesSelected(images){
    this.props.photosSelected(images)
  }

  render() {
    return (
      <PhotoEdit
        profileImages={this.props.currentUser.profileImages}
        onSave={this.onImageSave}
        onRemove={this.onImageRemove.bind(this)}
        onImagesSelected={this.onImagesSelected.bind(this)}
        uploadingPhotos={this.props.currentUser.profileImagesUploadProgress}
      />
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { photoRemoved, photosSelected })(PhotoEditContainer);
