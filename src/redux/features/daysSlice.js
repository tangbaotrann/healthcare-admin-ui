import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch api create day doctor
export const fetchApiCreateDaysDoctor = createAsyncThunk(
  "days/fetchApiCreateDaysDoctor",
  async (values) => {
    try {
      const { day, day_number } = values;
      const getToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjNlMWYxODgxZTgzMWVhOGFjYTU4MDkwIiwiaWF0IjoxNjc1NzUxODE2fQ.5m63_xnfOBUrAn1l_ngKTvQMaYB1ntYdBddqoff319E";

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}days`,
        {
          day: day,
          day_number: day_number,
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

// fetch api all create days
export const fetchApiAllCreateDaysDoctor = createAsyncThunk(
  "days/fetchApiAllCreateDaysDoctor",
  async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}days`);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

const daysSlice = createSlice({
  name: "days",
  initialState: {
    data: [],
    days: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllCreateDaysDoctor.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchApiCreateDaysDoctor.fulfilled, (state, action) => {
        state.days = action.payload;
      });
  },
});

export default daysSlice;
