import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
} from "../types";
const INIT_STATE = {
  data: null,
  loading: false,
};

const Profile = (state = INIT_STATE, action) => {
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
export default Profile;
