import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "../types";

export const signIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user
  };
};
export const signInSuccess = (response) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: response
  };
};
export const signInFailure = (response) => {
  return {
    type: SIGN_IN_FAILURE,
    payload: response
  };
};
