import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
//import firebase-ui from 'firebaseui';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RouterComponent from './Router';
//import { View, Text } from 'react-native';

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
      console.log('successfully connected to firebase');
    }

  render() {
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
