import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import firebase from 'firebase';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import {
  ALREADY_AUTHENTICATED,
  LOGIN_USER,
  LOGOUT_USER,
  PROFILE_INFO,
  PICTURE_SAVED,
  LOGIN_USER_REQUESTED,
  LOGIN_USER_CANCELLED
} from './types';
import { CURRENT_APP_VERSION } from '../constants';
import { currentUserFetch } from './BrowseActions';
import { getCurrentPosition } from './LocationActions';

let onAuthStateChangedUnSubscriber = null;

const checkIfAlreadyLoggedInInner = (dispatch) => {
  dispatch({ type: LOGOUT_USER }); //added this to fix app crashing bugs on start

  onAuthStateChangedUnSubscriber = firebase.auth().onAuthStateChanged(user => {
    if(user) {
      getCurrentPosition({uid: user.uid, hasLocation: false}, dispatch);
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

      AccessToken.getCurrentAccessToken()
        .then(accessTokenData => {
          checkIfUserExists(accessTokenData, dispatch);
        });
    } else {
      Actions.login();
    }
  });
};

export const checkIfAlreadyLoggedIn = () => {
  return(dispatch) => {
    wasThereAnAppUpdate()
      .then(() => {
        AsyncStorage.clear(() => { //clears asyncstorage to avoid bugs
          AsyncStorage.setItem('CURRENT_APP_VERSION', CURRENT_APP_VERSION, () => {
            checkIfAlreadyLoggedInInner(dispatch);
          });
        });
      })
      .catch(() => {
        checkIfAlreadyLoggedInInner(dispatch);
      });
  };
};

/**
 * Checks if the storage app version matches what it is in CURRENT_APP_VERSION
 */
const wasThereAnAppUpdate = () => {
  const promise = new Promise((resolve, reject) => {
    AsyncStorage.getItem('CURRENT_APP_VERSION')
      .then((result) => {
        const value = result || null;
        if (result !== CURRENT_APP_VERSION) {
          resolve();
        } else reject();
      })
      .catch(() => {
        reject();
      });
  });

  return promise;
};

export const loginUser = () => {
  return (dispatch) => {
    const auth = firebase.auth();
    const provider = firebase.auth.FacebookAuthProvider;

    dispatch({ type: LOGIN_USER_REQUESTED });

    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_photos'])
      .then((result) => {
        if (result.isCancelled) {
          dispatch({ type: LOGIN_USER_CANCELLED });
        } else {
          AccessToken.getCurrentAccessToken()
            .then(accessTokenData => {
              const credential = provider.credential(accessTokenData.accessToken);
              auth.signInWithCredential(credential)
                .then(credData => {
//                  getCurrentPosition({uid: auth.currentUser.uid}, dispatch);
                })
                .catch(err => {
                  alert("Unable to log in. Try again later.");
                  console.log(`Error signing into Firebase ${err.code}: ${err.message}`);
              });
            });
        }
      }, (error) => {
        console.log(`In AuthActions loginUser. Error = ${error}`);
        dispatch({ type: LOGIN_USER_CANCELLED });
      }
    );
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    if (onAuthStateChangedUnSubscriber) {
      onAuthStateChangedUnSubscriber();
    }
    _logoutUser(dispatch);
  };
};

export const deactivateUser = () => {
  return (dispatch) => {
    const { uid } = firebase.auth().currentUser;
    toggleUserStatus(uid, 'INACTIVE')
    .then(() => {
      _logoutUser(dispatch);
    });
  };
};

const _logoutUser = (dispatch) => {
  LoginManager.logOut();
  dispatch({ type: LOGOUT_USER });
  firebase.auth().signOut()
    .then(() => {
      Actions.root();
    }, (error) => {
      console.log(`Error signing out of Firebase ${error}`);
  });
};

const toggleUserStatus = (uid, status) => {
  const updates = {};

  return firebase.database().ref(`message_center/${uid}`).once('value').then(snap => {
    snap.forEach(connection => {
      updates[`message_center/${connection.key}/${uid}/status`] = status;
    });

    updates[`user_profiles/${uid}/status`] = status;

    return firebase.database().ref().update(updates);
  });
};

function fetchProfilePhotos(result, dispatch, token) {
  const {uid} = firebase.auth().currentUser;

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
          let profilePics = result1.photos ? result1.photos.data || [] : [];

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
                const newProfileImageRef = firebase.database().ref(`user_profiles/${uid}/profileImages/`).push();
                newProfileImageRef.set({
                  url: result3.images[0].source,
                  type: 'FB'
                }).then(() => {
                  dispatch({type: PICTURE_SAVED, payload: result3.images[0].source});
                });
              }
            });

            new GraphRequestManager().addRequest(picRequest).start();
          });
        }
      });

      new GraphRequestManager().addRequest(profilePicRequest).start();
    });
  }
}

function setupUserFirebase(accessTokenData, dispatch) {
  const token = accessTokenData.accessToken;

  const infoRequest = new GraphRequest(
    '/me',
    {
      parameters: {
        fields: { string: 'id, first_name, last_name, location, email, birthday, albums{name}' },
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
        profileInfo['/status'] = 'ACTIVE';

        const profile = {
         first_name: result.first_name || '',
         last_name: result.last_name || '',
         email: result.email || '',
         location: result.location || '',
         status: 'ACTIVE'
        };

        firebase.database().ref(`/user_profiles/${firebase.auth().currentUser.uid}`).update(profileInfo);

        dispatch({
          type: PROFILE_INFO,
          payload: profile
        });

        fetchProfilePhotos(result, dispatch, token);
      }
    }
  );

  new GraphRequestManager().addRequest(infoRequest).start();
}

function checkIfUserExists(accessTokenData, dispatch) {
  const user = firebase.auth().currentUser;

  firebase.database().ref(`/user_profiles/${user.uid}`)
    .once('value', snapshot => {
      const exists = (snapshot.val() && snapshot.val().first_name);
      if(exists) {
        reactivateAccountIfDeactivated(snapshot.key, snapshot.val().status)
        .then(() => {
          dispatch({ type: LOGIN_USER, payload: user.uid });
          Actions.main();
        });
      } else {
        setupUserFirebase(accessTokenData, dispatch);
        Actions.profileSetup();
        dispatch({ type: LOGIN_USER, payload: user.uid });
      }
    });
}

const reactivateAccountIfDeactivated = (uid, status) => {
  if (status === 'INACTIVE') {
    return toggleUserStatus(uid, 'ACTIVE');
  } else {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
};
