import { all, fork, put, takeEvery, retry, call } from "redux-saga/effects";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import {
  signUpSuccess,
  signUpFailure,
  getAlreadyEmail,
} from "../actions/SignUp";
import { SIGN_UP } from "../types";
import { auth } from "../../utils/init-firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { LocalStorage } from "../../constants/LocalStorage";

const signUpApi = async (payload) => {
  const { email, password } = payload;
  return createUserWithEmailAndPassword(auth, email, password);
};
function* signUp({ payload }) {
  try {
    const response = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      signUpApi,
      payload
    );
    if (response) {
      const data = {
        ...response.user,
        _tokenResponse: response._tokenResponse,
      };
      const auth = getAuth();
      signOut(auth);
      yield put(signUpSuccess(data));
      localStorage.setItem(LocalStorage.WAKANDA_EMAIL, payload.email);
      payload.history.push({
        pathname: "/login",
        search: "?v=true",
      });
    }
  } catch (error) {
    if (error.message.includes("email-already-in-use")) {
      yield put(getAlreadyEmail(true));
    }
    yield put(signUpFailure(error.message));
  }
}

export function* callSignUp() {
  yield takeEvery(SIGN_UP, signUp);
}

export default function* rootSaga() {
  yield all([fork(callSignUp)]);
}
