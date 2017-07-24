import React, { Component } from "react";
import { Image, View, Text, StyleSheet, PanResponder, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux';
import _ from 'lodash';
import { imagePanStarted, imagePanStopped, imageReordered } from '../../actions';

const tempUrl = 'https://scontent.xx.fbcdn.net/v/t31.0-8/19095598_181422305724967_6634409867006995883_o.jpg?oh=127415edf2a33cefdfa8ad81923e4211&oe=59C5C648';

class ImagePanResponder extends Component {
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => { },
      onPanResponderMove: this.handleResponderMove.bind(this),
      onPanResponderRelease: this.handleRelease.bind(this)
    });
    this.imageBoxes = [];
  }
  handleResponderMove(evt, gestureState) {
    if (this.props.image) {
      const {pageX: x, pageY: y} = evt.nativeEvent;
      this.floating.setNativeProps({ style: { left: x - 17, top: y - 74 } });
    }
  }
  handleRelease(evt, gestureState) {
    if (this.props.image) {
      const {pageX: x, pageY: y} = evt.nativeEvent;

      this.floating.setNativeProps({ style: { height: 0, width: 0, left: 0, top: 0, borderWidth: 0 } });
      this.props.setScrollEnabled(true);

      const image = this.imageBoxes.filter(item => isInside(x, y, item));
      if (image.length === 1 && image[0].key !== this.props.image.key) {
        this.props.imageReordered(this.props.profileImages, this.props.image.key, image[0].key);
      } else {
        this.props.imagePanStopped();
      }
    }
  }
  handleLongPress(evt) {
    const {pageX: x, pageY: y} = evt.nativeEvent;
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

        this.floating.setNativeProps({
          style: {
            left: x - 17,
            top: y - 74,
            height: 30,
            width: 30,
            opacity: 0.7
          }
        });
      }
    }, 50);
  }
  render() {
    return (
      <View {...this.panResponder.panHandlers}>
        <TouchableWithoutFeedback onLongPress={this.handleLongPress.bind(this)}>
            {this.props.children}
        </TouchableWithoutFeedback>
        <View ref={ref => this.floating = ref} style={styles.panningImage} />
      </View>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  const {image, initialTouchPosition} = currentUser.reorder;
  return { image, initialTouchPosition };
};
export default connect(mapStateToProps, { imagePanStarted, imagePanStopped, imageReordered })(ImagePanResponder);

const isInside = (x, y, item) => item.x1 < x && item.x2 > x && item.y1 < y && item.y2 > y;

const styles = StyleSheet.create({
  panningImage: {
    position: 'absolute',
    height: 0,
    width: 0,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderRadius: 15
  },
});
