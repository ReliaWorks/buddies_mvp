import React, { Component } from 'react';
import { ActionConst, Scene, Router } from 'react-native-router-flux';
import LoginForm from './scenes/LoginForm';
import SettingsScene from './scenes/settings';
import BrowseBuddies from './scenes/BrowseBuddies';
import { ProfileSetupComplete } from './scenes/profile-setup';
import ActivitySetupScene from './scenes/activity-setup/';
import AffiliationSetupScene from './scenes/affiliation-setup/';
import DescriptionSetup from './scenes/profile-setup/DescriptionSetup';
import UserEdit from './scenes/UserEdit';
import UserView from './scenes/UserView';
import Matches from './scenes/Matches';
import ConnectionContainer from './components/connection';
import Conversation from './scenes/Conversation';
import { navBarStyle, navTitleStyle } from './components/common/styles';
import { chatIconButton, chatLeftIconButton, homeLeftIconButton, homeRightIconButton, profileIconButton, wrenchIconButton } from './icons';

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
            title="Buddies"
          />
        </Scene>
        <Scene key="profileSetup">
          <Scene
            key="activitySetup"
            title="Select Activities"
            component={ActivitySetupScene}
          />
          <Scene
            key="affiliationSetup"
            title="Select Affiliations"
            component={AffiliationSetupScene}
          />
          <Scene
            key="descriptionSetup"
            title="Profile Setup"
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
            component={BrowseBuddies}
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
            component={Matches}
            title="Connections"
            leftButton={homeLeftIconButton}
          />
          <Scene
            key="conversation"
            component={Conversation}
            title="Chat"
            leftButton={chatLeftIconButton}
            hideNavBar
          />
        </Scene>
        <Scene key="profileSettings">
          <Scene
            key="userView"
            component={UserView}
            title="Profile Settings"
            leftButton={wrenchIconButton}
            rightButton={homeRightIconButton}
          />
          <Scene
            key="userEdit"
            component={UserEdit}
            title="Edit Profile"
          />
          <Scene
            key="settings"
            component={SettingsScene}
            title="Settings"
          />
        </Scene>
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
