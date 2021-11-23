import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "./constants";
import { getProfileSuccess, getProfileFailure } from "../actions/Profile";
import { GET_USER_PROFILE, SAVE_DATA } from "../types";
import { LocalStorage } from "../../constants/LocalStorage";
import { db } from "../../utils/init-firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const getUserProfile = async () => {
  const id = localStorage.getItem(LocalStorage.USER_ID);
  const docRef = doc(db, `users/${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
function* getProfile() {
  try {
    const data = yield retry(MAX_RETRY_COUNT, RETRY_INTERVAL, getUserProfile);
    if (data) yield put(getProfileSuccess(data));
  } catch (error) {
    yield put(getProfileFailure(error));
  }
}

export function* callProfile() {
  yield takeEvery(GET_USER_PROFILE, getProfile);
}

const savaDataApi = async (payload) => {
  if (payload) {
    const docRef = doc(db, `users/${payload.id}`);
    await setDoc(docRef, payload.data, { merge: true });
  }
};

function* saveData({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      savaDataApi,
      payload
    );
    if (data) yield put(getProfileSuccess(data));
  } catch (error) {
    yield put(getProfileFailure(error));
  }
}

export function* callSaveData() {
  yield takeEvery(SAVE_DATA, saveData);
}

export default function* rootSaga() {
  yield all([fork(callProfile), fork(callSaveData)]);
}
