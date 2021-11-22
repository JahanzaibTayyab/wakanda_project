import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../utils/init-firebase";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import {
  findDataBaseFailure,
  findDataBaseSuccess,
  findPageFailure,
  findPageSuccess,
  generatePinCodeSuccess,
  generatePinCodeFailure,
  generateUniqueUrlSuccess,
  generateUniqueUrl,
  generateUniqueUrlFailure,
  findPage,
} from "../actions/Dashboard";
import {
  FIND_DATABASE,
  FIND_PAGE,
  GENERATE_PIN_CODE,
  GENERATE_UNIQUE_URL,
} from "../types";

import { generatePinCode, generateUrl } from "../../utils/helperFunctions";

const getFindPageApi = async (payload) => {
  const listPages = httpsCallable(functions, "listpages");
  const response = await listPages();
  if (response) {
    const data = response.data.pages;
    if (data.length > 0) {
      return response;
    } else {
      return new Error("Page has no item");
    }
  }
};
function* getFindPage({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getFindPageApi,
      payload
    );

    if (data) yield put(findPageSuccess(data.data));
  } catch (error) {
    yield put(findPageFailure(error));
  }
}

export function* callFindPage() {
  yield takeEvery(FIND_PAGE, getFindPage);
}

const getFindDataBaseApi = async (payload) => {
  const findDataBase = httpsCallable(functions, "listdatabases");
  const response = await findDataBase();
  if (response) {
    if (response.data.databases.length > 0) {
      return response;
    } else {
      return new Error("Database has no item");
    }
  }
};
function* getFindDataBase({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getFindDataBaseApi,
      payload
    );
    if (data) {
      yield put(findDataBaseSuccess(data.data));
      yield put(findPage({ id: payload.id }));
    }
  } catch (error) {
    yield put(findDataBaseFailure(error));
  }
}

export function* callFindDataBase() {
  yield takeEvery(FIND_DATABASE, getFindDataBase);
}

const getGeneratePinCodeApi = async (payload) => {
  return generatePinCode();
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
    yield put(generatePinCodeFailure(error));
  }
}

export function* callGeneratePinCode() {
  yield takeEvery(GENERATE_PIN_CODE, getGeneratePinCode);
}

const getGenerateUniqueUrlApi = async (payload) => {
  return generateUrl();
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
    yield put(generateUniqueUrlFailure(error));
  }
}

export function* callGenerateUniqueUrl() {
  yield takeEvery(GENERATE_UNIQUE_URL, getGenerateUniqueUrl);
}

export default function* rootSaga() {
  yield all([
    fork(callFindPage),
    fork(callFindDataBase),
    fork(callGeneratePinCode),
    fork(callGenerateUniqueUrl),
  ]);
}
