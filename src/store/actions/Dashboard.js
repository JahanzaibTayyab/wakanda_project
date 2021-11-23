import {
  GENERATE_PIN_CODE,
  GENERATE_PIN_CODE_SUCCESS,
  GENERATE_PIN_CODE_FAILURE,
  GENERATE_UNIQUE_URL,
  GENERATE_UNIQUE_URL_SUCCESS,
  GENERATE_UNIQUE_URL_FAILURE,
  FIND_DATABASE,
  FIND_DATABASE_SUCCESS,
  FIND_DATABASE_FAILURE,
  FIND_PAGE,
  FIND_PAGE_FAILURE,
  FIND_PAGE_SUCCESS,
  EMBEDED_PIN_CODE,
  EMBEDED_PIN_CODE_SUCCESS,
  EMBEDED_PIN_CODE_FAILURE
} from "../types";

export const resetPreparingStates = () => ({
  type: "RESET_PREPARING_STATES",
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

export const findPage = (data) => ({
  type: FIND_PAGE,
  payload: data,
});

export const findPageSuccess = (data) => ({
  type: FIND_PAGE_SUCCESS,
  payload: data,
});

export const findPageFailure = (error) => ({
  type: FIND_PAGE_FAILURE,
  payload: error,
});

export const findDataBase = (data) => ({
  type: FIND_DATABASE,
  payload: data,
});

export const findDataBaseSuccess = (data) => ({
  type: FIND_DATABASE_SUCCESS,
  payload: data,
});

export const findDataBaseFailure = (error) => ({
  type: FIND_DATABASE_FAILURE,
  payload: error,
});



export const embededPinCode = (data) => ({
  type: EMBEDED_PIN_CODE,
  payload: data,
});

export const embededPinCodeSuccess = (data) => ({
  type: EMBEDED_PIN_CODE_SUCCESS,
  payload: data,
});

export const embededPinCodeFailure = (error) => ({
  type: EMBEDED_PIN_CODE_FAILURE,
  payload: error,
});