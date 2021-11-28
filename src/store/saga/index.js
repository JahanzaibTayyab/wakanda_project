import { all } from "redux-saga/effects";
import notionAuth from "./notionAuth";
import signIn from "./signIn";
import dashboard from "./dashboard";
import profile from "./profileSaga";

export default function* rootSaga() {
  yield all([notionAuth(), signIn(), dashboard(), profile()]);
}
