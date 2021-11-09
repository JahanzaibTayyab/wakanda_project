import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  RESEND_EMAIL_FAILURE,
  RESEND_EMAIL_SUCCESS,
  RESEND_EMAIL,
} from "../types";

const INIT_STATE = {
  user: {},
  response: "",
  emailSent: false,
  loading: false,
};

const SignIn = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "RESET_SIGN_IN_STATES":
      return INIT_STATE;
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case RESEND_EMAIL:
      return {
        ...state,
        loading: true,
      };
    case RESEND_EMAIL_SUCCESS:
      return {
        ...state,
        response: action.payload,
        emailSent: true,
        loading: false,
      };
    case RESEND_EMAIL_FAILURE:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default SignIn;
