import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ActivityFormReducer from './ActivityFormReducer';
import ActivityReducer from './ActivityReducer';
import AffiliationReducer from './AffiliationReducer';
import BrowseReducer from './BrowseReducer';
import ProfileReducer from './ProfileReducer';
import SettingsReducer from './SettingsReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  auth: AuthReducer,
  activityForm: ActivityFormReducer,
  activities: ActivityReducer,
  affiliations: AffiliationReducer,
  connection: BrowseReducer,
  currentUser: ProfileReducer,
  settings: SettingsReducer,
  chat: ChatReducer,
});
