import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  name: "San Francisco",
  suffix: "San Francisco City and County, California",
  success: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CURRENT_LOCATION_INIT:
      return { ...state, loading: true, success: null, error: null };
    case actionTypes.CURRENT_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        name: action.payload.name,
        suffix: action.payload.name_suffix
      };
    case actionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        success: true,
        name: action.payload.name,
        suffix: action.payload.suffix,
        error: null,
        loading: false
      };
    case actionTypes.CURRENT_LOCATION_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
