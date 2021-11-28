import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../utils/init-firebase";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import {
  getNotionOAuthUlrSuccess,
  getNotionOAuthUlrFailure,
  getNotionOAuthTokenSuccess,
  getNotionOAuthTokenFailure,
} from "../actions/NotionAuth";
import { NOTION_OAUTH_URL, NOTION_OAUTH_TOKEN } from "../types";

const getNotionOAuthUrlApi = async () => {
  const notionOAuthUrl = httpsCallable(functions, "oauthUrl");
  const response = await notionOAuthUrl({});
  return response.data;
};
function* getNotionOAuthUrl() {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getNotionOAuthUrlApi
    );

    if (data) yield put(getNotionOAuthUlrSuccess(data));
  } catch (error) {
    yield put(getNotionOAuthUlrFailure(error));
  }
}

export function* callNotionOAuthUrl() {
  yield takeEvery(NOTION_OAUTH_URL, getNotionOAuthUrl);
}

const getNotionOAuthTokenApi = async (payload) => {
  const notionOAuthToken = httpsCallable(functions, "oauthToken");
  const response = await notionOAuthToken({ code: payload.code });
  return response;
};
function* getNotionOAuthToken({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getNotionOAuthTokenApi,
      payload
    );
    if (data) yield put(getNotionOAuthTokenSuccess(data));
  } catch (error) {
    yield put(getNotionOAuthTokenFailure(error));
  }
}

export function* callNotionOAuthToken() {
  yield takeEvery(NOTION_OAUTH_TOKEN, getNotionOAuthToken);
}

export default function* rootSaga() {
  yield all([fork(callNotionOAuthUrl), fork(callNotionOAuthToken)]);
}
