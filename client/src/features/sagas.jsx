// features/sagas.jsx
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from "./songsSlice.jsx";

function* fetchSongsSaga() {
  try {
    const response = yield call(
      axios.get,
      "https://addis-musix-backend.vercel.app/api/song/get"
    );
    yield put(fetchSongsSuccess(response.data.songs));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* fetchSongsSagaById({ id }) {
  try {
    const response = yield call(
      axios.get,
      `https://addis-musix-backend.vercel.app/api/song/get${id}`
    );
    yield put(fetchSongsSuccess(response.data.favorite));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga, fetchSongsSagaById);
}
