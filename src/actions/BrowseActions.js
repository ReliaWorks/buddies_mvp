import firebase from 'firebase';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  CONNECT_WITH_USER,
  CONNECTION_SUCCESSFUL,
  CURRENT_USER_FETCH_SUCCESS,
  KEEP_BROWSING,
  SET_CURRENT_GEOLOCATION,
  SET_CURRENT_LOCATION,
  LOCATION_MAP_STORAGE_KEY,
  API_SECRET_KEY,
  SET_NEW_NOTIFICATION
} from './types';

const jsSHA = require("jssha");

export const checkNotifications = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/notifications/new/${currentUser.uid}`)
      .on('value', snapshot => {
          dispatch({ type: SET_NEW_NOTIFICATION, payload: { notification: snapshot.val() } });
    });
  };
};

export const potentialsFetch = () => {
  console.log('Entering potentialsFetch');
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    const potentials = [];

    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(API_SECRET_KEY + currentUser.uid);
    const hash = shaObj.getHash("HEX");
    console.log("API hash", hash);

    dispatch({type: POTENTIALS_FETCH});
    axios.get(`https://activities-test-a3871.appspot.com/match/${currentUser.uid}`, {
      headers: { authorization: `${hash}:${currentUser.uid}`}
    })
      .then(response => {
        const keys = Object.keys(response.data);
        keys.forEach((key) => {
          const dataWithId = {...response.data[key], uid: key};
          potentials.push(dataWithId);
        });
        dispatch({
          type: POTENTIALS_FETCH_SUCCESS,
          payload: potentials
        });
      }, (error) => {
        console.log(`API not responding.  Error = ${error}`);
    });
    console.log("Exiting potentials fetch");
  };
};

export const setLocation = (uid, location) => {
  firebase.database().ref(`user_profiles/${uid}/location`).set(location);
};

export const setGeolocation = (uid, geoLocation) => {
  firebase.database().ref(`user_profiles/${uid}/geoLocation`).set(geoLocation);
};

export const setLocationLocalStorage = (position, location) => {
  AsyncStorage.getItem(LOCATION_MAP_STORAGE_KEY)
    .then((result) => {
      const value = result || {};
      const keys = Object.keys(value);
      //Keeps cache at a max of 20 items
      if (keys.length > 20) {
        const firstKey = keys[0];
        delete value[firstKey];
      }

      value[position.latitude + '' + position.longitude] = location;
      AsyncStorage.setItem(LOCATION_MAP_STORAGE_KEY, JSON.stringify(value));
    });
};

export const getCityStateCountryMapAPI = (uid, position, emptyLocation, dispatch) => {
  const shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update(API_SECRET_KEY + uid);
  const hash = shaObj.getHash("HEX");
  console.log("MAP hash", hash);

  axios.get(`https://activities-test-a3871.appspot.com/location/${position.latitude}:${position.longitude}`,{
    headers: { authorization: `${hash}:${uid}`}
  })
  .then(response => {
    dispatch({ type: SET_CURRENT_LOCATION, payload: response.data });
    setLocationLocalStorage(position,response.data);
    setLocation(uid, response.data);
  })
  .catch(error => {
    console.log(error);
  });
};

export const getCityStateCountry = (uid, position, dispatch) => {
  let location = { city: '', state: '', country: ''};

  if (!(position && position.latitude && position.longitude)) return;
  console.log('Check local');

  AsyncStorage.getItem(LOCATION_MAP_STORAGE_KEY)
    .then((val) => {
      const value = JSON.parse(val);
      location = value[position.latitude + '' + position.longitude];
      if (value && location && location.city) {
        dispatch({ type: SET_CURRENT_LOCATION, payload: location });
        setLocation(uid, location);
      }else{
        getCityStateCountryMapAPI(uid, position, location, dispatch);
      }
    })
    .catch(() => {
      getCityStateCountryMapAPI(uid, position, location, dispatch);
    });
};

export const currentUserFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        getCityStateCountry(currentUser.uid, position.coords, dispatch);
        dispatch({ type: SET_CURRENT_GEOLOCATION, payload: initialPosition });
        setGeolocation(currentUser.uid, position);
      }
    );
    firebase.database().ref(`/user_profiles/${currentUser.uid}`)
      .once('value', snapshot => {
        dispatch({ type: CURRENT_USER_FETCH_SUCCESS, payload: {...snapshot.val(), uid: currentUser.uid } });
      });
  };
};

export const connectWithUser = (buddy, connectStatus) => {
  const { currentUser } = firebase.auth();

  return(dispatch) => {
    dispatch({
      type: CONNECT_WITH_USER,
      payload: { uid: buddy.uid, name: buddy.name, pic: buddy.pic.url, index: buddy.index }
    });

    const matches = firebase.database();
    matches.ref(`user_matches/${buddy.uid}/${currentUser.uid}`)
      .once('value', snapshot => {
        let otherUserLikesYouToo = false;
        if(snapshot.val()) otherUserLikesYouToo = snapshot.val().liked;

        matches.ref(`user_matches/${currentUser.uid}/${buddy.uid}`)
          .set({
            currentUserId: currentUser.uid,
            otherUserId: buddy.uid,
            otherUserName: buddy.name,
            otherUserPic: buddy.pic.url,
            liked: connectStatus,
            matched: (otherUserLikesYouToo && connectStatus),
          });
          if(connectStatus && otherUserLikesYouToo) {
            successfullyConnected(dispatch, buddy.uid, currentUser.uid);
          } else keepBrowsing(dispatch);
      });
  };
};

export const keepBrowsing = () => {
  return ({ type: KEEP_BROWSING });
};

const successfullyConnected = (dispatch, uid, currentUserId) => {
  console.log("successfullyConnected");
  firebase.database().ref(`user_matches/${uid}/${currentUserId}`)
    .update({matched: true});

  firebase.database().ref(`/notifications/new/${uid}`).set(true);

  dispatch({
    type: CONNECTION_SUCCESSFUL
  });
  Actions.connection();
};
