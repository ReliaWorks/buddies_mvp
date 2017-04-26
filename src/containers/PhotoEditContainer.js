import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PhotoEdit from '../components/profile-edit/PhotoEdit';
import { photoRemoved } from '../actions';

class PhotoEditContainer extends Component {
  onImageSave() {
    Actions.pop();
  }

  onImageRemove(photo) {
    this.props.photoRemoved(photo);
  }

  render() {
    return (
      <PhotoEdit
        profileImages={this.props.currentUser.profileImages}
        onSave={this.onImageSave}
        onRemove={this.onImageRemove.bind(this)}
      />
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { photoRemoved })(PhotoEditContainer);
