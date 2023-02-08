// lib
import { useSelector } from "react-redux";

// me
import DefaultLayout from "./layouts/DefaultLayout";
import TableAccountList from "./components/TableAccountList";
import CreateShiftsDoctor from "./components/CreateShiftsDoctor/CreateShiftsDoctor";
import { btnClickMenuChangeLayoutSelector } from "./redux/selector";

function App() {
  const changeLayout = useSelector(btnClickMenuChangeLayoutSelector);

  return (
    <DefaultLayout>
      {changeLayout === "1" || changeLayout === undefined ? (
        <TableAccountList />
      ) : changeLayout === "2" ? (
        <CreateShiftsDoctor />
      ) : null}
    </DefaultLayout>
  );
}

export default App;
