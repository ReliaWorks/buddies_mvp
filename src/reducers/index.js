import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ActivityFormReducer from './ActivityFormReducer';
import ActivityReducer from './ActivityReducer';
import ProfileReducer from './ProfileReducer';
import SettingsReducer from './SettingsReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  auth: AuthReducer,
  activityForm: ActivityFormReducer,
  activities: ActivityReducer,
  currentUser: ProfileReducer,
  settings: SettingsReducer,
  chat: ChatReducer,
});
