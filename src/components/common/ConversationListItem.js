import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectChat } from '../../actions';
import { convoThumbnailStyle, textStyle } from './styles';

class ConversationListItem extends Component {
  render() {
    return (
    <TouchableOpacity
      onPress={() => {
        //NEED TO UPDATE WITH this.props.uid, this.props.name, this.props.profilePic
        this.props.selectChat(this.props.user2Id, this.props.user2Name, this.props.user2Pic);
        Actions.conversation();
      }}
    >
      <View style={styles.container}>
        <Image
          style={convoThumbnailStyle}
          source={{ uri: this.props.user2Pic }}
        />
        <View style={styles.convoContainerStyle}>
          <Text style={textStyle}>
            Need to update
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,

  },
  convoContainerStyle: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 1,
    alignItems: 'stretch',
  },
};

const mapStateToProps = ({ chat }) => {
  return { chat };
};

export default connect(mapStateToProps, { selectChat })(ConversationListItem);
