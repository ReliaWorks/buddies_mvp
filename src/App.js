import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Routes from './Routes';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  componentWillMount() {
      const config = {
        apiKey: 'AIzaSyC5B1L0NfK0WsZYRtVjVUleo6To9aFuDf8',
        authDomain: 'activities-test-a3871.firebaseapp.com',
        databaseURL: 'https://activities-test-a3871.firebaseio.com',
        storageBucket: 'activities-test-a3871.appspot.com',
        messagingSenderId: '432468217036'
      };

      firebase.initializeApp(config);
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
