import _ from 'lodash';
//Container component responsible for calling to Firebase and loading the 10 most recent messages in a conversation between the currentUser and a given user.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { fetchConversation, saveMessage } from '../actions';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.props.fetchConversation(this.props.connection.selectedMatchId);
  }

  onSend(messages = []) {
    this.props.saveMessage(messages[0], this.props.currentUser, this.props.connection, this.props.chat.chatId, messages);
  }

  renderFooter() {
    if(this.props.chat.typingText) {
      return(
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.props.chat.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderHeader() {
    return(
      <View
        style={{
          flex: 0.1,
          marginTop: -30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 3,
        }}
      >
        <Text style={{marginLeft: 10, alignSelf: 'center'}} onPress={() => Actions.matches()}>
          Back
        </Text>
        <View style={{flexDirection: 'row', alignSelf: 'center' }}>
        <Image
          source={{uri: this.props.connection.selectedMatchPic}}
          style={{height: 30, width: 30, borderRadius: 15, marginRight: 10}}
        />
        <Text style={styles.headerText}>{this.props.connection.selectedMatchName}</Text>
        </View>
        <Text style={{marginRight: 10, alignSelf: 'center' }}>
          ...
        </Text>
      </View>
    );
  }

  render() {
    const { currentUser } = firebase.auth();
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        <GiftedChat
          messages={this.props.chat.messages}
          onSend={this.onSend}
          user={{
            _id: currentUser.uid,
          }}
          renderFooter={this.renderFooter.bind(this)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'Avenir-Book'
  },
  headerText: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'Avenir-Book',
    fontWeight: '700',
  },
});

const mapStateToProps = ({ currentUser, connection, chat }) => {
  return { currentUser, connection, chat };
};

export default connect(mapStateToProps, { fetchConversation, saveMessage })(Conversation);
