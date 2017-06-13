import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import firebase from 'firebase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {
  ALREADY_AUTHENTICATED,
  LOGIN_USER,
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
        FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(notificationToken => {
          const updates = {};
          updates['/user_profiles/' + user.uid + '/notificationToken'] = notificationToken;

          firebase.database().ref().update(updates);
        });

        dispatch({
          type: ALREADY_AUTHENTICATED,
          payload: {
            token: user.refreshToken,
            uid: user.uid
          }
        });
      } else {
        console.log(`User is not logged in`);
        return;
      }
    });
    AsyncStorage.multiGet(['token', 'uid'])
      .then((data) => {
        if(data[0][1]) {
          token = data[0][1];
          uid = data[1][1];
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
              dispatch({ type: LOGOUT_USER });
            });
        }
        dispatch({ type: LOGOUT_USER });
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
    const keys = ['token', 'uid'];
    AsyncStorage.multiRemove(keys, (error) => {
      console.log(`Unable to remove AsyncStorage with error = ${error}`);
    });
    LoginManager.logOut();
    firebase.auth().signOut()
      .then(() => {
        console.log('Signed out of Firebase');
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
          let profilePics = result1.photos.data || [];

          if (profilePics && profilePics.length > 7) profilePics = profilePics.slice(0,7);

          profilePics.sort((o1,o2) => o2.id - o1.id);

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
        const profileInfo = {};
        profileInfo['/first_name'] = result.first_name || '';
        profileInfo['/last_name'] = result.last_name || '';
        profileInfo['/email'] = result.email || '';
        profileInfo['/location'] = result.location || '';

        const profile = {
         first_name: result.first_name || '',
         last_name: result.last_name || '',
         email: result.email || '',
         location: result.location || '',
        };
        ref.ref(`/user_profiles/${user.uid}`).update(profileInfo);
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
      const exists = (snapshot.val() && snapshot.val().first_name);
      if(exists) {
        Actions.main();
      } else {
        setupUserFirebase(user,ref, accessTokenData, dispatch);
        Actions.profileSetup();
      }
    });
}

const signIntoFirebase = (dispatch, auth, provider, accessTokenData) => {
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
};
