import { createSelector } from "@reduxjs/toolkit";

// all user
export const fetchApiUserDoctorsSelector = (state) => state.userSlice.data;

// all shifts
export const fetchApiAllShiftsDoctorSelector = (state) =>
  state.shiftsSlice.data;

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

// load list await browsing account for doctor with isAccepted: false
export const listAwaitBrowsingAccountDoctor = createSelector(
  fetchApiUserDoctorsSelector,
  (listAccount) => {
    const list = listAccount.filter(
      (_account) => _account.isAccepted === false && _account.deleted === false
    );
    return list;
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
    console.log("list", list);

    return list;
  }
);
