import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

class FirebaseLoginForm extends Component {
  render() {
    const auth = firebase.auth();
    const provider = firebase.auth.FacebookAuthProvider;
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
      .then(loginResult => {
        if (loginResult.isCancelled) {
          console.log('user cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
          .then(accessTokenData => {
            const credential = provider.credential(accessTokenData.accessToken);
            return auth.signWithCredential(credential);
          })
          .then(credData => {
            console.log(credData);
          })
          .catch(err => {
            console.log(err);
          });
        }
      });
    return(
      <View>
        <Text>
        test
        </Text>
      </View>
    );
  }
}

export default FirebaseLoginForm;
