import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectChat } from '../../actions';

class NoConvoMatch extends Component {

  renderUnseenMark(seen) {
    if (seen)
      return null;
    else
      return (
        <View style={styles.newMessage} />
      );
  }

  render() {
    const itemSeen = this.props.seen === true;

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectChat(this.props.otherUserId, this.props.otherUserName, this.props.otherUserPic, this.props.conversationId);
          Actions.conversation();
        }}
      >
        <View>
          {this.renderUnseenMark(itemSeen)}
          <Image
            style={styles.noConvoThumbnailStyle}
            source={{ uri: this.props.otherUserPic }}
          />
          <Text style={styles.imageNameLabel}>{this.props.otherUserName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = {
  imageNameLabel: {
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    color: 'black',
    textAlign: 'center',
    marginTop: 10
  },
  noConvoThumbnailStyle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginLeft: 7,
    marginRight: 7,
  },
  newMessage: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: '#FF4F7D',
    top: 30,
    left: 0,
    zIndex: 99,
    borderWidth: 1,
    borderColor: 'white',
  },
};

const mapStateToProps = ({ chat }) => {
  return { chat };
};

export default connect(mapStateToProps, { selectChat })(NoConvoMatch);
