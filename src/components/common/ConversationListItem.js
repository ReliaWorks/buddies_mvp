import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Moment from 'moment';
import { selectChat } from '../../actions';


const MARGIN = 15;

class ConversationListItem extends Component {
  renderNameAndTimestamp(name, createdAt) {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.nameText}>
          {name}
        </Text>
        <Text style={styles.dateText}>{createdAt}</Text>
      </View>
    );
  }
  render() {
    const msgContainer = this.props.matchSet.lastMsgs[this.props.otherUserId];
    let msg = '';
    let createdAt = '';
    if(!msgContainer) msg = "Start chatting";
    else {
      msg = msgContainer.text;
      createdAt = Moment(msgContainer.timestamp).fromNow();
    }

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
            {this.renderNameAndTimestamp(this.props.otherUserName, createdAt)}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    marginLeft: MARGIN,
    marginRight: MARGIN,
    paddingBottom: MARGIN / 2,
    paddingTop: MARGIN / 2,
  },
  convoContainerStyle: {
    marginLeft: MARGIN,
    flex: 1,
  },
  nameText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    fontWeight: '700',
    marginTop: MARGIN,
  },
  dateText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 12,
    color: '#707070',
    marginTop: MARGIN,
    paddingRight: MARGIN,
  },
  msgText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
  },
  convoThumbnailStyle: {
    height: 68,
    width: 68,
    marginBottom: MARGIN / 2,
    marginTop: MARGIN / 2,
  }
};

const mapStateToProps = ({ matchSet }) => {
  return { matchSet };
};

export default connect(mapStateToProps, { selectChat })(ConversationListItem);
