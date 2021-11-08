import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import { SIGN_IN } from "../types";
import { signInFailure, signInSuccess } from "../actions/SignIn";
import axios from "axios";

const signInUserApi = async (payload) => {
  // api call
};

function* signIn({ payload }) {
  try {
    const response = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      signInUserApi,
      payload
    );
    if (response.status !== 200) {
      yield put(signInFailure(response));
    } else {
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        yield put(signInSuccess(response.data));
        payload.history.push("/dashboard");
      }
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInUser() {
  yield takeEvery(SIGN_IN, signIn);
}

export default function* rootSaga() {
  yield all([fork(signInUser)]);
}
