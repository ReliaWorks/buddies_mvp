import _ from 'lodash';
import {
  ALREADY_AUTHENTICATED,
  LOGIN_USER,
  LOGOUT_USER,
  AFFILIATIONS_SAVED,
  ACTIVITIES_SAVED,
  ACTIVITY_SELECTED,
  ACTIVITY_UNSELECTED,
  ACTIVITY_EDITED,
  AFFILIATION_SELECTED,
  AFFILIATION_UNSELECTED,
  CONNECT_WITH_USER,
  CURRENT_USER_FETCH_SUCCESS,
  DESCRIPTION_SAVED,
  SEEN_CONNECTION_HELPER,
  SET_CURRENT_LOCATION,
  SET_CURRENT_GEOLOCATION,
  PHOTOS_SAVED,
  PHOTO_REMOVED,
  PICTURE_SAVED,
  PHOTOS_SELECTED,
  PHOTO_UPLOADED,
  PROFILE_INFO,
  FACEBOOK_ALBUMS_FETCHED,
  FACEBOOK_ALBUM_PHOTOS_REQUESTED,
  FACEBOOK_ALBUM_PHOTOS_FETCHED,
} from '../actions/types';
import { ACTIVE } from '../constants';
import {getAttribute} from '../components/profile-edit/activityAttributeUtils';

