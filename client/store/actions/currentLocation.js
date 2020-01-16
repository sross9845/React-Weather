import axios from "axios";
import * as actionTypes from "./actionTypes";

const currentLocationInit = () => {
  return { type: actionTypes.CURRENT_LOCATION_INIT };
};

export const getCurrentLocation = (latitude, longitude) => {
  return async dispatch => {
    dispatch(currentLocationInit());
    let res;
    try {
      res = await axios.post("/api/locations/coords", { latitude, longitude });
      dispatch(getCurrentLocationSuccess(res.data[0]));
    } catch (e) {
      dispatch(getCurrentLocationFail(e.response));
    }
  };
};

export const setCurrentLocation = (name, suffix) => {
  return { type: actionTypes.SET_CURRENT_LOCATION, payload: { name, suffix } };
};

const getCurrentLocationSuccess = data => {
  return { type: actionTypes.CURRENT_LOCATION_SUCCESS, payload: data };
};

const getCurrentLocationFail = error => {
  return { type: actionTypes.CURRENT_LOCATION_FAIL, payload: error };
};
