import React from 'react';
import { ActionConst, Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Settings from './components/Settings';
import BrowseBuddies from './components/BrowseBuddies';
import { PicSetup, ActivitySetup, AffiliationSetup, DescriptionSetup, ProfileSetupComplete } from './components/profile-setup';
import UserEdit from './components/UserEdit';
import UserView from './components/UserView';
import Matches from './components/Matches';
import { Conversation } from './components/common';
import { buttonIconStyle, navigationBarStyle } from './components/common/styles';

const homeImageLocation = require('./components/common/img/home.png');
const wrenchImageLocation = require('./components/common/img/wrench.png');
const sprocketImageLocation = require('./components/common/img/224_gear.png');
const chatImageLocation = require('./components/common/img/224_chat.png');

const RouterComponent = () => {
  return (
    <Router sceneStyle={styles.routerStyle} navigationBarStyle={navigationBarStyle}>
      <Scene key="root">
        <Scene key="login" direction="vertical" component={LoginForm} title="Buddies" />
      </Scene>
      <Scene key="profileSetup" initial>
        <Scene
          key="picSetup"
          title="Profile Setup"
          component={PicSetup}
          initial
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
      <Scene key="main" type={ActionConst.RESET}>
        <Scene
          key="browse"
          component={BrowseBuddies}
          title="Buddies"
          leftButtonImage={sprocketImageLocation}
          rightButtonImage={chatImageLocation}
          leftButtonIconStyle={buttonIconStyle}
          onLeft={() => Actions.profileSettings()}
          rightButtonIconStyle={buttonIconStyle}
          onRight={() => Actions.matchesConversations()}
          type={ActionConst.RESET}
          initial
        />
      </Scene>
      <Scene key="profileSettings">
        <Scene
          key="userView"
          direction="vertical"
          component={UserView}
          title="Profile Settings"
          leftButtonImage={wrenchImageLocation}
          leftButtonIconStyle={buttonIconStyle}
          onLeft={() => Actions.settings()}
          rightButtonImage={homeImageLocation}
          rightButtonIconStyle={buttonIconStyle}
          onRight={() => Actions.main()}
          initial
        />
        <Scene key="userEdit" component={UserEdit} title="Edit Profile" />
        <Scene
          key="settings"
          component={Settings}
          title="Settings"
        />
      </Scene>
      <Scene key="matchesConversations">
        <Scene
          key="matches"
          component={Matches}
          title="Matches"
          leftButtonImage={homeImageLocation}
          leftButtonIconStyle={buttonIconStyle}
          onLeft={() => Actions.main()}
        />
        <Scene
          key="conversation"
          component={Conversation}
          title="Conversation"
        />
      </Scene>
    </Router>
  );
};

const styles = {
  routerStyle: {
    paddingTop: 60,
//    backgroundColor: 'orange'
  },
};
export default RouterComponent;
