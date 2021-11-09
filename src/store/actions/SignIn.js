import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  RESEND_EMAIL,
  RESEND_EMAIL_SUCCESS,
  RESEND_EMAIL_FAILURE,
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILURE,
  FACEBOOK_SIGN_IN,
  FACEBOOK_SIGN_IN_SUCCESS,
  FACEBOOK_SIGN_IN_FAILURE,
  REST_PASSWORD,
  REST_PASSWORD_SUCCESS,
  REST_PASSWORD_FAILURE,
} from "../types";

export const resetSignInStates = () => ({
  type: "RESET_SIGN_IN_STATES",
});

export const signIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user,
  };
};
export const signInSuccess = (response) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: response,
  };
};
export const signInFailure = (response) => {
  return {
    type: SIGN_IN_FAILURE,
    payload: response,
  };
};

export const reSendEmail = (data) => {
  return {
    type: RESEND_EMAIL,
    payload: data,
  };
};
export const reSendEmailSuccess = (response) => {
  return {
    type: RESEND_EMAIL_SUCCESS,
    payload: response,
  };
};
export const reSendEmailFailure = (response) => {
  return {
    type: RESEND_EMAIL_FAILURE,
    payload: response,
  };
};

export const googleSignIn = (data) => {
  return {
    type: GOOGLE_SIGN_IN,
    payload: data,
  };
};
export const googleSignInSuccess = (response) => {
  return {
    type: GOOGLE_SIGN_IN_SUCCESS,
    payload: response,
  };
};
export const googleSignInFailure = (response) => {
  return {
    type: GOOGLE_SIGN_IN_FAILURE,
    payload: response,
  };
};

export const facebookSignIn = (data) => {
  return {
    type: FACEBOOK_SIGN_IN,
    payload: data,
  };
};
export const facebookSignInSuccess = (response) => {
  return {
    type: FACEBOOK_SIGN_IN_SUCCESS,
    payload: response,
  };
};
export const facebookSignInFailure = (response) => {
  return {
    type: FACEBOOK_SIGN_IN_FAILURE,
    payload: response,
  };
};
