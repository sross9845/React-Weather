import * as actionTypes from "./actionTypes";
import axios from "axios";

const getForecastsInit = () => {
  return {
    type: actionTypes.GET_FORECASTS_INIT
  };
};

export const getForecasts = (latitude, longitude) => async dispatch => {
  dispatch(getForecastsInit());
  let res;
  try {
    res = await axios.post("/api/forecasts", { latitude, longitude });
    dispatch(getForecastsSuccess(res.data));
  } catch (e) {
    dispatch(getForecastsFail(e.response));
  }
};

const getForecastsSuccess = data => {
  return {
    type: actionTypes.GET_FORECASTS_SUCCESS,
    payload: data
  };
};

const getForecastsFail = error => {
  return {
    type: actionTypes.GET_FORECASTS_FAIL,
    payload: error
  };
};
