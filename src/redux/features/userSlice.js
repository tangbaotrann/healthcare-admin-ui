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

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}rules/doctor/${accountId}`, // ${process.env.REACT_APP_BASE_URL}doctors/${accountId}
        { isAccepted: isAccepted },
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

// delete await browsing rule for doctor
export const fetchApiDeleteAwaitBrowsingRuleForDoctor = createAsyncThunk(
  "user/fetchApiDeleteAwaitBrowsingRuleForDoctor",
  async (values) => {
    try {
      const { accountId, deleted } = values;

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}doctors/${accountId}`,
        { deleted: deleted },
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

// view profile doctor by id
export const fetchApiViewProfileDoctorById = createAsyncThunk(
  "user/fetchApiViewProfileDoctorById",
  async (record) => {
    try {
      const {
        _id,
        specialist,
        training_place,
        degree,
        languages,
        certificate,
        education,
        experiences,
        doctor,
      } = record;

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}doctors/profile/${_id}`,
        {
          _id: _id,
          specialist: specialist,
          training_place: training_place,
          degree: degree,
          languages: languages,
          certificate: certificate,
          education: education,
          experiences: experiences,
        }
      );
      console.log("res view profile", res.data.data);

      return res.data.data;
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
    viewProfile: [],
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
      )
      .addCase(fetchApiViewProfileDoctorById.fulfilled, (state, action) => {
        state.viewProfile = action.payload;
      });
  },
});

export default userSlice;
