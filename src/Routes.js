import React, { Component } from 'react';
import { ActionConst, Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './scenes/LoginForm';
import SettingsScene from './scenes/settings';
import BrowseBuddies from './scenes/BrowseBuddies';
import { ActivitySetup, AffiliationSetup, DescriptionSetup, ProfileSetupComplete } from './components/profile-setup';
import PhotoSetup from './scenes/PhotoSetup';
import UserEdit from './scenes/UserEdit';
import UserView from './scenes/UserView';
import Matches from './scenes/Matches';
import { Conversation } from './scenes/Conversation';
import { iconStyle, navBarStyle, navTitleStyle } from './components/common/styles';

const homeImageLocation = require('./components/common/img/home.png');
const wrenchImageLocation = require('./components/common/img/wrench.png');
const sprocketImageLocation = require('./components/common/img/224_gear.png');
const chatImageLocation = require('./components/common/img/224_chat.png');

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
            title="Buddies"
            leftButtonImage={sprocketImageLocation}
            rightButtonImage={chatImageLocation}
            leftButtonIconStyle={iconStyle}
            onLeft={() => Actions.profileSettings()}
            rightButtonIconStyle={iconStyle}
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
            leftButtonImage={wrenchImageLocation}
            leftButtonIconStyle={iconStyle}
            onLeft={() => Actions.settings()}
            rightButtonImage={homeImageLocation}
            rightButtonIconStyle={iconStyle}
            onRight={() => Actions.main()}
          />
          <Scene
            key="userEdit"
            component={UserEdit}
            title="Edit Profile"
            initial
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
            leftButtonImage={homeImageLocation}
            leftButtonIconStyle={iconStyle}
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
