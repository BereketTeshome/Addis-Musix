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

    toggleFavorite(state, action) {
      const songId = action.payload;
      if (state.favoriteSongs.some((song) => song.songId === songId)) {
        state.favoriteSongs = state.favoriteSongs.filter(
          (song) => song.songId !== songId
        );
      } else {
        state.favoriteSongs.push({ songId });
      }
    },
    deleteFavoriteSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFavoriteSongSuccess(state, action) {
      state.loading = false;
      state.favoriteSongs = state.favoriteSongs.filter(
        (song) => song._id !== action.payload
      );
    },
    deleteFavoriteSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchFavoriteSongsRequest,
  fetchFavoriteSongsSuccess,
  fetchFavoriteSongsFailure,
  toggleFavorite,
  deleteFavoriteSongRequest,
  deleteFavoriteSongSuccess,
  deleteFavoriteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
