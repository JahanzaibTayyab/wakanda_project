import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import {
  generatePinCodeSuccess,
  generatePinCodeFailure,
  generateUniqueUrlSuccess,
  generateUniqueUrlFailure,
} from "../actions/EmbeddedLink.js";
import { GENERATE_PIN_CODE, GENERATE_UNIQUE_URL } from "../types";

import { generatePinCode, generateUrl } from "../../utils/helperFunctions";

const getGeneratePinCodeApi = async (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(generatePinCode());
    }, 500);
  });
};
function* getGeneratePinCode({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getGeneratePinCodeApi,
      payload
    );
    if (data) {
      yield put(generatePinCodeSuccess(data));
    }
  } catch (error) {
    yield put(generatePinCodeFailure(error, payload));
  }
}

export function* callGeneratePinCode() {
  yield takeEvery(GENERATE_PIN_CODE, getGeneratePinCode);
}

const getGenerateUniqueUrlApi = async (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(generateUrl());
    }, 500);
  });
};
function* getGenerateUniqueUrl({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getGenerateUniqueUrlApi,
      payload
    );
    if (data) {
      yield put(generateUniqueUrlSuccess(data));
    }
  } catch (error) {
    yield put(generateUniqueUrlFailure(error, payload));
  }
}

export function* callGenerateUniqueUrl() {
  yield takeEvery(GENERATE_UNIQUE_URL, getGenerateUniqueUrl);
}

export default function* rootSaga() {
  yield all([fork(callGeneratePinCode), fork(callGenerateUniqueUrl)]);
}
