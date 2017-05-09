import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import MessageCenter from './MessageCenter';
import { matchesFetch, fetchLastMessages } from '../../actions';
import { Spinner } from '../../components/common';

class MessageCenterContainer extends Component {
  componentWillMount() {
    this.props.matchesFetch();    
    this.createDataSource(this.props);
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
  const { firstName } = currentUser;
  return { matches, matchesWithoutChat, loading, sortedMatches, numMatches, firstName };
};

export default connect(mapStateToProps, { matchesFetch, fetchLastMessages })(MessageCenterContainer);
