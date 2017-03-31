import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import Connection from './Connection';
import { connectWithUser, selectChat, keepBrowsing } from '../../actions';

class ConnectionContainer extends Component {
  render() {
    const { currentUser, connection } = this.props;
    const { selectedMatchId, selectedMatchName, selectedMatchPic } = connection;
    return (
      <Connection
        onConnect={(uid, name, pic) => this.props.connectWithUser(uid, name, pic)}
        currentUser={{
          id: currentUser.uid,
          name: currentUser.firstName,
          pic: currentUser.profileImages[0]
        }}
        otherUser={{
          id: selectedMatchId,
          name: selectedMatchName,
          pic: selectedMatchPic
        }}
        startChat={() => {
          this.props.selectChat(selectedMatchId, selectedMatchName, selectedMatchPic);
          Actions.conversation();
        }}
        keepBrowsing={() => {
          this.props.keepBrowsing();
          Actions.pop();
        }}
      />
    );
  }
}

const mapStateToProps = ({ currentUser, connection }) => {
  return { currentUser, connection };
};

export default connect(mapStateToProps, { connectWithUser, selectChat, keepBrowsing })(ConnectionContainer);
