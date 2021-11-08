import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import { SIGN_IN, RESEND_EMAIL } from "../types";
import {
  signInFailure,
  signInSuccess,
  reSendEmailSuccess,
  reSendEmailFailure,
} from "../actions/SignIn";
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

const resendEmailApi = async (payload) => {
  // api call
};

function* resendEmail({ payload }) {
  try {
    const response = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      resendEmailApi,
      payload
    );
    if (response.status !== 200) {
      yield put(reSendEmailFailure(response));
    } else {
      if (response?.data?.token) {
        yield put(reSendEmailSuccess(response.data));
      }
    }
  } catch (error) {
    yield put(reSendEmailFailure(error));
  }
}

function* resendUserEmail() {
  yield takeEvery(RESEND_EMAIL, resendEmail);
}

export default function* rootSaga() {
  yield all([fork(signInUser), fork(resendUserEmail)]);
}
