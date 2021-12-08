import { all } from "redux-saga/effects";
import notionAuth from "./notionAuth";
import signIn from "./signIn";
import embeddedLink from "./embeddedLink";
import taskDatabase from "./taskDatabase";
import pages from "./pages";
import profile from "./profileSaga";

export default function* rootSaga() {
  yield all([
    notionAuth(),
    signIn(),
    embeddedLink(),
    taskDatabase(),
    pages(),
    profile(),
  ]);
}
