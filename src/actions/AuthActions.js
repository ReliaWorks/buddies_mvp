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
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER,
  LOGIN_FB_SUCCESS
} from './types';

function setupUserFirebase(user,ref, accessTokenData) {
  const token = accessTokenData.accessToken;

  let counter = 0;
  console.log(token);
  const infoRequest = new GraphRequest(
    '/me',
    {
      parameters: {
        fields: { string: 'id,first_name,last_name,albums{name}' },
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

        ref.ref(`/user_profiles/${user.uid}`).set({ first_name: result.first_name, last_name: result.last_name });

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
                      if (counter > 3) return;
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

                           ref.ref(`/user_profiles/${user.uid}/images/${counter++}`).set({ url: result3.images[0].source });
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

function setImageProfileFirebase(counter, url) {
    console.log(counter);
}

function userExistsCallback(user,ref, exists, accessTokenData) {
  if(exists) {
    console.log('user ' + user.uid + ' exists!');
  } else {
    console.log('user ' + user.uid + ' does not exist!');
    setupUserFirebase(user,ref, accessTokenData);
  }
  Actions.main();
}

function checkIfUserExists(user, ref, accessTokenData) {
  console.log('checkIfUserExists');

  ref.ref(`/user_profiles/${user.uid}`)
    .on('value', snapshot => {
      const exists = (snapshot.val() !== null);
      userExistsCallback(user,ref, exists, accessTokenData);
    });
}

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const auth = firebase.auth();
    const usersRef = firebase.database().ref("user_profiles");
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
              console.log("Go the token");
              signInFirebase(dispatch, auth,provider, accessTokenData);
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
  console.log('in create user');
  dispatch({
    type: CREATE_USER,
    payload: user
  });
  Actions.profileSetup();
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const signInFirebase = (dispatch, auth, provider, accessTokenData) => {
  console.log('accessTokenData');
  console.log(accessTokenData);

  dispatch({
    type: LOGIN_FB_SUCCESS,
    payload: accessTokenData
  });
  const credential = provider.credential(accessTokenData.accessToken);
  console.log('signupCredentials');
  auth.signInWithCredential(credential).then(credData => {
    loginUserSuccess(dispatch, credData, firebase.database(), accessTokenData);
    console.log("Got fire");
  }).catch(err => {
    console.log(err);
  });
};

const loginUserSuccess = (dispatch, user, ref, accessTokenData) => {
    console.log('loginUserSuccess');
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
    console.log('loginUser');
    console.log(accessTokenData);

    checkIfUserExists(user, ref, accessTokenData);
};
