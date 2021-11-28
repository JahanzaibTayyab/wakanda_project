import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  RESEND_EMAIL_FAILURE,
  RESEND_EMAIL_SUCCESS,
  RESEND_EMAIL,
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILURE,
  FACEBOOK_SIGN_IN,
  FACEBOOK_SIGN_IN_SUCCESS,
  FACEBOOK_SIGN_IN_FAILURE,
  USER_DATA,
  USER_DATA_FAILURE,
  USER_DATA_SUCCESS,
  VERIFY_TOKEN,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
} from "../types";

const INIT_STATE = {
  user: null,
  response: "",
  error: null,
  emailSent: false,
  tokenVerified: false,
  userHasWorkSpace: false,
  loading: false,
};

const SignIn = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "RESET_SIGN_IN_STATES":
      return INIT_STATE;
    case SIGN_IN:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
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
        error: action.payload,
        loading: false,
      };
    case GOOGLE_SIGN_IN:
      return {
        ...state,
        loading: true,
      };
    case GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case GOOGLE_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FACEBOOK_SIGN_IN:
      return {
        ...state,
        loading: true,
      };
    case FACEBOOK_SIGN_IN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case FACEBOOK_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_DATA:
      return {
        ...state,
        loading: true,
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        response: action.payload,
        userHasWorkSpace: true,
        loading: false,
      };
    case USER_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case VERIFY_TOKEN:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        tokenVerified: true,
        loading: false,
      };
    case VERIFY_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
        tokenVerified: false,
        loading: false,
      };
    default:
      return state;
  }
};
export default SignIn;
