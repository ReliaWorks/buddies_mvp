import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import MessageCenter from './MessageCenter';
import { matchesFetch, fetchLastMessages } from '../../actions';

class MessageCenterContainer extends Component {
  /*  constructor() {
      super();

      const conversationsDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
        dataSource: conversationsDS.cloneWithRows(sampleData),
      };
    }
    */
  componentWillMount() {
    this.props.matchesFetch();
    this.props.fetchLastMessages();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ matches }) {
    const matchesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.matchesDataSource = matchesDS.cloneWithRows({ ...matches });
  }

  render() {
    return (
      <MessageCenter
        matchesDataSource={this.matchesDataSource}
      />
    );
  }
}
const mapStateToProps = ({ matchSet }) => {
  const { matches } = matchSet;
  return { matches };
};

export default connect(mapStateToProps, { matchesFetch, fetchLastMessages })(MessageCenterContainer);
