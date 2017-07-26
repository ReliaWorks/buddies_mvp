import React, { Component } from "react";
import { Image, View, Text, StyleSheet, PanResponder, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux';
import _ from 'lodash';
import { imagePanStarted, imageMovedOver, imageMovingOutside, imagePanStopped, imageReordered } from '../../actions';
import PanningImage from './PanningImage';

class ImagePanResponder extends Component {
  componentWillMount() {
    this.state = {longPress: false, movedOverImageKey: null};
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => { },
      onPanResponderMove: this.handleResponderMove.bind(this),
      onPanResponderRelease: this.handleRelease.bind(this),
    });
    this.imageBoxes = [];
  }
  handleResponderMove(evt, gestureState) {
    if (this.props.draggingImage) {
      const {pageX: x, pageY: y} = evt.nativeEvent;
      this.floating.setNativeProps({ style: movingImageStyle(x, y) });

      const image = this.imageBoxes.filter(item => isInside(x, y, item));
      if (image.length === 1 && image[0].key !== this.props.draggingImage.key && this.state.movedOverImageKey !== image[0].key) {
        this.setState({movedOverImageKey: image[0].key});
        this.props.imageMovedOver(image[0].key);
        this.floating.setNativeProps({ style: {borderWidth: 4} });
      } else if (!(image.length === 1 && image[0].key !== this.props.draggingImage.key) && this.state.movedOverImageKey) {
          this.setState({movedOverImageKey: null});
          this.props.imageMovingOutside();
          this.floating.setNativeProps({ style: {borderWidth: 1} });
      }
    }
  }
  handleRelease(evt, gestureState) {
    console.log('released');
    if (this.props.draggingImage) {
      const {pageX: x, pageY: y} = evt.nativeEvent;

      this.floating.setNativeProps({ style: releasedImageStyle });
      this.props.setScrollEnabled(true);

      const image = this.imageBoxes.filter(item => isInside(x, y, item));
      if (image.length === 1 && image[0].key !== this.props.draggingImage.key) {
        this.props.imageReordered(this.props.profileImages, this.props.draggingImage.key, image[0].key);
      } else {
        this.props.imagePanStopped();
      }
    }
    this.draggingRef.setNativeProps({style: {opacity: 1}});
  }
  handleLongPress(evt) {
    const {pageX: x, pageY: y, locationX, locationY} = evt.nativeEvent;
    this.imageBoxes = [];
    const refsAndKeys = this.props.getImageContainerRefs();

    _.map(refsAndKeys, refAndImgKey => {
      refAndImgKey.ref.measure((a, b, width, height, px, py) => {
        this.imageBoxes.push({key: refAndImgKey.key, x1: px, y1: py, x2: px + width, y2: py + height});
      });
    });

    setTimeout(() => {
      const image = this.imageBoxes.filter(item => isInside(x, y, item));

      if (image.length === 1) {
        this.props.imagePanStarted(image[0], {x, y});
        this.props.setScrollEnabled(false);

        this.floating.setNativeProps({ style: initialImageStyle(x, y) });

        this.draggingRef = refsAndKeys.filter(item => item.key === image[0].key)[0].ref;
        this.draggingRef.setNativeProps({style: {opacity: 0.4}});
      }
    }, 50);
  }

  handlePress() {
    this.props.imagePanStopped();
    this.draggingRef.setNativeProps({style: {opacity: 1}});
  }

  setRef(ref) {
    this.floating = ref;
  }

   render() {
    const {draggingImage, profileImages} = this.props;
    return (
        <View {...this.panResponder.panHandlers}>
          <TouchableWithoutFeedback onLongPress={this.handleLongPress.bind(this)} onPress={this.handlePress.bind(this)}>
              {this.props.children}
          </TouchableWithoutFeedback>
          <PanningImage setRef={this.setRef.bind(this)} />
        </View>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  const {draggingImage, initialTouchPosition} = currentUser.reorder;
  const {profileImages} = currentUser;
  return { draggingImage, initialTouchPosition, profileImages };
};
export default connect(mapStateToProps, { imagePanStarted, imageMovedOver, imageMovingOutside, imagePanStopped, imageReordered })(ImagePanResponder);

const isInside = (x, y, item) => item.x1 < x && item.x2 > x && item.y1 < y && item.y2 > y;

const initialImageStyle = (x, y) => ({position: 'absolute', left: x - 50, top: y - 110, height: 100, width: 100, borderWidth: 1, borderColor: 'white', borderRadius: 4 });
const movingImageStyle = (x, y) => ({ position: 'absolute', left: x - 50, top: y - 110 });
const releasedImageStyle = {left: 0, top: 0, borderWidth: 0, height: 0, width: 0};
