import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import MessageCenter from './MessageCenter';
import { matchesFetch, fetchLastMessages, updateMessageCenterNotification } from '../../actions';

class MessageCenterContainer extends Component {
  componentWillMount() {
    this.props.matchesFetch();
    this.createDataSource(this.props);
  }

  componentWillUnmount() {
    console.log("updateMessageCenterNotification");
    this.props.updateMessageCenterNotification(this.props.uid);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ sortedMatches, matchesWithoutChat }) {
    const matchesWithChatDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.matchesWithChatDataSource = matchesWithChatDS.cloneWithRows({ ...sortedMatches });
    const matchesWithoutChatDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.matchesWithoutChatDataSource = matchesWithoutChatDS.cloneWithRows({ ...matchesWithoutChat });
  }

  render() {
    return (
      <MessageCenter
        matchesWithChatDataSource={this.matchesWithChatDataSource}
        matchesWithoutChatDataSource={this.matchesWithoutChatDataSource}
        firstName={this.props.firstName}
        loading={this.props.loading}
      />
    );
  }
}
const mapStateToProps = ({ matchSet, currentUser }) => {
  const { matches, matchesWithoutChat, loading, sortedMatches, numMatches } = matchSet;
  const { firstName, uid } = currentUser;
  return { uid, matches, matchesWithoutChat, loading, sortedMatches, numMatches, firstName };
};

export default connect(mapStateToProps, { updateMessageCenterNotification, matchesFetch, fetchLastMessages })(MessageCenterContainer);
