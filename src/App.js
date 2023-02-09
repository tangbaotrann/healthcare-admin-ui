// lib
import { useSelector } from "react-redux";

// me
import DefaultLayout from "./layouts/DefaultLayout";
import TableAccountList from "./components/TableAccountList";
import CreateShiftsDoctor from "./components/CreateShiftsDoctor/CreateShiftsDoctor";
import { btnClickMenuChangeLayoutSelector } from "./redux/selector";
import CreateDaysDoctor from "./components/CreateDaysDoctor/CreateDaysDoctor";

function App() {
  const changeLayout = useSelector(btnClickMenuChangeLayoutSelector);

  return (
    <DefaultLayout>
      {changeLayout === "1" || changeLayout === null ? (
        <TableAccountList />
      ) : changeLayout === "2" ? (
        <CreateShiftsDoctor />
      ) : changeLayout === "3" ? (
        <CreateDaysDoctor />
      ) : null}
    </DefaultLayout>
  );
}

export default App;
