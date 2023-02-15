import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch api metric bmi
export const fetchApiMetricBMI = createAsyncThunk(
  "metric/fetchApiMetricBMI",
  async (values) => {
    try {
      console.log("values", values);
      const { start, end, notification, type } = values;
      const getToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjNlYTNlYzAyMjFjYTIzMjI5OWUwYzU2IiwiaWF0IjoxNjc2Mjk1ODcyfQ.bqbOHtI3OfpraI91tyfDA5LkQlyn2NiItGZHkobFqK4";

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
            Authorization: `Bearer ${getToken}`,
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
  async (values) => {
    try {
      console.log("values", values);
      const { start, end, notification, type } = values;
      const getToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjNlYTNlYzAyMjFjYTIzMjI5OWUwYzU2IiwiaWF0IjoxNjc2Mjk1ODcyfQ.bqbOHtI3OfpraI91tyfDA5LkQlyn2NiItGZHkobFqK4";

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
            Authorization: `Bearer ${getToken}`,
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
    bmi: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiMetricBMI.fulfilled, (state, action) => {
      state.bmi = action.payload;
    });
  },
});

export default metricSlice;
