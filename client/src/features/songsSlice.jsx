import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  loading: false,
  error: null,
  favoriteSongs: [],
};
const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    uploadSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    uploadSongSuccess(state, action) {
      state.loading = false;
      state.songs.push(action.payload);
    },
    uploadSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFavoriteSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFavoriteSongsSuccess(state, action) {
      state.loading = false;
      state.favoriteSongs = action.payload;
    },
    fetchFavoriteSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Toggle favorite song actions
    toggleFavoriteRequest(state) {
      state.loading = true;
      state.error = null;
    },
    toggleFavoriteSuccess(state, action) {
      state.loading = false;
      const songId = action.payload.songId;
      if (state.favoriteSongs.some((song) => song.songId === songId)) {
        state.favoriteSongs = state.favoriteSongs.filter(
          (song) => song.songId !== songId
        );
      } else {
        state.favoriteSongs.push({ songId });
      }
    },
    toggleFavoriteFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete favorite song actions
    deleteFavoriteSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFavoriteSongSuccess(state, action) {
      state.loading = false;
      const songId = action.payload;
      state.favoriteSongs = state.favoriteSongs.filter(
        (song) => song.songId !== songId
      );
    },
    deleteFavoriteSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  uploadSongRequest,
  uploadSongSuccess,
  uploadSongFailure,
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchFavoriteSongsRequest,
  fetchFavoriteSongsSuccess,
  fetchFavoriteSongsFailure,
  toggleFavoriteRequest,
  toggleFavoriteSuccess,
  toggleFavoriteFailure,
  deleteFavoriteSongRequest, // Make sure this is exported
  deleteFavoriteSongSuccess, // Make sure this is exported
  deleteFavoriteSongFailure, // Make sure this is exported
} = songsSlice.actions;

export default songsSlice.reducer;
