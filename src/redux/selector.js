import { createSelector } from "@reduxjs/toolkit";

// login
export const fetchApiLoginSelector = (state) => state.userSlice.login;
export const isLoadingLoginSelector = (state) => state.userSlice.isLoading;

// get phone clicked
export const btnClickedGetPhoneNumberSelector = (state) =>
  state.userSlice.btnClickedGetPhoneNumber;

// all user
export const fetchApiUserDoctorsSelector = (state) => state.userSlice.data;

// all patients
export const fetchApiUserPatientsSelector = (state) => state.userSlice.patients;
export const fetchApiDoctorByIdSelector = (state) => state.userSlice.doctorById;

// btn clicked get doctor by id
export const btnClickedFilterDoctorSelector = (state) =>
  state.userSlice.btnClickedFilterDoctor;

// all shifts
export const fetchApiAllShiftsDoctorSelector = (state) =>
  state.shiftsSlice.data;
export const fetchApiCreateShiftsDoctorSelector = (state) =>
  state.shiftsSlice.shifts;

// all days
export const fetchApiAllCreateDaysDoctorSelector = (state) =>
  state.daysSlice.data;

// clicked get id account doctor
export const btnClickGetIdAccountDoctorSelector = (state) =>
  state.userSlice.btnClickGetIdAccountDoctor;

// clicked get id layout (change layout)
export const btnClickMenuChangeLayoutSelector = (state) =>
  state.layoutSlice.btnClickMenuChangeLayout;

// view profile doctor by id
export const fetchApiViewProfileDoctorByIdSelector = (state) =>
  state.userSlice.viewProfile;

// all metric
export const fetchApiAllMetricSelector = (state) => state.metricSlice.data;

// isLoading
export const isLoadingFetchApiUserDoctorsSelector = (state) =>
  state.userSlice.isLoading;
export const isLoadingFetchApiAllShiftsDoctorSelector = (state) =>
  state.shiftsSlice.isLoading;
export const isLoadingFetchApiAllCreateDaysDoctorSelector = (state) =>
  state.daysSlice.isLoading;
export const isLoadingFetchApiAllMetric = (state) =>
  state.metricSlice.isLoading;

/* ---- Handle Selector ----- */

// Tổng bệnh nhân
export const filterTotalPatients = createSelector(
  fetchApiUserPatientsSelector,
  (patients) => {
    // console.log("patients selector", patients);
    if (patients?.length > 0) {
      return patients.length;
    }

    return [];
  }
);

// Tổng ngày làm
export const totalShifts = createSelector(
  fetchApiAllShiftsDoctorSelector,
  (listShifts) => {
    if (listShifts?.length > 0) {
      return listShifts.length;
    }
  }
);

// Tổng doctor
export const filterTotalDoctors = createSelector(
  fetchApiUserDoctorsSelector,
  (listDoctor) => {
    if (listDoctor?.length > 0) {
      const _lists = listDoctor.filter(
        (_doctor) => _doctor.is_accepted === true && _doctor.deleted === false
      );

      return _lists.length;
    }
  }
);

// Tổng tiền (tất cả doctor)
export const filterTotalPriceOfAllDoctor = createSelector(
  fetchApiUserDoctorsSelector,
  (lists) => {
    if (lists?.length > 0) {
      const _lists = lists.filter((_list) => _list.revenue);

      const _totalPrice = _lists.reduce((_price, curr) => {
        return _price + curr.revenue;
      }, 0);

      return _totalPrice;
    }
  }
);

// Tổng account await
export const filterTotalAccountAwaiting = createSelector(
  fetchApiUserDoctorsSelector,
  (listDoctor) => {
    if (listDoctor?.length > 0) {
      const _lists = listDoctor.filter(
        (_doctor) => _doctor.is_accepted === false && _doctor.deleted === false
      );

      return _lists.length;
    }
  }
);

// load list await browsing account for doctor with isAccepted: false
export const listAwaitBrowsingAccountDoctor = createSelector(
  fetchApiUserDoctorsSelector,
  (listAccount) => {
    // console.log("li", listAccount);
    if (listAccount) {
      const list = listAccount.filter(
        (_account) =>
          _account.is_accepted === false && _account.deleted === false
      );
      // console.log("l", list);
      return list;
    } else {
      return [];
    }
  }
);

// load all account deleted
// load list await browsing account for doctor with isAccepted: false
export const listAccountDoctorDeleted = createSelector(
  fetchApiUserDoctorsSelector,
  (listAccount) => {
    // console.log("all account ->", listAccount);
    if (listAccount) {
      const list = listAccount.filter((_account) => _account.deleted);
      // console.log("account deleted ->", list);
      return list;
    } else {
      return [];
    }
  }
);

// metric type BMI -> fetch api
export const listMetricTypeMBI = createSelector(
  fetchApiAllMetricSelector,
  (listMetricType) => {
    // console.log("listMetricType", listMetricType);
    const list = listMetricType.filter(
      (_metricType) => _metricType.type === "BMI"
    );

    return list;
  }
);

// metric type Glycemic -> fetch api
export const listMetricTypeGlycemic = createSelector(
  fetchApiAllMetricSelector,
  (listMetricType) => {
    // console.log("listMetricType", listMetricType);
    const list = listMetricType.filter(
      (_metricType) => _metricType.type === "GLYCEMIC"
    );
    // console.log("list", list);

    return list;
  }
);

// metric type Blood -> fetch api
export const listMetricTypeBlood = createSelector(
  fetchApiAllMetricSelector,
  (listMetricType) => {
    // console.log("listMetricType", listMetricType);
    const list = listMetricType.filter(
      (_metricType) => _metricType.type === "BLOOD"
    );
    // console.log("list", list);

    return list;
  }
);
