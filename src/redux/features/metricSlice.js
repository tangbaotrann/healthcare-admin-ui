import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch api all metric
export const fetchApiAllMetric = createAsyncThunk(
  "metric/fetchApiAllMetric",
  async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}rules`);
      console.log("res", res.data.data);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api metric bmi
export const fetchApiMetricBMI = createAsyncThunk(
  "metric/fetchApiMetricBMI",
  async ({ values, token }) => {
    try {
      console.log("values", values);
      const { start, end, notification, type } = values;

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}rules`,
        {
          start: start,
          end: end,
          notification: notification,
          type: type,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            ContentType: "application/json",
          },
        }
      );
      console.log("res", res.data.data);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api metric glycemic
export const fetchApiMetricGlycemic = createAsyncThunk(
  "metric/fetchApiMetricGlycemic",
  async ({ values, token }) => {
    try {
      console.log("values", values);
      const { start, end, notification, type } = values;

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}rules`,
        {
          start: start,
          end: end,
          notification: notification,
          type: type,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            ContentType: "application/json",
          },
        }
      );
      console.log("res", res.data.data);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

const metricSlice = createSlice({
  name: "metric",
  initialState: {
    data: [],
    bmi: [],
    glycemic: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiMetricBMI.fulfilled, (state, action) => {
        state.bmi = action.payload;
      })
      .addCase(fetchApiMetricGlycemic.fulfilled, (state, action) => {
        state.glycemic = action.payload;
      })
      .addCase(fetchApiAllMetric.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default metricSlice;
