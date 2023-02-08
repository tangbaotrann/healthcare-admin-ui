// lib
import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./features/layoutSlice";
import shiftsSlice from "./features/shiftsSlice";

// me
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    shiftsSlice: shiftsSlice.reducer,
    layoutSlice: layoutSlice.reducer,
  },
});

export default store;
