import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../utils/init-firebase";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import {
  findDataBaseSuccess,
  findDataBaseFailure,
} from "../actions/TaskDatabase";
import { findPage } from "../actions/Pages";
import { FIND_DATABASE } from "../types";

const getFindDataBaseApi = async (payload) => {
  const findDataBase = httpsCallable(functions, "listdatabases");
  const response = await findDataBase();
  if (response) {
    if (response.data.databases.length > 0) {
      return response;
    } else {
      return new Error("Database has no item");
    }
  }
};
function* getFindDataBase({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getFindDataBaseApi,
      payload
    );
    if (data) {
      yield put(findDataBaseSuccess(data.data));
      yield put(findPage(payload));
    }
  } catch (error) {
    yield put(findDataBaseFailure(error, payload));
  }
}

export function* callFindDataBase() {
  yield takeEvery(FIND_DATABASE, getFindDataBase);
}

export default function* rootSaga() {
  yield all([fork(callFindDataBase)]);
}
