import { Actions } from 'react-native-router-flux';
import {
  AccessToken,
  LoginManager,
//  GraphRequest,
//  GraphRequestManager
} from 'react-native-fbsdk';
import firebase from 'firebase';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER,
} from './types';

const USERS_LOCATION = 'https://activities-test-a3871.firebaseio.com/users';

const responseCallback = ((error, result) => {
  if (error) {
    response.ok = false;
    response.error = error;
    alert("Graph API Didn't work");
    return (response);
//    return;
  }
  response.ok = true;
  response.json = result;
  console.log(result);
  return (response);
});

function userExistsCallback(userId, exists) {
  if(exists) {
    alert('user ' + userId + ' exists!');
  } else {
    alert('user ' + userId + ' does not exist!');
  }
}

function checkIfUserExists(userId, usersRef) {
  usersRef.child(userId).once('value', (snapshot) => {
    const exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const auth = firebase.auth();
    const usersRef = firebase.database().ref("users");
    const provider = firebase.auth.FacebookAuthProvider;

    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_photos'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success.');
          console.log(result);
          AccessToken.getCurrentAccessToken()
            .then(accessTokenData => {
              //check to see if user exists in firebase
              loginUserSuccess(dispatch, result);
              const credential = provider.credential(accessTokenData.accessToken);
              usersRef.child(authData.uid).set({provider, name: accessTokenData.first_name});
              return auth.signInWithCredential(credential);
            }).then(credData => {
              console.log(credData);
            }).catch(err => {
              console.log(err);
            });
        }
      },
      (error) => {
        /* When login fails, enters this case.
         * Need to check if user already exists in Firebase.
         * If not, create user and redirect to FTUE
         */
        console.log('Login fail with error: ' + error);
        createUser(dispatch);
        const credential = provider.credential(accessTokenData.accessToken);
        usersRef.child(authData.uid).set({provider, name: accessTokenData.first_name});
        return auth.signInWithCredential(credential);
      }
    );
  };
};

const createUser = (dispatch) => {
  dispatch({
    type: CREATE_USER,
    payload: user
  });
  Actions.profileSetup();
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
    Actions.main();
};
