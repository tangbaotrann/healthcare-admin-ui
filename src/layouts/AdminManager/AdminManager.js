// lib
import { useSelector } from "react-redux";

// me
import "./AdminManager.css";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import constants from "../../utils/constants";
import TableAccountList from "../../components/TableAccountList";
import CreateShiftsDoctor from "../../components/CreateShiftsDoctor";
import CreateDaysDoctor from "../../components/CreateDaysDoctor";
import ManagerMetricMBI from "../../components/ManagerMetricMBI";
import ManagerMetricGlycemic from "../../components/ManagerMetricGlycemic";
import {
  btnClickMenuChangeLayoutSelector,
  isLoadingFetchApiAllCreateDaysDoctorSelector,
  isLoadingFetchApiAllMetric,
  isLoadingFetchApiAllShiftsDoctorSelector,
  isLoadingFetchApiUserDoctorsSelector,
} from "../../redux/selector";
import Dashboard from "../../components/Dashboard/Dashboard";
import ManagerBloodPressure from "../../components/ManagerBloodPressure/ManagerBloodPressure";

function AdminManager({ getToken }) {
  const changeLayout = useSelector(btnClickMenuChangeLayoutSelector);
  const isLoadingUserDoctors = useSelector(
    isLoadingFetchApiUserDoctorsSelector
  );
  const isLoadingAllShiftsDoctor = useSelector(
    isLoadingFetchApiAllShiftsDoctorSelector
  );
  const isLoadingAllDaysDoctor = useSelector(
    isLoadingFetchApiAllCreateDaysDoctorSelector
  );
  const isLoadingAllMetric = useSelector(isLoadingFetchApiAllMetric);

  return (
    <>
      {(isLoadingUserDoctors ||
        isLoadingAllShiftsDoctor ||
        isLoadingAllDaysDoctor ||
        isLoadingAllMetric) && (
        <div className="loading-main">
          <div className="loader"></div>
        </div>
      )}
      <DefaultLayout>
        {changeLayout === constants.layoutDashboard || changeLayout === null ? (
          <Dashboard />
        ) : changeLayout === constants.layoutListAccount ? (
          <TableAccountList getToken={getToken} />
        ) : changeLayout === constants.layoutShiftsDoctor ? (
          <CreateShiftsDoctor getToken={getToken} />
        ) : changeLayout === constants.layoutDaysDoctor ? (
          <CreateDaysDoctor getToken={getToken} />
        ) : changeLayout === constants.layoutMetricTypeMBI ? (
          <ManagerMetricMBI getToken={getToken} />
        ) : changeLayout === constants.layoutMetricTypeGlycemic ? (
          <ManagerMetricGlycemic getToken={getToken} />
        ) : changeLayout === constants.layoutMetricTypeBloodPressure ? (
          <ManagerBloodPressure getToken={getToken} />
        ) : null}
      </DefaultLayout>
    </>
  );
}

export default AdminManager;
