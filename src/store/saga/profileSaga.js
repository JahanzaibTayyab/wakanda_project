import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import { getProfileSuccess, getProfileFailure } from "../actions/Profile";
import { GET_USER_PROFILE } from "../types";
import axios from "axios";

const getUserProfile = async () => {
  // api call
};
function* getProfile() {
  try {
    const response = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getUserProfile
    );
    if (response.status === 200)
      yield put(getProfileSuccess(response.data.adminProfile));
  } catch (error) {
    yield put(getProfileFailure(error));
  }
}

export function* callProfile() {
  yield takeEvery(GET_USER_PROFILE, getProfile);
}

export default function* rootSaga() {
  yield all([fork(callProfile)]);
}
