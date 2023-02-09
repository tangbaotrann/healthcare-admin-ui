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
      console.log("res", res.data);

      return res.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

const daysSlice = createSlice({
  name: "days",
  initialState: {
    days: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiCreateDaysDoctor.fulfilled, (state, action) => {
      state.days = action.payload;
    });
  },
});

export default daysSlice;
