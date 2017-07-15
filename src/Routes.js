import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { ActionConst, Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './scenes/LoginForm';
import SettingsContainer from './scenes/settings';
import BrowseContainer from './scenes/BrowseContainer';
import LocationRequest from './scenes/LocationRequest';
import ProfileSetupComplete from './scenes/profile-setup/ProfileSetupComplete';
import ActivitySetupScene from './scenes/activity-setup/';
import AffiliationSetupScene from './scenes/affiliation-setup/';
import DescriptionSetup from './scenes/profile-setup/DescriptionSetup';
import UserEditContainer from './scenes/user-edit/UserEditContainer';
import PhotoEditContainer from './components/profile-edit/PhotoEditContainer';
import UserView from './scenes/UserView';
import MessageCenterContainer from './scenes/message-center';
import ConnectionContainer from './components/connection';
import Conversation from './scenes/Conversation';
import { PDF, PictureModal, FirstConnectionHelperModal } from './components/common';
import ProfileModal from './components/common/ProfileModal';
import ChatComponentIconButton from './components/common/ChatComponentIconButton';
import FbAlbums from './components/profile-edit/addPhoto/FbAlbums';
import FbAlbumPhotos from './components/profile-edit/addPhoto/FbAlbumPhotos';
import Splash from './scenes/Splash';
import { navBarStyle, navTitleStyle, navBackNextStyle, navBackStyle } from './components/common/styles';
import { homeLeftIconButton, homeRightIconButton, profileIconButton, wrenchIconButton } from './icons';
import { ACTIVITY_SETUP_SCENE_TITLE, AFFILIATION_SETUP_SCENE_TITLE } from './constants';

//const MSG_CENTER_IMG = require('./assets/img/MsgCenter.png');
//const MSG_CENTER_URL = 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fapp_icons%2Fmessage%20icon.png?alt=media&token=afa34c63-4288-4f9f-a4d1-090acc830b20';

class Routes extends Component {
  render() {
    return (
      <Router
        sceneStyle={styles.routerStyle}
        navigationBarStyle={navBarStyle}
        titleStyle={navTitleStyle}
      >
        <Scene key="root" type={ActionConst.RESET}>
          <Scene
            key="splash"
            component={Splash}
          />
          <Scene
            key="login"
            component={LoginForm}
            navigationBarStyle={{
              backgroundColor: '#FF4F7D',
              borderBottomColor: 'transparent',
            }}
            type={ActionConst.RESET}
          />
          <Scene
            key="tos"
            component={PDF}
          />
        </Scene>
        <Scene key="profileSetup">
          <Scene
            key="activitySetup"
            title={ACTIVITY_SETUP_SCENE_TITLE}
            type={ActionConst.RESET}
            component={ActivitySetupScene}
            rightTitle="Next"
            onRight={() => Actions.affiliationSetup()}
            rightButtonTextStyle={navBackNextStyle}
          />
          <Scene
            key="affiliationSetup"
            type={ActionConst.RESET}
            title={AFFILIATION_SETUP_SCENE_TITLE}
            component={AffiliationSetupScene}
            rightTitle="Next"
            onRight={() => Actions.descriptionSetup()}
            rightButtonTextStyle={navBackNextStyle}
            leftTitle="Back"
            onLeft={() => Actions.activitySetup()}
            leftButtonTextStyle={navBackStyle}
          />
          <Scene
            key="descriptionSetup"
            type={ActionConst.RESET}
            title="About Me"
            component={DescriptionSetup}
            rightTitle="Next"
            onRight={() => Actions.profileSetupComplete()}
            rightButtonTextStyle={navBackNextStyle}
            leftTitle="Back"
            onLeft={() => Actions.affiliationSetup()}
            leftButtonTextStyle={navBackStyle}
          />
          <Scene
            key="profileSetupComplete"
            component={ProfileSetupComplete}
            hideNavBar
            type={ActionConst.RESET}
          />
        </Scene>
        <Scene key="main" type={ActionConst.RESET}>
          <Scene
            key="browse"
            component={BrowseContainer}
            title="wavelength"
            leftButton={profileIconButton}
            rightButton={ChatComponentIconButton}
            type={ActionConst.RESET}
          />
          <Scene
            key="location"
            component={LocationRequest}
          />
          <Scene
            key="connectionHelper"
            component={FirstConnectionHelperModal}
            hideNavBar
          />
          <Scene
            key="picture"
            component={PictureModal}
            hideNavBar
          />
          <Scene
            key="connection"
            title="Connection"
            component={ConnectionContainer}
            hideNavBar
          />
          <Scene
            key="matches"
            component={MessageCenterContainer}
            leftButton={homeLeftIconButton}
/*            navigationBarBackgroundImage={{
              uri: MSG_CENTER_URL,
              width: width,
              height: 60,
            }}
//            title="Chat"
*/
            navigationBarStyle={{
              borderBottomWidth: 3,
              borderBottomColor: 'black',
              backgroundColor: 'transparent'
            }}
            type={ActionConst.RESET}
          />
          <Scene
            key="conversation"
            component={Conversation}
            title="Chat"
            type={ActionConst.RESET}
            hideNavBar
          />
          <Scene
            key="profile"
            component={ProfileModal}
            title="Profile"
          />
        </Scene>
        <Scene
          key="userView"
          component={UserView}
          title="Edit Profile"
          leftButton={wrenchIconButton}
          rightButton={homeRightIconButton}
          type={ActionConst.RESET}
        />
        <Scene
          key="userEdit"
          component={UserEditContainer}
          title="Update Your Profile"
          leftButton={profileIconButton}
          type={ActionConst.RESET}
          navigationBarStyle={{
            borderBottomWidth: 3,
            borderBottomColor: 'black',
          }}
        />
        <Scene
          key="photoEdit"
          component={PhotoEditContainer}
          title="Edit Your Photos"
          navigationBarStyle={{
            borderBottomWidth: 3,
            borderBottomColor: 'black',
          }}
          leftButton={profileIconButton}
          type={ActionConst.RESET}
        />
        <Scene
          key="addPhotoFbAlbums"
          component={FbAlbums}
          type={ActionConst.RESET}
          title="Albums"
          navigationBarStyle={{
            backgroundColor: '#3b5998',
          }}
          titleStyle={{
            color: 'white'
          }}
          leftTitle="Cancel"
          onLeft={() => Actions.photoEdit()}
          leftButtonTextStyle={{...navBackNextStyle, color: 'white', alignSelf: 'flex-start'}}
        />
        <Scene
          key="addPhotoFbAlbumPhotos"
          type={ActionConst.RESET}
          component={FbAlbumPhotos}
          title="Photos"
          navigationBarStyle={{
            backgroundColor: '#3b5998',
          }}
          titleStyle={{
            color: 'white'
          }}
          leftTitle="Albums"
          onLeft={() => Actions.addPhotoFbAlbums()}
          leftButtonTextStyle={{...navBackNextStyle, color: 'white', alignSelf: 'flex-start'}}
        />
        <Scene
          key="activityEdit"
          title="Edit Activities"
          type={ActionConst.RESET}
          component={ActivitySetupScene}
          rightTitle="Done"
          onRight={() => Actions.userEdit()}
          rightButtonTextStyle={navBackNextStyle}
        />
        <Scene
          key="affiliationEdit"
          type={ActionConst.RESET}
          title="Edit Affiliations"
          component={AffiliationSetupScene}
          rightTitle="Done"
          onRight={() => Actions.userEdit()}
          rightButtonTextStyle={navBackNextStyle}
        />
        <Scene
          key="settings"
          component={SettingsContainer}
          title="Settings"
          navigationBarStyle={{
            borderBottomWidth: 3,
            borderBottomColor: 'black',
          }}
          leftButton={profileIconButton}
          type={ActionConst.RESET}
        />
        <Scene
          key="location"
          component={LocationRequest}
        />
        <Scene
          key="pdf"
          component={PDF}
        />
      </Router>
    );
  }
}

const styles = {
  routerStyle: {
    paddingTop: 60,
  },
};

export default Routes;
