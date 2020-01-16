import * as actionTypes from "./actionTypes";
import axios from "axios";

const getPictureInit = () => {
  return {
    type: actionTypes.GET_PICTURE_INIT
  };
};

export const getPicture = (lat, lon) => {
  return async dispatch => {
    dispatch(getPictureInit());
    let res;
    try {
      res = await axios.post("/api/picture", { lat, lon });
      dispatch(getPictureSuccess(res.data));
    } catch (e) {
      dispatch(getPictureFail(e.response.data));
    }
  };
};

const getPictureSuccess = picturePath => {
  return {
    type: actionTypes.GET_PICTURE_SUCCESS,
    payload: picturePath
  };
};

const getPictureFail = error => {
  return {
    type: actionTypes.GET_PICTURE_FAIL,
    payload: error
  };
};
