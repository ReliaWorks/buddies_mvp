import _ from 'lodash';
//Container component responsible for calling to Firebase and loading the 10 most recent messages in a conversation between the currentUser and a given user.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, Text, View } from 'react-native';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      messages: [],
      typingText: false,
    };
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const branchKey = this.constructBranchId(currentUser, this.props.chat.selectedMatch);
    const chatRef = firebase.database().ref(`/user_chats/${branchKey}`);
    chatRef.on('value', snapshot => {
      //.reverse() returns data in reverse chronological order
        this.setState({messages: _.map(snapshot.val()).reverse(), loading: false});
    });
    this.setState({loading: false});
  }

  onSend(messages = []) {
    const { currentUser } = firebase.auth();
    const firstName = this.props.currentUser.firstName;
    const branchKey = this.constructBranchId(currentUser, this.props.chat.selectedMatch);
    console.log("Branch key");
    console.log(branchKey);

    const user = {...messages[0].user, name: firstName, avatar: this.props.chat.selectedMatchAvatar};
    const m1 = {...messages[0], user, createdAt: new Date().toString()};
    firebase.database().ref(`user_chats/${branchKey}/`).push(m1);

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, m1),
      };
    });
  }

  constructBranchId(currentUser, matchUId) {
    //figure out which one is less than and prepend that uid
    if(currentUser.uid < matchUId) return (`${currentUser.uid} - ${matchUId}`);
    else return (`${matchUId}-${currentUser.uid}`);
  }

  renderFooter() {
    if(this.state.typingText) {
      return(
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }
  render() {
    console.log("In Conversation");
    console.log(this);
    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: "duZphaxR0ue1OjaPOEewe0UjbZV2",
        }}
        renderFooter={this.renderFooter.bind(this)}
      />
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
  },
});

const mapStateToProps = ({ currentUser, chat }) => {
  return { currentUser, chat };
};

export default connect(mapStateToProps)(Conversation);
