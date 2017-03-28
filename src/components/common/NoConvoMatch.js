import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectChat } from '../../actions';

class NoConvoMatch extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectChat(this.props.user2Id, 'tbd', this.props.user2Pic);
          Actions.conversation();
        }}
      >
        <View>
          <Image
            style={styles.noConvoThumbnailStyle}
            source={{ uri: this.props.user2Pic }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = {
  noConvoThumbnailStyle: {
    height: 75,
    width: 75,
    marginRight: 10
  },
};

const mapStateToProps = ({ chat }) => {
  return { chat };
};

export default connect(mapStateToProps, { selectChat })(NoConvoMatch);
