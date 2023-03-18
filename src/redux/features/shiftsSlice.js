import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch api create shifts
export const fetchApiCreateShiftsDoctor = createAsyncThunk(
  "shifts/fetchApiCreateShiftsDoctor",
  async ({ values, token }) => {
    try {
      const { name, desc, time_start, time_end } = values;

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}shifts`,
        {
          name: name,
          desc: desc,
          time_start: new Date(time_start.$d),
          time_end: new Date(time_end.$d),
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            ContentType: "application/json",
          },
        }
      );

      console.log("res ->", res.data);

      return res.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api all shifts
export const fetchApiAllShiftsDoctor = createAsyncThunk(
  "shifts/fetchApiAllShiftsDoctor",
  async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}shifts`);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

const shiftsSlice = createSlice({
  name: "shifts",
  initialState: {
    data: [],
    shifts: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiCreateShiftsDoctor.fulfilled, (state, action) => {
        state.shifts = action.payload;
      })
      .addCase(fetchApiAllShiftsDoctor.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default shiftsSlice;
