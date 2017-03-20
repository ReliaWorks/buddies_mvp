import React, { Component } from 'react';
//import { Dimensions } from 'react-native';
//import Icon from 'react-native-vector-icons';
import { ActionConst, Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './scenes/LoginForm';
import SettingsScene from './scenes/settings';
import BrowseBuddies from './scenes/BrowseBuddies';
import { ActivitySetup, AffiliationSetup, ProfileSetupComplete } from './scenes/profile-setup';
import PhotoSetup from './scenes/profile-setup/PhotoSetup';
import DescriptionSetup from './scenes/profile-setup/DescriptionSetup';
import UserEdit from './scenes/UserEdit';
import UserView from './scenes/UserView';
import Matches from './scenes/Matches';
import { Conversation } from './scenes/Conversation';
import { iconStyle, navBarStyle, navTitleStyle } from './components/common/styles';
import { chatIconButton, homeLeftIconButton, homeRightIconButton, profileIconButton, wrenchIconButton } from './icons';

class Routes extends Component {
  render() {
    return (
      <Router
        sceneStyle={styles.routerStyle}
        navigationBarStyle={navBarStyle}
        titleStyle={navTitleStyle}
      >
        <Scene key="root">
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
            key="photoSetup"
            title="Profile Setup"
            component={PhotoSetup}
          />
          <Scene
            key="activitySetup"
            title="Profile Setup"
            component={ActivitySetup}
          />
          <Scene
            key="affiliationSetup"
            title="Profile Setup"
            component={AffiliationSetup}
          />
          <Scene
            key="descriptionSetup"
            title="Profile Setup"
            component={DescriptionSetup}
          />
          <Scene
            key="profileSetupComplete"
            component={ProfileSetupComplete}
          />

        </Scene>
        <Scene key="main" type={ActionConst.RESET} initial>
          <Scene
            key="browse"
            component={BrowseBuddies}
            title="Social."
            leftButton={profileIconButton}
            leftButtonIconStyle={iconStyle}
            rightButton={chatIconButton}
            onRight={() => Actions.matchesConversations()}
            type={ActionConst.RESET}
          />
        </Scene>
        <Scene key="profileSettings">
          <Scene
            key="userView"
            direction="vertical"
            component={UserView}
            title="Profile Settings"
            leftButton={wrenchIconButton}
            leftButtonIconStyle={iconStyle}
//            onLeft={() => Actions.settings()}
            rightButton={homeRightIconButton}
//            onRight={() => Actions.main()}
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
        <Scene key="matchesConversations">
          <Scene
            key="matches"
            component={Matches}
            title="Matches"
            leftButton={homeLeftIconButton}
//            leftButtonIconStyle={iconStyle}
            onLeft={() => Actions.main()}
          />
          <Scene
            key="conversation"
            component={Conversation}
            title="Chat"
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
