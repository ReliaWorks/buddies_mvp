import _ from 'lodash';
//Container component responsible for calling to Firebase and loading the 10 most recent messages in a conversation between the currentUser and a given user.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { saveLastMessage } from '../actions';

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
    const branchKey = this.constructBranchId(currentUser, this.props.connection.selectedMatchId);
    const chatRef = firebase.database().ref(`/user_chats/${branchKey}`);
    chatRef.on('value', snapshot => {
      //reverse() returns data in reverse chronological order
        this.setState({messages: _.map(snapshot.val()).reverse(), loading: false});
    });
    this.setState({loading: false});
  }

  onSend(messages = []) {
    const { currentUser } = firebase.auth();
    const firstName = this.props.currentUser.firstName;
    const branchKey = this.constructBranchId(currentUser, this.props.connection.selectedMatchId);

    const user = {...messages[0].user, name: firstName, avatar: this.props.currentUser.profileImages[0]};
    const m1 = {...messages[0], user, createdAt: firebase.database.ServerValue.TIMESTAMP};
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
    else return (`${matchUId} - ${currentUser.uid}`);
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
        <Text style={{marginLeft: 10, alignSelf: 'center'}} onPress={() => Actions.pop()}>
          Back
        </Text>
        <View style={{flexDirection: 'row', alignSelf: 'center' }}>
        <Image
          source={{uri: this.props.connection.selectedMatchPic}}
          style={{height: 30, width: 30, borderRadius: 15, marginRight: 10}}
        />
        <Text style={styles.headerText}>{this.props.connection.selectedMatchName}</Text>
        </View>
        <Text style={{marginRight: 10, alignSelf: 'center' }} onPress={() => Actions.pop()}>
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
          messages={this.state.messages}
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

const mapStateToProps = ({ currentUser, connection }) => {
  return { currentUser, connection };
};

export default connect(mapStateToProps, { saveLastMessage })(Conversation);
