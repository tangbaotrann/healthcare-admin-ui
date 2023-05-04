import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// login
export const fetchApiLogin = createAsyncThunk(
  "user/fetchApiLogin",
  async (values, { rejectWithValue }) => {
    try {
      const { phone_number, password } = values;

      const formatPhone = phone_number.replace("+84", "0");

      console.log("formatPhone ->", formatPhone);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/login`,
        {
          phone_number: formatPhone, //phone_number,
          password: password,
        }
      );
      // console.log(res.data.data);

      // localStorage.setItem(
      //   "token_user_login",
      //   JSON.stringify(res.data.data.accessToken)
      // );

      console.log("login ->", res.data.data);

      return res.data.data;
    } catch (err) {
      const message = err.response.data;
      console.log(message);
      return rejectWithValue(message);
    }
  }
);

// register
export const fetchApiRegister = createAsyncThunk(
  "user/fetchApiRegister",
  async (values) => {
    try {
      const { confirmPassword, phone_number, password, rule } = values;

      const formatPhone = phone_number.replace("+84", "0");

      console.log("formatPhone ->", formatPhone);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/register`,
        {
          phone_number: formatPhone,
          password: password,
          rule: rule,
        },
        {
          headers: { Authorization: "***" },
        }
      );
      console.log("res", res.data.data);

      localStorage.setItem(
        "token_user_login",
        JSON.stringify(res.data.data.accessToken)
      );

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// find all user Doctor
export const fetchApiUserDoctors = createAsyncThunk(
  "user/fetchApiUserDoctors",
  async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("token_user_login"));

      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}doctors`, {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${getToken}`,
          ContentType: "application/json",
        },
      });

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// find all user Patient
export const fetchApiUserPatients = createAsyncThunk(
  "user/fetchApiUserPatients",
  async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("token_user_login"));
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}patients/admin`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${getToken}`,
            ContentType: "application/json",
          },
        }
      );

      console.log("res all patient", res.data.data);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// find doctor by id
export const fetchApiDoctorById = createAsyncThunk(
  "user/fetchApiDoctorById",
  async (idDoctor) => {
    try {
      if (idDoctor) {
        const getToken = JSON.parse(localStorage.getItem("token_user_login"));

        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/doctors/${idDoctor}`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              Authorization: `Bearer ${getToken}`,
              ContentType: "application/json",
            },
          }
        );
        console.log("res doctor by id", res.data.data);

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

// await browsing rule for doctor
export const fetchApiAwaitBrowsingRuleForDoctor = createAsyncThunk(
  "user/fetchApiAwaitBrowsingRuleForDoctor",
  async ({ account_id, is_accepted, token }) => {
    try {
      // const getToken = JSON.parse(localStorage.getItem("token_user_login"));
      // const { account_id, is_accepted, token } = values;

      console.log("account_id", account_id);
      console.log("is_accepted", is_accepted);
      console.log("token", token);

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}rules/doctor/${account_id}`, // ${process.env.REACT_APP_BASE_URL}doctors/${accountId}
        { is_accepted: is_accepted },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            ContentType: "application/json",
          },
        }
      );

      console.log("res ->", res.data.data);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// delete await browsing rule for doctor
export const fetchApiDeleteAwaitBrowsingRuleForDoctor = createAsyncThunk(
  "user/fetchApiDeleteAwaitBrowsingRuleForDoctor",
  async ({ account_id, deleted, token }) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}rules/doctor/${account_id}`,
        { deleted: deleted },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            ContentType: "application/json",
          },
        }
      );

      console.log("res del ->", res.data.data);

      return res.data.data;
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
    login: [],
    register: [],
    patients: [],
    doctorById: [],
    isLoading: false,
    btnClickedFilterDoctor: null,
    btnClickedGetPhoneNumber: null,
  },
  reducers: {
    getIdAccountDoctor: (state, action) => {
      state.btnClickGetIdAccountDoctor = action.payload;
    },
    btnClickedGetPhone: (state, action) => {
      state.btnClickedGetPhoneNumber = action.payload;
    },
    clickedLogoutAdmin: (state, action) => {
      state.login = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiDoctorById.fulfilled, (state, action) => {
        state.doctorById = action.payload;
      })
      .addCase(fetchApiLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.login = action.payload;
      })
      .addCase(fetchApiLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.login = action.payload;
      })
      .addCase(fetchApiRegister.fulfilled, (state, action) => {
        state.register = action.payload;
      })
      // del account
      .addCase(
        fetchApiDeleteAwaitBrowsingRuleForDoctor.fulfilled,
        (state, action) => {
          const _update = state.data.findIndex(
            (_account) => _account._id === action.payload._id
          );

          if (_update > -1) {
            state.data.splice(_update, 1);
          }
        }
      )
      .addCase(fetchApiUserDoctors.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiUserDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(
        fetchApiAwaitBrowsingRuleForDoctor.fulfilled,
        (state, action) => {
          const _update = state.data.findIndex(
            (_account) => _account._id === action.payload._id
          );

          if (_update > -1) {
            state.data.splice(_update, 1);
          }

          state.await = action.payload;
        }
      )
      .addCase(fetchApiUserPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
      })
      .addCase(fetchApiViewProfileDoctorById.fulfilled, (state, action) => {
        state.viewProfile = action.payload;
      });
  },
});

export default userSlice;
