import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchFavoriteSongsRequest,
  fetchFavoriteSongsSuccess,
  fetchFavoriteSongsFailure,
  toggleFavoriteRequest,
  toggleFavoriteSuccess,
  toggleFavoriteFailure,
  deleteFavoriteSongRequest, // Make sure this is correctly imported
  deleteFavoriteSongSuccess, // Add this action for success
  deleteFavoriteSongFailure, // Add this action for failure
  uploadSongRequest,
  uploadSongSuccess,
  uploadSongFailure,
} from "./songsSlice";

// Saga to handle the song upload
function* uploadSongSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "https://addis-musix-backend.vercel.app/api/song/create",
      action.payload
    );
    yield put(uploadSongSuccess(response.data));
  } catch (error) {
    yield put(uploadSongFailure(error.message));
  }
}

// Saga to fetch all songs
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

// Saga to fetch favorite songs for a specific user
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

// Saga to delete a favorite song
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

// Saga to toggle favorite songs
function* toggleFavoriteSaga({ payload: { song, uploadedBy } }) {
  try {
    yield call(
      axios.post,
      "https://addis-musix-backend.vercel.app/api/song/favorite",
      {
        songId: song._id,
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
        releaseDate: song.releaseDate,
        coverImageUrl: song.coverImageUrl,
        uploadedBy,
      }
    );
    yield put(toggleFavoriteSuccess({ songId: song._id }));
  } catch (error) {
    yield put(toggleFavoriteFailure(error.message));
  }
}

// Single root saga where all the sagas are combined
export default function* rootSaga() {
  yield takeEvery(uploadSongRequest.type, uploadSongSaga);
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga);
  yield takeEvery(fetchFavoriteSongsRequest.type, fetchFavoriteSongsSaga);
  yield takeEvery(deleteFavoriteSongRequest.type, deleteFavoriteSongSaga);
  yield takeEvery(toggleFavoriteRequest.type, toggleFavoriteSaga); // Add the watcher for the toggle favorite action
}
