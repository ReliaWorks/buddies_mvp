import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectChat } from '../../actions';

const SIDE_MARGIN = 15;

class ConversationListItem extends Component {
  render() {
//    let msg = this.props.matchSet.lastMsgs[this.props.otherUserId];
//    if(!msg) msg = "Start chatting";
    const msg = "TBD";
    return (
    <TouchableOpacity
      onPress={() => {
        this.props.selectChat(this.props.otherUserId, this.props.otherUserName, this.props.otherUserPic);
        Actions.conversation();
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.convoThumbnailStyle}
          source={{ uri: this.props.otherUserPic }}
        />
        <View style={styles.convoContainerStyle}>
          <Text style={styles.nameText}>
            {this.props.otherUserName}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={styles.msgText}
          >
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#F8F8F8',
    marginLeft: SIDE_MARGIN,
    marginRight: SIDE_MARGIN,
    marginBottom: SIDE_MARGIN,
  },
  convoContainerStyle: {
    marginLeft: 10,
    flex: 1
  },
  nameText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    fontWeight: '800',
  },
  msgText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
  convoThumbnailStyle: {
    height: 75,
    width: 75,
    marginBottom: 10,
  }
};

const mapStateToProps = ({ matchSet }) => {
  return { matchSet };
};

export default connect(mapStateToProps, { selectChat })(ConversationListItem);
