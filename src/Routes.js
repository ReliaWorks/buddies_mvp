import React, { Component } from 'react';
import { ActionConst, Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './scenes/LoginForm';
import SettingsContainer from './scenes/settings';
import BrowseContainer from './scenes/BrowseContainer';
import { ProfileSetupComplete } from './scenes/profile-setup';
import ActivitySetupScene from './scenes/activity-setup/';
import AffiliationSetupScene from './scenes/affiliation-setup/';
import DescriptionSetup from './scenes/profile-setup/DescriptionSetup';
import UserEditContainer from './scenes/user-edit/UserEditContainer';
import PhotoEditContainer from './containers/PhotoEditContainer';
import UserView from './scenes/UserView';
import MessageCenterContainer from './scenes/message-center';
import ConnectionContainer from './components/connection';
import Conversation from './scenes/Conversation';
import { PictureModal } from './components/common';
import ProfileModal from './components/common/ProfileModal';
import Splash from './scenes/Splash';
import { navBarStyle, navTitleStyle, navBackNextStyle } from './components/common/styles';
import { chatIconButton, homeLeftIconButton, homeRightIconButton, profileIconButton, wrenchIconButton } from './icons';

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
            hideNavBar
          />
          <Scene
            key="login"
            component={LoginForm}
            hideNavBar
          />
        </Scene>
        <Scene key="profileSetup">
          <Scene
            key="activitySetup"
            title="My Activities"
            type={ActionConst.RESET}
            component={ActivitySetupScene}
            rightTitle="Next"
            onRight={() => Actions.affiliationSetup()}
            rightButtonTextStyle={navBackNextStyle}
          />
          <Scene
            key="affiliationSetup"
            type={ActionConst.RESET}
            title="My Affiliations"
            component={AffiliationSetupScene}
            rightTitle="Next"
            onRight={() => Actions.descriptionSetup()}
            rightButtonTextStyle={navBackNextStyle}
            leftTitle="Back"
            onLeft={() => Actions.activitySetup()}
            leftButtonTextStyle={navBackNextStyle}
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
            leftButtonTextStyle={navBackNextStyle}
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
            rightButton={chatIconButton}
            type={ActionConst.RESET}
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
          title="Profile Settings"
          leftButton={wrenchIconButton}
          rightButton={homeRightIconButton}
          type={ActionConst.RESET}
        />
        <Scene
          key="userEdit"
          component={UserEditContainer}
          title="Edit Profile"
          leftButton={profileIconButton}
          type={ActionConst.RESET}
        />
        <Scene
          key="photoEdit"
          component={PhotoEditContainer}
          title="Photo Edit"
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
