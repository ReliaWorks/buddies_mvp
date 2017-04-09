import React, { Component } from 'react';
import { ActionConst, Scene, Router } from 'react-native-router-flux';
import LoginForm from './scenes/LoginForm';
import SettingsContainer from './scenes/settings';
import BrowseContainer from './scenes/BrowseContainer';
import { ProfileSetupComplete } from './scenes/profile-setup';
import ActivitySetupScene from './scenes/activity-setup/';
import AffiliationSetupScene from './scenes/affiliation-setup/';
import DescriptionSetup from './scenes/profile-setup/DescriptionSetup';
import UserEditContainer from './scenes/user-edit/UserEditContainer';
import UserView from './scenes/UserView';
import MessageCenterContainer from './scenes/message-center';
import ConnectionContainer from './components/connection';
import Conversation from './scenes/Conversation';
import ProfileModal from './components/common/ProfileModal';
import { navBarStyle, navTitleStyle } from './components/common/styles';
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
            key="login"
            direction="vertical"
            component={LoginForm}
            hideNavBar
          />
        </Scene>
        <Scene key="profileSetup">
          <Scene
            key="activitySetup"
            title="My Activities"
            component={ActivitySetupScene}
          />
          <Scene
            key="affiliationSetup"
            title="My Affiliations"
            component={AffiliationSetupScene}
          />
          <Scene
            key="descriptionSetup"
            title="About Me"
            component={DescriptionSetup}
          />
          <Scene
            key="profileSetupComplete"
            component={ProfileSetupComplete}
            hideNavBar
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
            key="connection"
            title="Connection"
            component={ConnectionContainer}
            hideNavBar
          />
          <Scene
            key="matches"
            component={MessageCenterContainer}
            title="Conversations"
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
