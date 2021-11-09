import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import { SIGN_IN, RESEND_EMAIL } from "../types";
import {
  signInFailure,
  signInSuccess,
  reSendEmailSuccess,
  reSendEmailFailure,
} from "../actions/SignIn";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LocalStorage } from "../../constants/LocalStorage";

const signInUserApi = async (payload) => {
  const auth = getAuth();
  const { email, password } = payload;
  return signInWithEmailAndPassword(auth, email, password);
};

function* signIn({ payload }) {
  try {
    const response = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      signInUserApi,
      payload
    );
    if (response) {
      if (response.user.emailVerified) {
        localStorage.setItem(LocalStorage.TOKEN, response.user.accessToken);
        localStorage.setItem(LocalStorage.USER_ID, response.user.uid);
        payload.history.push("/app/dashboard");
        yield put(signInSuccess(response.user));
      } else {
        yield put(signInSuccess(response.user));
      }
    }
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* signInUser() {
  yield takeEvery(SIGN_IN, signIn);
}

const resendEmailApi = async (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ status: 200, data: "Email sent" });
    }, 1200);
  });
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
      if (response) {
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
