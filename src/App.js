// lib
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// me
import { endPoints } from "./routers";
import Login from "./pages/Login";
import AdminManager from "./layouts/AdminManager/AdminManager";
import Register from "./pages/Register/Register";
import { useEffect, useState } from "react";
import { fetchApiLoginSelector } from "./redux/selector";

function App() {
  const [getToken, setGetToken] = useState();
  // const getToken = JSON.parse(localStorage.getItem("token_user_login"));

  const messageSuccess = useSelector(fetchApiLoginSelector);

  // console.log("getToken - app router", getToken);
  console.log("messageSuccess - app router", messageSuccess);
  console.log("getToken - app router", getToken);

  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem("token_user_login"));

    setGetToken(getToken);
  }, [messageSuccess?.accessToken]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path={endPoints.login} element={<Login />} />
        <Route
          path={endPoints.root}
          element={
            typeof getToken === "undefined" || !getToken ? (
              <Navigate replace to={endPoints.login} />
            ) : (
              <Navigate replace to={endPoints.admin} />
            )
          }
        />

        {/* Register */}
        <Route path={endPoints.register} element={<Register />} />

        {/* Admin */}
        <Route
          path={endPoints.admin}
          element={<AdminManager getToken={getToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
