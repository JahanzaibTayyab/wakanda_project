import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../utils/init-firebase";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import {
  findPageFailure,
  findPageSuccess,
  embeddedPinCodeSuccess,
  embeddedPinCodeFailure,
} from "../actions/Pages";
import { FIND_PAGE, EMBEDDED_PIN_CODE } from "../types";

const getFindPageApi = async (payload) => {
  const listPages = httpsCallable(functions, "listpages");
  const requestBody = payload.fromDashboard? {} : {query:"Notion Coffee"};
  const response = await listPages(requestBody);
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
    yield put(findPageFailure(error, payload));
  }
}

export function* callFindPage() {
  yield takeEvery(FIND_PAGE, getFindPage);
}

const getEmbeddedPinCodeApi = async (payload) => {
  const embedPinCode = httpsCallable(functions, "embedPinCode");
  const response = await embedPinCode();
  return response.data;
};
function* getEmbeddedPinCode({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getEmbeddedPinCodeApi,
      payload
    );
    if (data) {
      yield put(embeddedPinCodeSuccess(data));
    } else {
      yield put(
        embeddedPinCodeFailure({
          error: { message: "Embedded widgets unsuccessful" },
        })
      );
    }
  } catch (error) {
    yield put(embeddedPinCodeFailure(error));
  }
}

export function* callEmbeddedPinCode() {
  yield takeEvery(EMBEDDED_PIN_CODE, getEmbeddedPinCode);
}

export default function* rootSaga() {
  yield all([fork(callFindPage), fork(callEmbeddedPinCode)]);
}
