import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
//import { Sentry } from 'react-native-sentry';
import reducers from './reducers';
import Routes from './Routes';
import { FIREBASE_CONFIG } from './config';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
