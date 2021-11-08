import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  EMAIL_ALREADY_TAKEN,
} from "../types";
const INIT_STATE = {
  response: null,
  emailTaken: false,
  error: null,
  loading: false,
};

const SignUp = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "RESET_PROFILE_STATES":
      return INIT_STATE;
    case SIGN_UP:
      return { ...state, loading: true };
    case SIGN_UP_SUCCESS:
      return { ...state, loading: false, response: action.payload };
    case SIGN_UP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EMAIL_ALREADY_TAKEN:
      return { ...state, loading: false, emailTaken: true };
    default:
      return { ...state };
  }
};
export default SignUp;
