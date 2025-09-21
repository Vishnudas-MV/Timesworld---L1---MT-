// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "./Slices/countrySlice";

export const store = configureStore({
  reducer: {
    landing: landingReducer,
  },
});
