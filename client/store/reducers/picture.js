import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  path: null,
  success: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PICTURE_INIT:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        path: null
      };
    case actionTypes.GET_PICTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        path: action.payload
      };
    case actionTypes.GET_PICTURE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        success: false,
        path: action.payload.fallbackPicture
      };
    default:
      return state;
  }
};

export default reducer;
