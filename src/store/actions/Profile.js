import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
} from "../types";

export const resetProfileStates = () => ({
  type: "RESET_PROFILE_STATES",
});

export const getProfile = () => ({
  type: GET_USER_PROFILE,
});

export const getProfileSuccess = (data) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: data,
});

export const getProfileFailure = (error) => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: error,
});
