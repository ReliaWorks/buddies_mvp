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

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const auth = firebase.auth();
    const provider = firebase.auth.FacebookAuthProvider;

    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_photos'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
            .then(accessTokenData => {
              loginUserSuccess(dispatch, result);
              const credential = provider.credential(accessTokenData.accessToken);
              return auth.signInWithCredential(credential);
            }).then(credData => {
              console.log(credData);
            }).catch(err => {
              console.log(err);
            });
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      }
    );
  };
};

const createUser = (dispatch, user) => {
  dispatch({
    type: CREATE_USER,
    payload: user
  });
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
