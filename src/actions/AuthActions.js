import { Actions } from 'react-native-router-flux';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import firebase from 'firebase';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_FB_SUCCESS,
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
   },
   (error, result) => {
      if(error) {
        console.log('Error fetching data: ' + error.toString());
      } else {
        console.log("in responseCallback with result = ");
        console.log(result);

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
                console.log('storing photos');
                if (error) {
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
                         if(error) {
                           console.log('Error fetching data: ' + error2.toString());
                         } else {
                           console.log("adding pic");
                           console.log(result3.images);

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

function userExistsCallback(user,ref, exists, accessTokenData, dispatch) {
  console.log("In userExistsCallback");
  if(exists) {
//    Actions.profileSetup();
    Actions.main();
  } else {
    setupUserFirebase(user,ref, accessTokenData, dispatch);
    Actions.profileSetup();
  }
}

function checkIfUserExists(user, ref, accessTokenData, dispatch) {
  ref.ref(`/user_profiles/${user.uid}`)
    .once('value', snapshot => {
      const exists = (snapshot.val() !== null);
      userExistsCallback(user, ref, exists, accessTokenData, dispatch);
    });
}

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const auth = firebase.auth();
    const ref = firebase.database();
    const provider = firebase.auth.FacebookAuthProvider;

    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_photos'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
            .then(accessTokenData => {
//              checkIfUserExists(auth.currentUser.uid, ref, accessTokenData, dispatch);
              signInFirebase(dispatch, auth, provider, accessTokenData);
            });
        }
      },
      (error) => {
        /* When login fails, enters this case.
         * Need to check if user already exists in Firebase.
         * If not, create user and redirect to FTUE
         */
        console.log('Login fail with error: ' + error);
        AccessToken.getCurrentAccessToken()
          .then(accessTokenData => {
            //check to see if user exists in firebase
            console.log("getting token");
            console.log(accessTokenData);
            const credential = provider.credential(accessTokenData.accessToken);
            auth.signInWithCredential(credential);
          });
      }
    );
  };
};

const signInFirebase = (dispatch, auth, provider, accessTokenData) => {
/*  dispatch({
    type: LOGIN_FB_SUCCESS,
    payload: accessTokenData
  });
  */
  const credential = provider.credential(accessTokenData.accessToken);
  auth.signInWithCredential(credential).then(credData => {
    loginUserSuccess(dispatch, credData, firebase.database(), accessTokenData);
    console.log("Got fire");
  }).catch(err => {
    console.log(err);
  });
};

const loginUserSuccess = (dispatch, user, ref, accessTokenData) => {
/*    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
*/
    checkIfUserExists(user, ref, accessTokenData, dispatch);
};
