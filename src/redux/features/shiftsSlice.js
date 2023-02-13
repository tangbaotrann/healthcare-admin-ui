import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch api create shifts
export const fetchApiCreateShiftsDoctor = createAsyncThunk(
  "shifts/fetchApiCreateShiftsDoctor",
  async (values) => {
    try {
      const { name, desc, time_start, time_end } = values;
      const getToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjNlYTNlYzAyMjFjYTIzMjI5OWUwYzU2IiwiaWF0IjoxNjc2Mjk1ODcyfQ.bqbOHtI3OfpraI91tyfDA5LkQlyn2NiItGZHkobFqK4";

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}shifts`,
        {
          name: name,
          desc: desc,
          time_start: time_start,
          time_end: time_end,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${getToken}`,
            ContentType: "application/json",
          },
        }
      );

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
