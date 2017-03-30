import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectChat } from '../../actions';
import { convoThumbnailStyle, textStyle } from './styles';

class ConversationListItem extends Component {
  render() {
    let msg = this.props.matchSet.lastMsgs[this.props.otherUserId];
    if(!msg) msg = "Start chatting";
    return (
    <TouchableOpacity
      onPress={() => {
        this.props.selectChat(this.props.otherUserId, this.props.otherUserName, this.props.otherUserPic);
        Actions.conversation();
      }}
    >
      <View style={styles.container}>
        <Image
          style={convoThumbnailStyle}
          source={{ uri: this.props.otherUserPic }}
        />
        <View style={styles.convoContainerStyle}>
          <Text style={{ fontFamily: 'Avenir-Book', fontSize: 16, fontWeight: '800', marginBottom: 10}}>
            {this.props.otherUserName}
          </Text>
          <Text style={{ fontFamily: 'Avenir-Book', fontSize: 16}}>
           {msg}
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 1,
  },
};

const mapStateToProps = ({ chat, matchSet }) => {
  return { chat, matchSet };
};

export default connect(mapStateToProps, { selectChat })(ConversationListItem);
