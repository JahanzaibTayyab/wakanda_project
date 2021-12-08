import {
  GENERATE_PIN_CODE,
  GENERATE_PIN_CODE_SUCCESS,
  GENERATE_PIN_CODE_FAILURE,
  GENERATE_UNIQUE_URL,
  GENERATE_UNIQUE_URL_SUCCESS,
  GENERATE_UNIQUE_URL_FAILURE,
} from "../types";

export const resetEmbeddedLinkStates = () => ({
  type: "RESET_EMBEDDED_LINK_STATES",
});

export const generatePinCode = (data) => ({
  type: GENERATE_PIN_CODE,
  payload: data,
});

export const generatePinCodeSuccess = (data) => ({
  type: GENERATE_PIN_CODE_SUCCESS,
  payload: data,
});

export const generatePinCodeFailure = (error) => ({
  type: GENERATE_PIN_CODE_FAILURE,
  payload: error,
});

export const generateUniqueUrl = (data) => ({
  type: GENERATE_UNIQUE_URL,
  payload: data,
});

export const generateUniqueUrlSuccess = (data) => ({
  type: GENERATE_UNIQUE_URL_SUCCESS,
  payload: data,
});

export const generateUniqueUrlFailure = (error) => ({
  type: GENERATE_UNIQUE_URL_FAILURE,
  payload: error,
});
