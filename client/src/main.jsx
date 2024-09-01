// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga"; // Import redux-saga middleware
import componentReducer from "./features/ComponentSlice.jsx";
import songsReducer from "./features/songsSlice.jsx"; // Import the songs reducer
import rootSaga from "./features/sagas.jsx"; // Import your root saga
import App from "./App.jsx";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with both reducers and apply the saga middleware
const store = configureStore({
  reducer: {
    component: componentReducer,
    songs: songsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // Add saga middleware to the store
});

// Run the root saga
sagaMiddleware.run(rootSaga);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
