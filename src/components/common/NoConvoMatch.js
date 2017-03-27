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
          //NEED TO UPDATE WITH this.props.uid, this.props.name, this.props.profilePic
          this.props.selectChat(this.props.id.value, this.props.name.first, this.props.picture.medium);
          Actions.conversation();
        }}
      >
        <View>
          <Image
            style={styles.noConvoThumbnailStyle}
            source={{ uri: this.props.picture.large }}
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
