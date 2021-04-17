import { put, takeLatest } from "redux-saga/effects";
import { DATA_ERROR, DATA_LOADING, DATA_SUCCESS } from "../Actions/table";
import axios from "axios";

function* getData() {
  try {
    const users = yield axios
      .get("https://607b0150bd56a60017ba34f4.mockapi.io/api/v1/stocks")
      .then(({ data }) => {
        return data;
      });
    yield put({ type: DATA_SUCCESS, data: users });
  } catch (e) {
    yield put({ type: DATA_ERROR, error: e.message });
  }
}

export function* rootSaga() {
  // Allows concurrent fetches of users

  // Does not allow concurrent fetches of users
  yield takeLatest(DATA_LOADING, getData);
}

export default rootSaga;
