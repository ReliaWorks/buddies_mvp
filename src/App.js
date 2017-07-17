import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
//import { Sentry } from 'react-native-sentry';
import reducers from './reducers';
import Routes from './Routes';
import { FIREBASE_CONFIG } from './config';

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

class App extends Component {

  componentWillMount() {
    if(!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);      
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
