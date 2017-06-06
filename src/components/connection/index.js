import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import Connection from './Connection';
import { connectWithUser, findCommonality, selectChat, keepBrowsing } from '../../actions';
import { DEFAULT_PROFILE_PHOTO, ACTIVE } from '../../constants';

class ConnectionContainer extends Component {
  componentWillMount() {
    const { uid, activities, affiliations } = this.props.currentUser;
    this.props.findCommonality(this.props.connection.selectedMatchId, activities, affiliations);
  }

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
    if(currentUser.profileImages && currentUser.profileImages.length > 0) {
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
        commonInterests={this.props.commonality.commonInterests}
      />
    );
  }
}

const mapStateToProps = ({ currentUser, connection, commonality }) => {
  return { currentUser, connection, commonality };
};

export default connect(mapStateToProps, { connectWithUser, findCommonality, selectChat, keepBrowsing })(ConnectionContainer);
