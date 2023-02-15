// lib
import { configureStore } from "@reduxjs/toolkit";
import daysSlice from "./features/daysSlice";
import layoutSlice from "./features/layoutSlice";
import metricSlice from "./features/metricSlice";
import shiftsSlice from "./features/shiftsSlice";

// me
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    shiftsSlice: shiftsSlice.reducer,
    layoutSlice: layoutSlice.reducer,
    daysSlice: daysSlice.reducer,
    metricSlice: metricSlice.reducer,
  },
});

export default store;
