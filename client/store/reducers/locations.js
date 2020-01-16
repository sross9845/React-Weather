import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: [],
  success: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_LOCATIONS_INIT:
      return { ...state, loading: true, success: null, error: null };
    case actionTypes.SEARCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload
      };
    case actionTypes.SEARCH_RESET:
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        data: []
      };
    case actionTypes.SEARCH_LOCATIONS_FAIL:
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
