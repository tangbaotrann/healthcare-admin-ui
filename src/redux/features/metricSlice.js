import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
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
      const { start, end, notification, type, gender } = values;
      let _gender = gender === 0 ? true : false;

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}rules`,
        {
          start: start,
          end: end,
          gender: _gender,
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
      message.success("Tạo tập luật thành công!");

      return res.data.data;
    } catch (err) {
      console.log({ err });
      message.error(`${err.response.data.message}`);
      return;
    }
  }
);

// fetch api metric glycemic
export const fetchApiMetricGlycemic = createAsyncThunk(
  "metric/fetchApiMetricGlycemic",
  async ({ values, token }) => {
    try {
      console.log("values", values);
      const { start, end, notification, type, case_gly } = values;

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}rules`,
        {
          start: start,
          end: end,
          notification: notification,
          type: type,
          case_gly: case_gly,
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
      message.success("Tạo tập luật thành công.");

      return res.data.data;
    } catch (err) {
      console.log({ err });
      message.error(`${err.response.data.message}`);
      return;
    }
  }
);

// fetch api metric blood
export const fetchApiMetricBlood = createAsyncThunk(
  "metric/fetchApiMetricBlood",
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
      console.log("res blood", res.data.data);
      message.success("Tạo tập luật thành công.");

      return res.data.data;
    } catch (err) {
      console.log({ err });
      message.error(`${err.response.data.message}`);
      return;
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
        if (action.payload) {
          state.data.push(action.payload);
        }
      })
      .addCase(fetchApiMetricGlycemic.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.push(action.payload);
        }
      })
      .addCase(fetchApiMetricBlood.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.push(action.payload);
        }
      })
      .addCase(fetchApiAllMetric.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default metricSlice;
