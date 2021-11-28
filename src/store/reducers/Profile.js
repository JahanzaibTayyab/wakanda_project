import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
} from "../types";

/**
 * initial auth user
 */
const INIT_STATE = {
  data: null,
  loading: false,
};

export default (state = INIT_STATE, action) => {
  let error = action.payload;
  switch (action.type) {
    case "RESET_PROFILE_STATES":
      return INIT_STATE;
    case GET_USER_PROFILE:
      return { ...state, loading: true };
    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_USER_PROFILE_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    default:
      return { ...state };
  }
};