const INITIAL_STATE = {
  //isFetched: false,
  uid: '',
  firstName: '',
  email: '',
  age: '',
  profileImages: [],
  profileImagesUploadProgress: [],
  //selectableFacebookPhotos: [],
  facebookAlbums: [],
  facebookAlbumPhotos: [],
  activities: {},
  affiliations: {},
  location: {},
  geolocation: {},
  description: '',
  numTimesConnected: 0,
  numTimesMatched: 0,
  seenConnectionHelper: false,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEEN_CONNECTION_HELPER:
      return { ...state, seenConnectionHelper: true };
    case ALREADY_AUTHENTICATED: {
      return { ...state, uid: action.payload.uid };
    }
    case LOGIN_USER: {
      let id = '';
      if(action.payload) id = action.payload.uid;
      return { ...state, uid: id };
    }
    case CURRENT_USER_FETCH_SUCCESS: {
      const photos = action.payload.profileImages;
      const profileImages = [];
      if(photos) {
        _.map(photos, (img, key) => {
          //if(img.status === ACTIVE) {
            profileImages.push({url: img.url, key: key, type: img.type});
          //}
        });
      }
      const firstName = action.payload.first_name;
      const age = action.payload.age;
      const email = action.payload.email;
      const activities = [];
      if(action.payload.activities) {
        _.forEach(action.payload.activities, (activity) => {
          if(activity) {
            activities.push({
              name: activity.name,
              icon: activity.icon,
              uid: activity.uid,
              attribute: getAttribute(activity.name, activity.attribute)
            });
          }
        });
      }

      const affiliations = [];
      if(action.payload.affiliations) {
        _.forEach(action.payload.affiliations, (affiliation) => {
          if(affiliation) {
            affiliations.push({
              name: affiliation.name,
              icon: affiliation.icon,
              uid: affiliation.uid,
            });
          }
        });
      }

      let description = '';
      if(action.payload.description) description = action.payload.description;
      let numTimesConnected = 0;
      if(action.payload.numTimesConnected)
        numTimesConnected = action.payload.numTimesConnected;
      let numTimesMatched = 0;
      if(action.payload.numTimesMatched)
        numTimesMatched = action.payload.numTimesMatched;

      return {
        ...state,
        firstName,
        profileImages,
        age,
        activities,
        affiliations,
        description,
        email,
        uid: action.payload.uid,
        numTimesConnected,
        numTimesMatched,
        seenConnectionHelper: action.payload.seenConnectionHelper,
      };
    }
    case ACTIVITY_SELECTED: {
      const updatedActivities = [...state.activities, action.payload];
      return { ...state, activities: updatedActivities };
    }
    case ACTIVITY_UNSELECTED: {
      const uid = action.payload.uid;
      const updatedActivityList = state.activities.filter(
        (item) => item.uid !== uid);
      return { ...state, activities: updatedActivityList };
    }
    case ACTIVITIES_SAVED: {
      const updatedActivities = [];
      if(action.payload) {
        _.forEach(action.payload, (activity) => {
          if(activity) {
            updatedActivities.push({
              name: activity.name,
              icon: activity.icon,
              uid: activity.uid,
              attribute: activity.attribute
            });
          }
        });
      }

      return { ...state, activities: updatedActivities };
    }
    case ACTIVITY_EDITED: {
      const {uid, attribute} = action.payload;
      const activities = state.activities.map(activity => {
        if (activity.uid === uid) {
          return {...activity, attribute};
        } else {
          return activity;
        }
      });
      return {...state, activities};
    }
    case AFFILIATION_SELECTED: {
      const updatedAffiliations = [...state.affiliations, action.payload];
      return { ...state, affiliations: updatedAffiliations };
    }
    case AFFILIATION_UNSELECTED: {
      const uid = action.payload.uid;
      const updatedAffiliationList = state.affiliations.filter(
        (item) => item.uid !== uid);
      return { ...state, affiliations: updatedAffiliationList };
    }
    case AFFILIATIONS_SAVED: {
      const updatedAffiliations = [];
      if(action.payload) {
        _.forEach(action.payload, (affiliation) => {
          if(affiliation) {
            updatedAffiliations.push({
              name: affiliation.name,
              icon: affiliation.icon,
              uid: affiliation.uid,
            });
          }
        });
      }

      return { ...state, affiliations: updatedAffiliations };
    }
    case DESCRIPTION_SAVED: {
      return { ...state, description: action.payload };
    }
    case PHOTOS_SAVED: {
      let photos = state.profileImages;
      if(action.payload)
        photos = action.payload;
      return { ...state, profileImages: photos };
    }
    case PHOTO_REMOVED: {
      let updatedProfileImages = state.profileImages;
      if(action.payload) {
        updatedProfileImages = state.profileImages.filter((image) => {
          return(image.key !== action.payload.key);
        });
      }
      return {...state, profileImages: updatedProfileImages};
    }
    case PICTURE_SAVED: {
      let updatedImages = [];
      if(state.profileImages.length) {
        updatedImages = [...state.profileImages, action.payload];
      } else {
        updatedImages.push(action.payload);
      }
      return { ...state, profileImages: updatedImages };
    }
    case PHOTOS_SELECTED: {
      const profileImagesUploadProgress = [...state.profileImagesUploadProgress, action.payload];
      return { ...state, profileImagesUploadProgress };
    }
    case PHOTO_UPLOADED: {
      const profileImagesUploadProgress = state.profileImagesUploadProgress.filter(item => item !== action.payload.localUrl);
      const profileImages = [...state.profileImages, action.payload.photo];
      return { ...state, profileImages, profileImagesUploadProgress };
    }
    case FACEBOOK_ALBUMS_FETCHED: {
      const facebookAlbums = action.payload;
      return { ...state, facebookAlbums };
    }
    case FACEBOOK_ALBUM_PHOTOS_REQUESTED: {
      return { ...state, facebookAlbumPhotos: action.payload };
    }
    case FACEBOOK_ALBUM_PHOTOS_FETCHED: {
      const { id, name, photos } = action.payload;
      let tempPhotos = photos && photos.data
        ? photos.data.map((item) => ({ id: item.id, source: item.images[0].source }))
        : [];

      tempPhotos = [...state.facebookAlbumPhotos.photos, ...tempPhotos];

      return {
        ...state,
        facebookAlbumPhotos: { id, name, photos: tempPhotos }
      };
    }
    case SET_CURRENT_GEOLOCATION: {
      return { ...state, geolocation: action.payload };
    }
    case SET_CURRENT_LOCATION: {
      return { ...state, location: action.payload };
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    case PROFILE_INFO:
      return { ...state, email: action.payload.email, firstName: action.payload.first_name, };
    default:
      return state;
  }
};
