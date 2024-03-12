import { API_URL } from '../config';
import axios from 'axios';
import initialState from './initialState';
//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find(ad => ad._id === id);

// actions
const createActionName = actionName => `app/ads/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOADS_ADS = createActionName('LOADS_ADS');
const EDIT_AD = createActionName('EDIT_AD');
const ADD_AD = createActionName('ADD_AD');
const REMOVE_AD = createActionName('REMOVE_AD');
// action creators
export const startRequest = payload => ({ type: START_REQUEST, payload });
export const endRequest = payload => ({ type: END_REQUEST, payload });
export const errorRequest = payload => ({ type: ERROR_REQUEST, payload });

export const getDataAds = payload => ({ type: LOADS_ADS, payload });
export const editAd = payload => ({ type: EDIT_AD, payload });
export const addAd = payload => ({ type: ADD_AD, payload });
export const removeAd = payload => ({ type: REMOVE_AD, payload });

export const fetchAds = () => {
  return dispatch => {
    fetch(API_URL + '/ads')
      .then(res => res.json())
      .then(ads => dispatch(getDataAds(ads)));
  };
};

export const addAdRequest = data => {
  return async dispatch => {
    dispatch(startRequest({ name: ADD_AD }));
    try {
      let res = await axios.post(`${API_URL}/ads`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(addAd(res.data));
      dispatch(fetchAds());
      dispatch(endRequest({ name: ADD_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: ADD_AD, error: e.message }));
    }
  };
};

export const editAdRequest = (data, id) => {
  return async dispatch => {
    dispatch(startRequest({ name: EDIT_AD }));
    try {
      let res = await axios.put(`${API_URL}/ads/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(editAd(res.data));
      dispatch(fetchAds());
      dispatch(endRequest({ name: EDIT_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: EDIT_AD, error: e.message }));
    }
  };
};

export const removeAdRequest = id => {
  return async dispatch => {
    dispatch(startRequest({ name: EDIT_AD }));
    try {
      await axios.delete(`${API_URL}/ads/${id}`, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      await dispatch(removeAd(id));
      dispatch(endRequest({ name: EDIT_AD }));
    } catch (e) {
      console.error('Error:', e);
      dispatch(errorRequest({ name: EDIT_AD, error: e.message }));
    }
  };
};

const adsReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case LOADS_ADS:
      return [...action.payload];
    case ADD_AD:
      return [...statePart, { ...action.payload }];
    case EDIT_AD:
      return statePart.map(ad =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    case REMOVE_AD:
      return statePart.filter(ad => ad._id !== action.payload);
    default:
      return statePart;
  }
};
export default adsReducer;
