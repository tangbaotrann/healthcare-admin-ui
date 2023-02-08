import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    btnClickGetIdAccountDoctor: null,
  },
  reducers: {
    btnClickMenuChangeLayout: (state, action) => {
      state.btnClickMenuChangeLayout = action.payload;
    },
  },
});

export default layoutSlice;
