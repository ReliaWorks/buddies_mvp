/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { AppRegistry } from 'react-native';
import { Sentry, SentryLog } from 'react-native-sentry';
import App from './src/App';

// logLevel: SentryLog.Debug, autoBreadcrumbs passed to the config regarding to this error:
// https://github.com/getsentry/react-native-sentry/issues/57

Sentry.config("https://2f81115717434870acf29f260688c226:63241df70957413bb812dcd4ed0b2c7c@sentry.io/169776", {
  logLevel: SentryLog.Debug,
  autoBreadcrumbs: {
    xhr: false,
    console: true,
    dom: true,
    location: true
  }
}).install();

AppRegistry.registerComponent('buddies_v3', () => App);
