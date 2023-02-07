import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// find all user Doctor
export const fetchApiUserDoctors = createAsyncThunk(
  "user/fetchApiUserDoctors",
  async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}doctors`);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// await browsing rule for doctor
export const fetchApiAwaitBrowsingRuleForDoctor = createAsyncThunk(
  "user/fetchApiAwaitBrowsingRuleForDoctor",
  async (values) => {
    try {
      const { accountId, isAccepted } = values;
      const getToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjNlMWYxODgxZTgzMWVhOGFjYTU4MDkwIiwiaWF0IjoxNjc1NzUxODE2fQ.5m63_xnfOBUrAn1l_ngKTvQMaYB1ntYdBddqoff319E";

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}doctors/${accountId}`,
        { isAccepted: isAccepted },
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

// delete await browsing rule for doctor
export const fetchApiDeleteAwaitBrowsingRuleForDoctor = createAsyncThunk(
  "user/fetchApiDeleteAwaitBrowsingRuleForDoctor",
  async (values) => {
    try {
      console.log("values", values);
      const { accountId, deleted } = values;
      const getToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjNlMWYxODgxZTgzMWVhOGFjYTU4MDkwIiwiaWF0IjoxNjc1NzUxODE2fQ.5m63_xnfOBUrAn1l_ngKTvQMaYB1ntYdBddqoff319E";

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}doctors/${accountId}`,
        { deleted: deleted },
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    await: [],
    btnClickGetIdAccountDoctor: null,
  },
  reducers: {
    getIdAccountDoctor: (state, action) => {
      state.btnClickGetIdAccountDoctor = action.payload;
    },
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
