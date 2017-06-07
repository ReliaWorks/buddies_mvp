import firebase from 'firebase';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  POTENTIALS_FETCH,
  POTENTIALS_FETCH_SUCCESS,
  POTENTIALS_ADD_SUCCESS,
  CONNECT_WITH_USER,
  CONNECTION_SUCCESSFUL,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_CHAT_FETCH,
  KEEP_BROWSING,
  SET_CURRENT_GEOLOCATION,
  SET_CURRENT_LOCATION,
  LOCATION_MAP_STORAGE_KEY,
  CURRENT_USER_FETCH_START,
  API_SECRET_KEY,
  SET_NEW_NOTIFICATION,
  IMAGE_LOADED,
} from './types';
import { MAP_API_KEY } from '../config';
import { DEFAULT_PROFILE_PHOTO, LIMIT_RECORDS_LOCATION, WEIGHTS_PROXIMITY_INDEX } from '../constants';

const jsSHA = require("jssha");

const stringToVariable = (str) => {
  if (str)
   return str.replace(/\s+/g, '_').replace(/[^0-9a-z_]/gi, '').toLowerCase();
  return str;
};

export const checkNotifications = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/notifications/new/${currentUser.uid}`)
      .on('value', snapshot => {
          dispatch({ type: SET_NEW_NOTIFICATION, payload: { notification: snapshot.val() } });
    });
  };
};

const degreesToRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const getGeoDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const lat1d = degreesToRadians(lat1);
  const lat2d = degreesToRadians(lat2);

  const a = (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
          (Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1d) * Math.cos(lat2d));

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

const numberCommonAffiliations = (user1, user2) => {
  const affiliations1 = Object.keys(user1.affiliations);
  const affiliations2 = Object.keys(user2.affiliations);
  const intersection = affiliations1.filter((n) => {
    return affiliations2.indexOf(n) !== -1;
  });

  return intersection.length;
};

const numberCommonActivities = (user1, user2) => {
  const activities1 = Object.keys(user1.activities);
  const activities2 = Object.keys(user2.activities);
  const intersection = activities1.filter((n) => {
    return activities2.indexOf(n) !== -1;
  });

  return intersection.length;
};

const sameGenderIndex = (user1, user2) => {
  return (user1.gender && user2.gender && user1.gender == user2.gender) ? 1 : 0;
};

const getProximityIndex = (user1, user2, areaIndexValue) => {
    //proxIndex =  W1 Area + W2 LocProx +  W3 commonAffil + W4 commonAct + W5 genderCommon
    //where W1 + .. + Wn = 1
    const { WEIGHT_AREA,
            WEIGHT_GEO_PROX,
            WEIGHT_COMMON_AFFILIATION,
            WEIGHT_COMMON_ACTIVITIES,
            WEIGHT_COMMON_GENDER } = WEIGHTS_PROXIMITY_INDEX;

    const proxIndex = (WEIGHT_AREA * areaIndexValue) +
                      (WEIGHT_GEO_PROX * getGeoDistance(user1.position.latitude, user1.position.longitude, user2.position.latitude, user2.position.longitude)) +
                      (WEIGHT_COMMON_AFFILIATION * numberCommonAffiliations(user1, user2)) +
                      (WEIGHT_COMMON_ACTIVITIES * numberCommonActivities(user1, user2)) +
                      (WEIGHT_COMMON_GENDER * sameGenderIndex(user1, user2));

    return Math.round(proxIndex);
};

const getLocationArea = (fb, dispatch, currentUser, path, lastAreaRecordId, areaIndexValue) => {
  console.log('Path getLocationArea: ', path);
  const promise = new Promise((resolve, reject) => {
    const ref = fb.ref(path).orderByKey;

    if (lastAreaRecordId) {
      ref.startAt(lastAreaRecordId);
    }else{
      ref.limitToFirst(LIMIT_RECORDS_LOCATION);
    }

    ref.once('value', snapshot => {
       const data = snapshot.val();
       if (data) {
         const keys = Object.keys(data);

         if (keys.length)
           resolve();
         else
           reject();

         keys.forEach((key) => {
           //get other user
           const otherUserId = data[key];

           if (currentUser.uid == otherUserId)
            return;

           fb.ref(`user_profiles/${otherUserId}`).once('value', snap => {
             const otherUser = {...snap.val(), uid: otherUserId};
             if (snap.val()) {
               fb.ref(`user_matches/${currentUser.uid}/${otherUserId}`).once('value', (snap2) => {
                  //is not in user matches already
                  if (!snap2.val()) {
                    const proximityIndex = getProximityIndex(currentUser, otherUser, areaIndexValue);
                    const obj = {index: proximityIndex, user: otherUser};
                    dispatch({
                      type: POTENTIALS_ADD_SUCCESS,
                      payload: obj
                    });
                  }
               });
             }
           });
         });
       }else {
         reject();
       }
    });
  });

  return promise;
};

export const potentialsFetchRT = (currentUser) => {
    return (dispatch) => {
      debugger;
      const lastAreaRecordId = null; //get from state
      const location = currentUser.location;

      if (!location) return;

      const pathNeighborhood = `location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/counties/${stringToVariable(location.county)}/cities/${stringToVariable(location.city)}/neighborhoods/${stringToVariable(location.neighborhood)}/users/${currentUser.uid}`;
      const pathCity = `location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/counties/${stringToVariable(location.county)}/users`;
      const pathCounty = `location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/counties/${stringToVariable(location.county)}/cities/${stringToVariable(location.city)}/users`;
      const pathState = `location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/counties/${stringToVariable(location.county)}/cities/${stringToVariable(location.city)}/neighborhoods/${stringToVariable(location.neighborhood)}/users`;

      //Get neighborhood
      getLocationArea(firebase.database(), dispatch, currentUser, pathNeighborhood, lastAreaRecordId, 10000).then(() => {
          //
      })
      .catch(() => {
          getLocationArea(firebase.database(), dispatch, currentUser, pathCity, lastAreaRecordId, 10000).then(() => {
              //
          })
          .catch(() => {
            getLocationArea(firebase.database(), dispatch, currentUser, pathCounty, lastAreaRecordId, 10000).then(() => {
                //
            })
            .catch(() => {
              getLocationArea(firebase.database(), dispatch, currentUser, pathState, lastAreaRecordId, 10000).then(() => {
                  //
              })
              .catch(() => {

              });
            });
          });
      });
    };
};

export const potentialsFetch = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    const potentials = [];

    const shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(API_SECRET_KEY + currentUser.uid);
    const hash = shaObj.getHash("HEX");
    console.log("API hash", hash);

    dispatch({type: POTENTIALS_FETCH});
    console.log(`In potentialsFetch. CurrentUser.uid = ${currentUser.uid}`);
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

export const setLocation = (currentUser, location) => {
  const uid = currentUser.uid;
  const db = firebase.database();
  db.ref(`user_profiles/${uid}/location`).set(location);
  setCurrentUserLocationFB(db, uid, location);
};

export const setGeolocation = (uid, geoLocation) => {
  firebase.database().ref(`user_profiles/${uid}/geoLocation`).set(geoLocation);
};

const clearUserLastLocationFB = (db, uid, numberNewRecords) => {
  const thisPromise = new Promise((resolve) => {
    if (numberNewRecords == 0)
      resolve();
    else{
      db.ref(`last_location_path/${uid}`).remove(() => { resolve(); });
    }
  });
  return thisPromise;
};

const setCurrentUserLocationFB = (db, uid, location) => {
  const keys = Object.keys(location);
  const objPaths = [];

  if (location.country && location.state)
    objPaths.push(`location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/users/${uid}`);
  else
    return;

  if (location.county)
    objPaths.push(`location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/counties/${stringToVariable(location.county)}/users/${uid}`);

  if (location.county && location.city)
    objPaths.push(`location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/counties/${stringToVariable(location.county)}/cities/${stringToVariable(location.city)}/users/${uid}`);

  if (location.county && location.city && location.neighborhood)
    objPaths.push(`location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/counties/${stringToVariable(location.county)}/cities/${stringToVariable(location.city)}/neighborhoods/${stringToVariable(location.neighborhood)}/users/${uid}`);

  clearUserLastLocationFB(db, uid, objPaths.length).then(() => {
    objPaths.forEach((path) => {
      db.ref(path).set(true);
    });
    db.ref(`last_location_path/${uid}`).set(objPaths);
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

export const getCityStateCountryMapAPI = (uid, position, dispatch) => {

    //const promise = new Promise((resolve, reject) => {
      const shaObj = new jsSHA("SHA-256", "TEXT");
      shaObj.update(position.latitude + position.longitude);
      const locationHash = shaObj.getHash("HEX");
      firebase.database().ref(`location_cache/${locationHash}`).once('value', snapshot => {
            //const cacheExists = snapshot.val() !== null;
            const cacheExists=false;
            if (cacheExists) {
              console.log('Found in cache');
              setStateWithLocation(uid, position, dispatch, snapshot.val());
              resolve(snapshot.val());
            }else{
              console.log('Not in the cache');
              getLocationFromGoogleMapAPI(locationHash, position.latitude, position.longitude)
                .then((location) => {
                  setStateWithLocation(uid, position, dispatch, location);
                  console.log('Got location from MAP', location);
                  resolve(location);
                })
                .catch((e) => {
                  console.log("Was Unabled to return location from Google");
                  reject(e);
                });
            }
      }).catch((e) => {
        console.log('Error connecting FB:', e);
        reject(e);
      });
      /*
    });
    return promise;*/
};

const setStateWithLocation = (uid, position, dispatch, data) => {
  dispatch({ type: SET_CURRENT_LOCATION, payload: data });
  setLocationLocalStorage(position,data);
  setLocation(uid, data);
};

export const getCityStateCountry = (currentUser, position, dispatch) => {
    const promise = new Promise((resolve, reject) => {
      const uid = currentUser.uid;

      if (!(position && position.latitude && position.longitude)) reject();
      console.log('Check local');

      AsyncStorage.getItem(LOCATION_MAP_STORAGE_KEY)
        .then((val) => {
          const value = JSON.parse(val);
          let location = value[position.latitude + '' + position.longitude]; location = null;
          if (value && location && location.city) {
            dispatch({ type: SET_CURRENT_LOCATION, payload: location });
            setLocation(currentUser, location);
            resolve(location);
          } else{
            getCityStateCountryMapAPI(uid, position, dispatch);
          }
        })
        .catch(() => {
          getCityStateCountryMapAPI(uid, position, dispatch);
        });
    });
    return promise;
};

export const currentUserFetch = (callback) => {
  const { currentUser } = firebase.auth();
  console.log('currentUser',currentUser.uid);
  return (dispatch) => {
    dispatch({ type: CURRENT_USER_FETCH_START })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        setGeolocation(currentUser.uid, position);

        getCityStateCountry(currentUser, position.coords, dispatch);

        dispatch({ type: SET_CURRENT_GEOLOCATION, payload: initialPosition });
      }
    );

    firebase.database().ref(`/user_profiles/${currentUser.uid}`)
      .once('value', snapshot => {
        dispatch({ type: CURRENT_USER_FETCH_SUCCESS, payload: {...snapshot.val(), uid: currentUser.uid } });
      });
  };
};

export const imageLoaded = () => {
  return {
    type: IMAGE_LOADED
  };
};

export const connectWithUser = (currentUser, buddy, connectStatus) => {
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
            otherUserName: buddy.name,
            otherUserPic: buddy.pic.url,
            liked: connectStatus,
            matched: (otherUserLikesYouToo && connectStatus),
            matchedDate: firebase.database.ServerValue.TIMESTAMP,
          });
          if(connectStatus && otherUserLikesYouToo) {
            successfullyConnected(dispatch, buddy, currentUser);
          } else keepBrowsing(dispatch);
      });
  };
};

export const keepBrowsing = () => {
  return ({ type: KEEP_BROWSING });
};

const getLocationFromGoogleMapAPI = function (locationHash, latitude, longitude) {
  const promise = new Promise((resolve, reject) => {
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
            resolve(location);
        }else{
          console.log('Data',response.data);
          reject();
        }
      })
      .catch((error) => {
        reject();
        console.log(error);
      });
  });
  return promise;
};

const successfullyConnected = (dispatch, buddy, currentUser) => {
  let profileImage = DEFAULT_PROFILE_PHOTO;
  if(currentUser && currentUser.profileImages && currentUser.profileImages.length > 0)
    profileImage = currentUser.profileImages[0].url;

  firebase.database().ref(`user_matches/${buddy.uid}/${currentUser.uid}`).update({matched: true});
  firebase.database().ref(`/notifications/new/${buddy.uid}`).set(true);
  firebase.database().ref(`user_matches/${currentUser.uid}/${buddy.uid}/seen`).set(true);

  const convRef = firebase.database().ref(`conversations`).push();
  const convKey = convRef.getKey();
  firebase.database().ref(`message_center/${currentUser.uid}/${buddy.uid}/`)
    .set({status: 'ACTIVE', otherUserName: buddy.name, otherUserPic: buddy.pic.url, conversationId: convKey, matchedDate: firebase.database.ServerValue.TIMESTAMP});
  firebase.database().ref(`message_center/${buddy.uid}/${currentUser.uid}/`)
    .set({status: 'ACTIVE', otherUserName: currentUser.firstName, otherUserPic: profileImage, conversationId: convKey, matchedDate: firebase.database.ServerValue.TIMESTAMP})
    .then(() => {
      dispatch({ type: CURRENT_CHAT_FETCH, payload: { chatId: convKey, messages: [], justConnected: true }});
  });

  dispatch({
    type: CONNECTION_SUCCESSFUL
  });
  Actions.connection();
};
