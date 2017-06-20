import React from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import {
  CURRENT_USER_FETCH_SUCCESS,
  LOCATION_MAP_STORAGE_KEY,
  SET_CURRENT_GEOLOCATION,
  SET_CURRENT_LOCATION,
} from './types';
import { MAP_API_KEY } from '../config';

export const getCurrentPosition = (currentUser, dispatch) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("position: ", position);
      const initialPosition = JSON.stringify(position);
      firebase.database().ref(`user_profiles/${currentUser.uid}/geoLocation`).set(position);

      getCityStateCountry(currentUser, position.coords, dispatch)
        .then((location) => {
          firebase.database().ref(`/user_profiles/${currentUser.uid}`)
            .once('value', snapshot => {
              const user = snapshot.val();
              user.location = location;
              user.geoLocation = position;
              user.uid = currentUser.uid;
              dispatch({ type: CURRENT_USER_FETCH_SUCCESS, payload: {...user } });
            });
        })
        .catch(() => {
          console.log("Wasn't able to get the city, state info");
        });

      dispatch({ type: SET_CURRENT_GEOLOCATION, payload: initialPosition });
    }
  );
}
const stringToVariable = (str) => {
  if (str)
   return str.replace(/\s+/g, '_')
          .replace(/\++/g, '')
          .replace(/\-+/g, 'N')
          .replace(/[^0-9a-z_]/gi, '')
          .toLowerCase();
  return str;
};

export const setLocation = (uid, location) => {
  const db = firebase.database();
  db.ref(`user_profiles/${uid}/location`).set(location);
  setCurrentUserLocationFB(db, uid, location);
};

const clearUserLastLocationFB = (db, uid, numberNewRecords) => {
  const thisPromise = new Promise((resolve) => {
    if (numberNewRecords == 0)
      resolve();
    else{
      const ref = db.ref(`last_location_path/${uid}`);
      ref.once('value', snapshot => {
        const data = snapshot.val();
        if(data) {
          const keys = Object.keys(data);
          keys.forEach((key) => {
            const path = data[key];
            db.ref(path).remove();
          });
        }
        ref.remove(() => {
          resolve();
        });
      })
      .catch(() => {
        resolve();
      });
    }
  });
  return thisPromise;
};

function getCityStateCountry(currentUser, position, dispatch) {
  const promise = new Promise((resolve, reject) => {
    const uid = currentUser.uid;
    if (!(position && position.latitude && position.longitude)) reject();
    AsyncStorage.getItem(LOCATION_MAP_STORAGE_KEY)
      .then((val) => {
        const value = JSON.parse(val);
        const location = value[position.latitude + '' + position.longitude];
        if (value && location && location.city) {
          dispatch({ type: SET_CURRENT_LOCATION, payload: location });
          setLocation(uid, location);
          resolve(location);
        } else {
          getCityStateCountryMapAPI(uid, position, dispatch)
            .then((location) => {
              resolve(location);
            })
            .catch(() => {
              reject();
            });
        }
      })
      .catch(() => {
        getCityStateCountryMapAPI(uid, position, dispatch)
          .then((location) => {
            resolve(location);
          })
          .catch(() => {
            reject();
          });
      });
  });
  return promise;
};

const setCurrentUserLocationFB = (db, uid, location) => {
  const keys = Object.keys(location);
  const objPaths = [];

  if (location.country)
    objPaths.push(`location_areas/countries/${stringToVariable(location.country)}/users/${uid}`);
  else
    return;

  if (location.country && location.state)
    objPaths.push(`location_areas/countries/${stringToVariable(location.country)}/states/${stringToVariable(location.state)}/users/${uid}`);

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
  const promise = new Promise((resolve, reject) => {
      const locationHash = stringToVariable('' + position.latitude + position.longitude);
      firebase.database().ref(`location_cache/${locationHash}`).once('value', snapshot => {
            const cacheExists = snapshot.val() !== null;
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
    });
    return promise;
};

const setStateWithLocation = (uid, position, dispatch, data) => {
  dispatch({ type: SET_CURRENT_LOCATION, payload: data });
  setLocationLocalStorage(position,data);
  setLocation(uid, data);
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
