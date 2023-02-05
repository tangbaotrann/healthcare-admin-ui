import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// find all user Doctor
export const fetchApiUserDoctors = createAsyncThunk(
  "user/fetchApiUserDoctors",
  async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}doctors`);
      console.log("res doctors -", res.data.data);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// await browsing rule for doctor
export const fetchApiAwaitBrowsingRuleForDoctor = createAsyncThunk(
  "user/fetchApiAwaitBrowsingRuleForDoctor",
  async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}doctors/id`
      );

      console.log("res", res.data);

      return res.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    await: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiUserDoctors.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(
        fetchApiAwaitBrowsingRuleForDoctor.fulfilled,
        (state, action) => {
          state.await = action.payload;
        }
      );
  },
});

export default userSlice;
