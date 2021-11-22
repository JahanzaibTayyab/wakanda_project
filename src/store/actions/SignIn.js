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
  USER_DATA,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
  VERIFY_TOKEN,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
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

export const userData = (data) => {
  return {
    type: USER_DATA,
    payload: data,
  };
};
export const userDataSuccess = (response) => {
  return {
    type: USER_DATA_SUCCESS,
    payload: response,
  };
};
export const userDataFailure = (response) => {
  return {
    type: USER_DATA_FAILURE,
    payload: response,
  };
};

export const verifyToken = (data) => {
  return {
    type: VERIFY_TOKEN,
    payload: data,
  };
};
export const verifyTokenSuccess = (response) => {
  return {
    type: VERIFY_TOKEN_SUCCESS,
    payload: response,
  };
};
export const verifyTokenFailure = (response) => {
  return {
    type: VERIFY_TOKEN_FAILURE,
    payload: response,
  };
};
