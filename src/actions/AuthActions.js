import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import firebase from 'firebase';
import { savePics } from './ProfileSetupActions';
import {
  ALREADY_AUTHENTICATED,
  NOT_ALREADY_AUTHED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  PROFILE_INFO,
  PICTURE_SAVED,
} from './types';

export const checkIfAlreadyLoggedIn = () => {
  return(dispatch) => {
    let token;
    let uid;

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log(`User ${user.uid} is logged in.`);
        dispatch({
          type: ALREADY_AUTHENTICATED,
          payload: {
            token: user.refreshToken,
            uid: user.uid
          }
        });
        Actions.main();
      } else {
        console.log(`User is not logged in`);
      }
    });
    AsyncStorage.multiGet(['token', 'uid'])
      .then((data) => {
        if(data[0][1]) {
          token = data[0][1];
          uid = data[1][1];
          console.log(`token = ${token}`);
          console.log(`uid = ${uid}`);
          const provider = firebase.auth.FacebookAuthProvider;
          const cred = provider.credential(token);
          firebase.auth().signInWithCredential(cred)
            .then((fireData) => {
              dispatch({
                type: ALREADY_AUTHENTICATED,
                payload: {
                  token,
                  uid
                }
              });
              Actions.main();
            })
            .catch((error) => {
              console.log(`Error logging in previously authenticated user. Error = ${error.code}: ${error.message}`);
            });
        }
        dispatch({type: NOT_ALREADY_AUTHED});
        Actions.login();
      })
      .catch(err => {
        console.log(`AsyncStorage.multiGet error = ${err}`);
      });
  };
};

const saveTokenToStorage = (token, uid) => {
  AsyncStorage.multiSet([
    ['token', token],
    ['uid', uid]
  ]);
};

export const loginUser = () => {
  return (dispatch) => {
    const auth = firebase.auth();
    const provider = firebase.auth.FacebookAuthProvider;

    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_photos'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
            .then(accessTokenData => {
              signIntoFirebase(dispatch, auth, provider, accessTokenData);
            });
        }
      }, (error) => {
        console.log(`In AuthActions loginUser. Error = ${error}`);
      }
    );
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    LoginManager.logOut();
    firebase.auth().signOut().then(() => {
      const keys = ['token', 'uid'];
      AsyncStorage.multiRemove(keys, (error) => {
        console.log(`Unable to remove AsyncStorage with error = ${error}`);
      });
      dispatch({ type: LOGOUT_USER });
      Actions.root();
    }, (error) => {
      console.log(`Error signing out of Firebase ${error}`);
    });
  };
};

function fetchProfilePhotos(result, dispatch, token) {
  if(result.albums) {
    const fbAlbums = result.albums.data;
    const profileAlbum = fbAlbums.find((album) => {
      return album.name === 'Profile Pictures';
    });

    AccessToken.getCurrentAccessToken().then(() => {
      const profilePicRequest = new GraphRequest(`/${profileAlbum.id}`,
      {
        parameters: {
          fields: { string: 'photos' },
          access_token: { string: token.toString() }
        },
      }, (error1, result1) => {
        if (error1) {
          console.log('Error fetching data: ' + error1.toString());
        } else {
          const profilePics = result1.photos.data;
          profilePics.forEach((pic) => {
              const picRequest = new GraphRequest(
                `/${pic.id}`, {
                  parameters: {
                    fields: { string: 'images' },
                    access_token: { string: token }
                  },
               }, (error2, result3) => {
                 if(error2) {
                   console.log('Error fetching data: ' + error2.toString());
                 } else {
                    dispatch({type: PICTURE_SAVED, payload: result3.images[0].source});
                 }
               }); new GraphRequestManager().addRequest(picRequest).start();
          });
          savePics(profilePics);
        }
      }); new GraphRequestManager().addRequest(profilePicRequest).start();
    });
  }
}

function setupUserFirebase(user,ref, accessTokenData, dispatch) {
  const token = accessTokenData.accessToken;
  const infoRequest = new GraphRequest(
    '/me',
    {
      parameters: {
        fields: { string: 'id,first_name,last_name,location, email, birthday, albums{name}' },
        access_token: { string: token.toString() }
    },
    }, (error, result) => {
      if(error) {
        console.log('Error fetching data: ' + error.toString());
      } else {
        const profile = {
          first_name: result.first_name || '',
          last_name: result.last_name || '',
          email: result.email || '',
          location: result.location || '',
        };
        ref.ref(`/user_profiles/${user.uid}`).set(profile);
        dispatch({
          type: PROFILE_INFO,
          payload: profile
        });
        fetchProfilePhotos(result, dispatch, token);
      }
    }
  ); new GraphRequestManager().addRequest(infoRequest).start();
}


function checkIfUserExists(user, ref, accessTokenData, dispatch) {
  ref.ref(`/user_profiles/${user.uid}`)
    .once('value', snapshot => {
      const exists = (snapshot.val() !== null);
      if(exists) {
        Actions.main();
      } else {
        setupUserFirebase(user,ref, accessTokenData, dispatch);
        Actions.profileSetup();
      }
    });
}

const signIntoFirebase = (dispatch, auth, provider, accessTokenData) => {
  auth.onAuthStateChanged(user => {
    if(user) {
      console.log(`User ${user.uid} is logged in.`);
      dispatch({
        type: ALREADY_AUTHENTICATED,
        payload: {
          token: user.refreshToken,
          uid: user.uid
        }
      });
      Actions.main();
    } else {
      console.log(`User is not logged in`);
      const credential = provider.credential(accessTokenData.accessToken);
      auth.signInWithCredential(credential)
        .then(credData => {
          saveTokenToStorage(accessTokenData.accessToken, credData.uid);
          checkIfUserExists(credData, firebase.database(), accessTokenData, dispatch);
          dispatch({ type: LOGIN_USER, payload: accessTokenData.uid });
        }).catch(err => {
          alert("Unable to log in. Try again later.");
          console.log(`Error signing into Firebase ${err.code}: ${err.message}`);
      });
    }
  });
};
