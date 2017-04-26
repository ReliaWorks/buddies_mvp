import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import Connection from './Connection';
import { connectWithUser, selectChat, keepBrowsing } from '../../actions';
import { DEFAULT_PROFILE_PHOTO, ACTIVE } from '../../config';

class ConnectionContainer extends Component {
  convertProfileImagesObjectToArray(profileImages) {
    const images = [];
    if(profileImages) {
      _.map(profileImages, (img, key) => {
        if(img.status === ACTIVE) {
          images.push({url: img.url, key: key});
        }
      });
    }
    return images;
  }

  render() {
    const { currentUser, connection } = this.props;
    const { selectedMatchId, selectedMatchName, selectedMatchPic } = connection;
    let profileImage = DEFAULT_PROFILE_PHOTO;
    if(currentUser.profileImages) {
      profileImage = currentUser.profileImages[0].url;
    }

    return (
      <Connection
        onConnect={(uid, name, pic) => this.props.connectWithUser(uid, name, pic)}
        currentUser={{
          id: currentUser.uid,
          name: currentUser.firstName,
          pic: profileImage
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
