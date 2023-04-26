// lib
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// me
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import constants from "../../utils/constants";
import TableAccountList from "../../components/TableAccountList";
import CreateShiftsDoctor from "../../components/CreateShiftsDoctor";
import CreateDaysDoctor from "../../components/CreateDaysDoctor";
import ManagerMetricMBI from "../../components/ManagerMetricMBI";
import ManagerMetricGlycemic from "../../components/ManagerMetricGlycemic";
import { btnClickMenuChangeLayoutSelector } from "../../redux/selector";
import Dashboard from "../../components/Dashboard/Dashboard";
import ManagerBloodPressure from "../../components/ManagerBloodPressure/ManagerBloodPressure";

function AdminManager({ getToken }) {
  const changeLayout = useSelector(btnClickMenuChangeLayoutSelector);

  return (
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
  );
}

export default AdminManager;
