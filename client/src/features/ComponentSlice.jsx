import { createSlice } from "@reduxjs/toolkit";
import HomePage from "../pages/HomePage";
import Songs from "../pages/Songs";
import Upload from "../pages/Upload";
import Favorites from "../pages/Favorites";
import Uploads from "../pages/Uploads";

const initialState = {
  component: <HomePage />,
};

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    changeComponent: (state, action) => {
      switch (action.payload) {
        case "Home":
          state.component = <HomePage />;
          break;
        case "Songs":
          state.component = <Songs />;
          break;
        case "Upload":
          state.component = <Upload />;
          break;
        case "Favorites":
          state.component = <Favorites />;
          break;
        case "Uploads":
          state.component = <Uploads />;
          break;
        default:
          state.component = <HomePage />;
      }
    },
  },
});

export const { changeComponent } = componentSlice.actions;

export default componentSlice.reducer;
