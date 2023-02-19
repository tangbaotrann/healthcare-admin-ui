// lib
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch api create day doctor
export const fetchApiCreateDaysDoctor = createAsyncThunk(
  "days/fetchApiCreateDaysDoctor",
  async ({ dateFormat, weekDay }) => {
    console.log("dateFormat", dateFormat);
    console.log("weekDay", weekDay);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}days`,
        {
          day: dateFormat,
          day_number: weekDay,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`,
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
