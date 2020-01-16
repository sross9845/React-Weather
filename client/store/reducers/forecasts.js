import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: [],
  success: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FORECASTS_INIT:
      return {
        ...state,
        loading: true,
        success: null,
        error: null
      };
    case actionTypes.GET_FORECASTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        success: true,
        error: null
      };
    case actionTypes.GET_FORECASTS_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
