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
    toggleFavorite(state, action) {
      const songId = action.payload;
      if (state.favoriteSongs.includes(songId)) {
        state.favoriteSongs = state.favoriteSongs.filter((id) => id !== songId);
      } else {
        state.favoriteSongs.push(songId);
      }
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  toggleFavorite,
} = songsSlice.actions;

export default songsSlice.reducer;
