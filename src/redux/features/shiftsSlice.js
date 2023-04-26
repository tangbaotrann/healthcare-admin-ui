import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

// fetch api create shifts
export const fetchApiCreateShiftsDoctor = createAsyncThunk(
  "shifts/fetchApiCreateShiftsDoctor",
  async ({ values, token }) => {
    try {
      const { name, desc, time_start, time_end } = values;

      // let formatTimeStart = moment(time_start); //.format("YYYY/MM/DD HH:mm");
      // let formatTimeEnd = moment(time_end); //.format("YYYY/MM/DD HH:mm");

      // console.log("formatTimeStart", time_start);
      // console.log("formatTimeEnd", time_end);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}shifts`,
        {
          name: name,
          desc: desc,
          time_start: time_start.$d, //new Date(time_start.$d),
          time_end: time_end.$d, //new Date(time_end.$d),
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            ContentType: "application/json",
          },
        }
      );
      message.success("Bạn đã tạo ca làm thành công cho Bác sĩ.");

      console.log("res ->", res.data.data);

      return res.data.data;
    } catch (err) {
      console.log({ err });
      message.error(`${err.response.data.message}`);
      return;
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
        if (action.payload) {
          state.data.push(action.payload);
        }
        // state.shifts = action.payload;
      })
      .addCase(fetchApiAllShiftsDoctor.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default shiftsSlice;
