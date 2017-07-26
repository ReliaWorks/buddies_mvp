import React, { Component } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import {DEFAULT_PROFILE_PHOTO} from '../../constants';

const tempUrl = 'https://scontent.xx.fbcdn.net/v/t31.0-8/19095598_181422305724967_6634409867006995883_o.jpg?oh=127415edf2a33cefdfa8ad81923e4211&oe=59C5C648';

class PanningImage extends Component {
  componentDidMount() {
    this.props.setRef(this.refs.image);
  }
  render() {
    const {draggingImage, profileImages} = this.props;
    const url = draggingImage ? profileImages.filter(img => img.key === draggingImage.key)[0].url : DEFAULT_PROFILE_PHOTO;
    const disabledStyle = draggingImage ? {} : {width: 0, height: 0, position: 'absolute', left: 0, bottom: 0};

    return (
      <Image ref='image' source={{uri: url}} style={[styles.PanningImage, disabledStyle]} />
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  const {draggingImage, initialTouchPosition} = currentUser.reorder;
  const {profileImages} = currentUser;
  return { draggingImage, initialTouchPosition, profileImages };
};
export default connect(mapStateToProps, { })(PanningImage);

const styles = StyleSheet.create({
  panningImage: {
    position: 'absolute',
    height: 0,
    width: 0,
    left: 0,
    top: 0,
    borderWidth: 0,
    zIndex: 2
  },
});
