import { AppRegistry } from 'react-native';
import { Sentry, SentryLog } from 'react-native-sentry';
import App from './src/App';
import { SENTRY_DNS } from './src/config';

// logLevel: SentryLog.Debug, autoBreadcrumbs passed to the config regarding to this error:
// https://github.com/getsentry/react-native-sentry/issues/57
//import { Sentry } from 'react-native-sentry';
//Sentry.config("YOUR_DSN_HERE").install();

// Sentry.config(SENTRY_DNS, {
//
//   logLevel: SentryLog.Debug,
//   autoBreadcrumbs: {
//     xhr: false,
//     console: true,
//     dom: true,
//     location: true
//   }
// }).install();

AppRegistry.registerComponent('wavelength', () => App);
