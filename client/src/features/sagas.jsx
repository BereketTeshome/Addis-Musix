import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchFavoriteSongsRequest,
  fetchFavoriteSongsSuccess,
  fetchFavoriteSongsFailure,
  deleteFavoriteSongRequest,
  deleteFavoriteSongSuccess,
  deleteFavoriteSongFailure,
} from "./songsSlice";

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

function* fetchFavoriteSongsSaga({ payload: uploadedBy }) {
  try {
    const response = yield call(
      axios.get,
      `https://addis-musix-backend.vercel.app/api/song/favorites/${uploadedBy}`
    );
    yield put(fetchFavoriteSongsSuccess(response.data.favorite));
  } catch (error) {
    yield put(fetchFavoriteSongsFailure(error.message));
  }
}

function* deleteFavoriteSongSaga({ payload: songId }) {
  try {
    yield call(
      axios.delete,
      `https://addis-musix-backend.vercel.app/api/song/favorite/${songId}`
    );
    yield put(deleteFavoriteSongSuccess(songId));
  } catch (error) {
    yield put(deleteFavoriteSongFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga);
  yield takeEvery(fetchFavoriteSongsRequest.type, fetchFavoriteSongsSaga);
  yield takeEvery(deleteFavoriteSongRequest.type, deleteFavoriteSongSaga);
}
