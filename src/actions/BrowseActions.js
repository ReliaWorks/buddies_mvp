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
import { MAP_API_KEY } from '../config';

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

const clearUserLastLocationFB = (uid, position) => {
  //check on last_location_path

  firebase.database().ref(`last_location_path/${uid}`).once('value', snapshot => {
        const paths = snapshot.val();
        if (paths !== null) {
          //foreach path remove from last location
          // const keys = Object.keys(paths);
          // keys.forEach((key) => {
          //   const dataWithId = {...response.data[key], uid: key};
          //   potentials.push(dataWithId);
          // });
        }
  }).catch((e) => {
    console.log('clearUserLastLocationFB Error:', e);
  });
};

const setUserLastLocationFB = (uid, position) => {
  const keys = Object.keys(position);
  keys.forEach((key) => {
    const value = position[key];
    if (value) {

    }
  });
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
  shaObj.update(position.latitude + position.longitude);
  const locationHash = shaObj.getHash("HEX");
  firebase.database().ref(`location_cache/${locationHash}`).once('value', snapshot => {
        const cacheExists = snapshot.val() !== null;
        if (cacheExists) {
          console.log('Found in cache');
          setStateWithLocation(uid, dispatch, position, snapshot.val());
        }else{
          console.log('Not in the cache');
          getLocationFromGoogleMapAPI(locationHash, position.latitude, position.longitude);
        }
  }).catch((e) => {
    console.log('Error connecting FB:', e);
  });
};

const setStateWithLocation = (uid, dispatch, position, data) => {
  dispatch({ type: SET_CURRENT_LOCATION, payload: data });
  setLocationLocalStorage(position,data);
  setLocation(uid, data);
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
      } else{
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

const getLocationFromGoogleMapAPI = function (locationHash, latitude, longitude) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API_KEY}`)
    .then((response) => {
      if (response.data
            && response.data.results
            && response.data.results.length
            && response.data.results[0].address_components
            && response.data.results[0].address_components.length
          ) {
          const addressComponents = response.data.results[0].address_components;

          const location = {
            city: '',
            state: '',
            country: '',
            county: '',
            neighborhood: ''
          };

          for (let i = 0; i < addressComponents.length; i++) {
              const component = addressComponents[i];
              console.log(component);
              switch(component.types[0]) {
                  case 'locality':
                      location.city = component.long_name;
                      break;
                  case 'political':
                      if (!location.city)
                        location.city = component.long_name;
                      break;
                  case 'neighborhood':
                      location.neighborhood = component.short_name || '';
                      break;
                  case 'administrative_area_level_1':
                      location.state = component.short_name;
                      break;
                  case 'administrative_area_level_2':
                      location.county = component.short_name;
                      break;
                  case 'country':
                      location.country = component.long_name;
                      break;
                  default:
                      break;
              }
          }
          firebase.database().ref(`location_cache/${locationHash}`).set(location);
      }else {
        console.log('Data',response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const successfullyConnected = (dispatch, uid, currentUserId) => {
  console.log("successfullyConnected");
  firebase.database().ref(`user_matches/${uid}/${currentUserId}`)
    .update({matched: true});

  firebase.database().ref(`/notifications/new/${uid}`).set(true);
  firebase.database().ref(`user_matches/${currentUserId}/${uid}/seen`).set(true);

  dispatch({
    type: CONNECTION_SUCCESSFUL
  });
  Actions.connection();
};
