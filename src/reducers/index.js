import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ActivityFormReducer from './ActivityFormReducer';
import ActivityReducer from './ActivityReducer';

export default combineReducers({
  auth: AuthReducer,
  activityForm: ActivityFormReducer,
  activities: ActivityReducer,
});
