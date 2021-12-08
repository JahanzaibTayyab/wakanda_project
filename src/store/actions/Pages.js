import {
  FIND_PAGE,
  FIND_PAGE_FAILURE,
  FIND_PAGE_SUCCESS,
  EMBEDDED_PIN_CODE,
  EMBEDDED_PIN_CODE_SUCCESS,
  EMBEDDED_PIN_CODE_FAILURE,
} from "../types";

export const resetPagesStates = () => ({
  type: "RESET_PAGES_STATES",
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
export const embeddedPinCode = (data) => ({
  type: EMBEDDED_PIN_CODE,
  payload: data,
});

export const embeddedPinCodeSuccess = (data) => ({
  type: EMBEDDED_PIN_CODE_SUCCESS,
  payload: data,
});

export const embeddedPinCodeFailure = (error) => ({
  type: EMBEDDED_PIN_CODE_FAILURE,
  payload: error,
});
