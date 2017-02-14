import { Actions } from 'react-native-router-flux';
import { AccessToken,
         GraphRequest,
         GraphRequestManager } from 'react-native-fbsdk';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
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

const loginUser = ({ fbToken = null }) => {
  console.log('In AuthActions -> loginUser');
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const profileRequestParams = {
      fields: {
        string: 'id, name, email, first_name, last_name, gender, fbToken'
      }
    };

    const profileRequestConfig = {
      httpMethod: 'GET',
      version: 'v2.5',
      parameters: profileRequestParams,
      accessToken: token.toString()
    };

    const profileRequest = new GraphRequest(
      '/me',
      profileRequestConfig,
      responseCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(profileRequest).start()
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => loginUserFail(dispatch, error));
    console.log('After new GraphRequestManager');
    console.log(response);
  };
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
