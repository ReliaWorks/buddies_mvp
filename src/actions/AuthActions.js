import { Actions } from 'react-native-router-flux';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import firebase from 'firebase';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  PROFILE_INFO,
  PROFILE_PIC
} from './types';

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
        const fbAlbums = result.albums.data;
        const profileAlbum = fbAlbums.find((album) => {
           return album.name === 'Profile Pictures';
        });

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

        AccessToken.getCurrentAccessToken().then(
          () => {
            const profilePicRequest = new GraphRequest(
              `/${profileAlbum.id}`,
              {
                parameters: {
                  fields: { string: 'photos' },
                  access_token: { string: token.toString() }
                },
              },
              (error1, result1) => {
                if (error1) {
                  console.log('Error fetching data: ' + error1.toString());
                } else{
                  const profilePics = result1.photos.data;
                  profilePics.forEach(
                    (pic) => {
                      const picRequest = new GraphRequest(
                        `/${pic.id}`,
                        {
                          parameters: {
                            fields: { string: 'images' },
                            access_token: { string: token }
                          },
                       },
                       (error2, result3) => {
                         if(error2) {
                           console.log('Error fetching data: ' + error2.toString());
                         } else {
                            dispatch({
                             type: PROFILE_PIC,
                             payload: result3.images[0].source
                           });
                         }
                       }
                      );
                      new GraphRequestManager().addRequest(picRequest).start();
                    }
                  );
                }
              }
            );
            new GraphRequestManager().addRequest(profilePicRequest).start();
          }
        );
     }
   }
  );
  new GraphRequestManager().addRequest(infoRequest).start();
}

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
              dispatch({ type: LOGIN_USER });
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
    dispatch({
      type: LOGOUT_USER,
    });
    LoginManager.logOut();
    console.log("Logged out of Facebook");
    firebase.auth().signOut().then(() => {
      Actions.root();
    }, (error) => {
      console.log(`Error signing out of Firebase ${error}`);
    });
  };
};

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
  const credential = provider.credential(accessTokenData.accessToken);
  auth.signInWithCredential(credential)
    .then(credData => {
      checkIfUserExists(credData, firebase.database(), accessTokenData, dispatch);
    }).catch(err => {
    console.log(`Error signing into Firebase ${err}`);
  });
};
