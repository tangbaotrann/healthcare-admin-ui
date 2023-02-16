// lib
import { useSelector } from "react-redux";

// me
import DefaultLayout from "./layouts/DefaultLayout";
import constants from "./utils/constants";
import TableAccountList from "./components/TableAccountList";
import CreateShiftsDoctor from "./components/CreateShiftsDoctor";
import { btnClickMenuChangeLayoutSelector } from "./redux/selector";
import CreateDaysDoctor from "./components/CreateDaysDoctor";
import ManagerMetricMBI from "./components/ManagerMetricMBI";
import ManagerMetricGlycemic from "./components/ManagerMetricGlycemic";

function App() {
  const changeLayout = useSelector(btnClickMenuChangeLayoutSelector);
  console.log(changeLayout);

  return (
    <DefaultLayout>
      {changeLayout === constants.layoutListAccount || changeLayout === null ? (
        <TableAccountList />
      ) : changeLayout === constants.layoutShiftsDoctor ? (
        <CreateShiftsDoctor />
      ) : changeLayout === constants.layoutDaysDoctor ? (
        <CreateDaysDoctor />
      ) : changeLayout === constants.layoutMetricTypeMBI ? (
        <ManagerMetricMBI />
      ) : changeLayout === constants.layoutMetricTypeGlycemic ? (
        <ManagerMetricGlycemic />
      ) : null}
    </DefaultLayout>
  );
}

export default App;
