import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import MessageCenter from './MessageCenter';
import { matchesFetch, updateMessageCenterNotification } from '../../actions';

class MessageCenterContainer extends Component {
  componentWillMount() {
    if (!this.props.loaded) {
      this.props.matchesFetch();
    }
    this.createDataSource(this.props);
  }

  componentWillUnmount() {
    this.props.updateMessageCenterNotification(this.props.uid);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ matchesWithChat, matchesWithoutChat }) {
    const matchesWithChatDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.matchesWithChatDataSource = matchesWithChatDS.cloneWithRows({ ...matchesWithChat });
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
const mapStateToProps = ({ messageCenter, currentUser }) => {
  const { matchesWithChat, matchesWithoutChat, loading, loaded } = messageCenter;
  const { firstName, uid } = currentUser;
  return { uid, matchesWithChat, matchesWithoutChat, loading, loaded, firstName };
};

export default connect(mapStateToProps, { updateMessageCenterNotification, matchesFetch })(MessageCenterContainer);
