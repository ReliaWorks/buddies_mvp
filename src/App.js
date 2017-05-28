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

class App extends Component {

  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  render() {
    const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
