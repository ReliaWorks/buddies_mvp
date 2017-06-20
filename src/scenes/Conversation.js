import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GiftedChat } from 'react-native-gifted-chat';
import ConnectionOptionsModal from './conversation/ConnectionOptionsModal';
import { Confirm } from '../components/common';
import { backIconButton, moreIconButton } from '../icons';
import { fetchConversation, updateConversationNotifications, saveMessage, closeConversation, loadEarlier, unMatchWithUser } from '../actions';
import { DEFAULT_PROFILE_PHOTO } from '../constants';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.state = {
      showConnectionOptionsModal: false,
      showUnmatchConfirmModal: false
    };
  }

  componentWillMount() {
    this.props.fetchConversation(this.props.connection, this.props.currentUser);
  }

  componentWillUnmount() {
    this.props.updateConversationNotifications(
      this.props.chat.chatId, this.props.currentUser.uid, this.props.connection.selectedMatchId, this.props.messageCenter
    );
    this.props.closeConversation(this.props.chat.chatId);
  }

  onSend(messages = []) {
    this.props.saveMessage(messages[0], this.props.currentUser, this.props.connection, this.props.chat.chatId, messages, this.props.messageCenter);
  }

  renderFooter() {
    if(this.props.chat.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.props.chat.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderProfile() {
    Actions.profile();
  }

  renderChatPartnerHeader() {
    return(
      <TouchableWithoutFeedback onPress={() => this.renderProfile()}>
        <View style={{flexDirection: 'row', alignSelf: 'center' }}>
          <Image
            source={{uri: this.props.connection.selectedMatchPic}}
            style={{height: 30, width: 30, borderRadius: 15, marginRight: 10}}
          />
          <Text style={styles.headerText}>{this.props.connection.selectedMatchName}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

/*  <TouchableHighlight>
    <View style={{width: 75, height: 50}}>
      <Text style={{paddingLeft: 15, paddingTop: 15, fontFamily: 'Source Sans Pro'}} onPress={() => Actions.matches()}>
        Back
      </Text>
    </View>
  </TouchableHighlight>

  <TouchableHighlight>
    <View style={{width: 75, height: 50}} />
  </TouchableHighlight>
*/
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
        {backIconButton()}
        {this.renderChatPartnerHeader()}
        {moreIconButton(this.openConnectionOptionsModal.bind(this))}
      </View>
    );
  }

  loadEarlier() {
    const {messages} = this.props.chat;
    const loadBefore = messages.length > 0 ? messages[messages.length - 1].createdAt : 0;
    this.props.loadEarlier(loadBefore, this.props.connection, this.props.currentUser);
  }

  openConnectionOptionsModal() {
    this.setState({
      showConnectionOptionsModal: true
    });
  }
  closeModals() {
    this.setState({
      showConnectionOptionsModal: false,
      showUnmatchConfirmModal: false
    });
  }
  showUnmatchConfirmModal() {
    this.setState({
      showConnectionOptionsModal: false,
    });
    setTimeout(() => {
      this.setState({
        showUnmatchConfirmModal: true,
      });
    }, 400);
  }

  unMatch() {
    this.props.unMatchWithUser(this.props.connection.selectedMatchId);
    //this.closeModals();
  }

  render() {
    const { currentUser } = this.props;

    let profileImage = DEFAULT_PROFILE_PHOTO;
    if(currentUser && currentUser.profileImages && currentUser.profileImages.length > 0)
      profileImage = currentUser.profileImages[0].url;

    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        <GiftedChat
          loadEarlier={this.props.chat.loadEarlier && this.props.chat.messages.length > 0}
          onLoadEarlier={this.loadEarlier.bind(this)}
          messages={this.props.chat.messages}
          onSend={this.onSend}
          user={{
            _id: this.props.currentUser.uid,
            avatar: profileImage,
          }}
          renderFooter={this.renderFooter.bind(this)}
        />
        <ConnectionOptionsModal
          visible={this.state.showConnectionOptionsModal}
          connectionName={this.props.connection.selectedMatchName}
          onUnMatch={this.showUnmatchConfirmModal.bind(this)}
          onClose={this.closeModals.bind(this)}
        />
        <Confirm
          visible={this.state.showUnmatchConfirmModal}
          onAccept={this.closeModals.bind(this)}
          onDecline={this.unMatch.bind(this)}
          actionText='Unmatch'
        >
          Are you sure you want to unmatch with {this.props.connection.selectedMatchName}?
        </Confirm>
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
    fontFamily: 'Source Sans Pro'
  },
  headerText: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
});

const mapStateToProps = ({ currentUser, connection, chat, messageCenter }) => {
  return { currentUser, connection, chat, messageCenter };
};

export default connect(mapStateToProps, { updateConversationNotifications, fetchConversation, saveMessage, closeConversation, loadEarlier, unMatchWithUser })(Conversation);
