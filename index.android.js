/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { AppRegistry } from 'react-native';
import App from './src/App';

import { Sentry } from 'react-native-sentry';

Sentry.config("https://2f81115717434870acf29f260688c226:63241df70957413bb812dcd4ed0b2c7c@sentry.io/169776").install();



AppRegistry.registerComponent('buddies_v3', () => App);
