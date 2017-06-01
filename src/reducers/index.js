import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ActivityFormReducer from './ActivityFormReducer';
import ActivityReducer from './ActivityReducer';
import AffiliationReducer from './AffiliationReducer';
import BrowseReducer from './BrowseReducer';
import MessageCenterReducer from './MessageCenterReducer';
import ProfileReducer from './ProfileReducer';
import SettingsReducer from './SettingsReducer';
import ChatReducer from './ChatReducer';
import SelectedUserProfileReducer from './SelectedUserProfileReducer';
import ConnectionReducer from './ConnectionReducer';

export default combineReducers({
  auth: AuthReducer,
  activityForm: ActivityFormReducer,
  activities: ActivityReducer,
  affiliations: AffiliationReducer,
  chat: ChatReducer,
  connection: BrowseReducer,
  currentUser: ProfileReducer,
  settings: SettingsReducer,
  messageCenter: MessageCenterReducer,
  selectedUser: SelectedUserProfileReducer,
  commonality: ConnectionReducer,
});
