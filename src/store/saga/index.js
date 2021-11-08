import { all } from "redux-saga/effects";
import signIn from "./userSaga";
import profile from "./profileSaga";
import signUp from "./signUp";

export default function* rootSaga() {
  yield all([signIn(), profile(), signUp()]);
}
