import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchUploads = createAsyncThunk(
  "uploads/fetchUploads",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://addis-musix-backend.vercel.app/api/song/get"
      );
      const uploadedSongs = response.data.songs.filter(
        (song) => song.uploadedBy === userId
      );
      return uploadedSongs;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSong = createAsyncThunk(
  "uploads/deleteSong",
  async (songId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://addis-musix-backend.vercel.app/api/song/delete/${songId}`
      );
      return songId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Slice
const uploadsSlice = createSlice({
  name: "uploads",
  initialState: {
    songs: [],
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUploads.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchUploads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.songs = state.songs.filter((song) => song._id !== action.payload);
      })
      .addCase(deleteSong.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = uploadsSlice.actions;

export default uploadsSlice.reducer;
