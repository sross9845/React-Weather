import axios from "axios";
import * as actionTypes from "./actionTypes";

const searchLocationsInit = () => {
  return { type: actionTypes.SEARCH_LOCATIONS_INIT };
};

export const searchLocations = city => {
  return async dispatch => {
    dispatch(searchLocationsInit());
    let res;
    try {
      res = await axios.post("/api/locations/name", { city });
      dispatch(searchLocationsSuccess(res.data));
    } catch (e) {
      dispatch(searchLocationsFail(e.response));
    }
  };
};

export const searchReset = () => {
  return { type: actionTypes.SEARCH_RESET };
};

const searchLocationsSuccess = data => {
  return { type: actionTypes.SEARCH_LOCATIONS_SUCCESS, payload: data };
};

const searchLocationsFail = error => {
  return { type: actionTypes.SEARCH_LOCATIONS_FAIL, payload: error };
};
