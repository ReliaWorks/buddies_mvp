import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectChat } from '../../actions';

class NoConvoMatch extends Component {
  render() {
    debugger;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectChat(this.props.otherUserId, this.props.otherUserName, this.props.otherUserPic);
          Actions.conversation();
        }}
      >
        <View>
          <Image
            style={styles.noConvoThumbnailStyle}
            source={{ uri: this.props.otherUserPic }}
          />
          <Text style={{textAlign: 'center', marginTop: 7}}>{this.props.otherUserName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = {
  noConvoThumbnailStyle: {
    height: 75,
    width: 75,
    borderRadius: 37,
    marginLeft: 7,
    marginRight: 7,
  },
};

const mapStateToProps = ({ chat }) => {
  return { chat };
};

export default connect(mapStateToProps, { selectChat })(NoConvoMatch);
