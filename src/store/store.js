import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducer/themeReducer";
import { homepageReducer } from "./reducer/homepageReducer";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    home: homepageReducer,
  },
});

export default store;
