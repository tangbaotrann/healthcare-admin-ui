// lib
import { useSelector } from "react-redux";

// me
import DefaultLayout from "./layouts/DefaultLayout";
import TableAccountList from "./components/TableAccountList";
import CreateShiftsDoctor from "./components/CreateShiftsDoctor";
import { btnClickMenuChangeLayoutSelector } from "./redux/selector";
import CreateDaysDoctor from "./components/CreateDaysDoctor";
import ManagerMetricMBI from "./components/ManagerMetricMBI";
import ManagerMetricGlycemic from "./components/ManagerMetricGlycemic/ManagerMetricGlycemic";

function App() {
  const changeLayout = useSelector(btnClickMenuChangeLayoutSelector);
  console.log(changeLayout);

  return (
    <DefaultLayout>
      {changeLayout === "1" || changeLayout === null ? (
        <TableAccountList />
      ) : changeLayout === "2" ? (
        <CreateShiftsDoctor />
      ) : changeLayout === "3" ? (
        <CreateDaysDoctor />
      ) : changeLayout === "bmi" ? (
        <ManagerMetricMBI />
      ) : changeLayout === "glycemic" ? (
        <ManagerMetricGlycemic />
      ) : null}
    </DefaultLayout>
  );
}

export default App;
