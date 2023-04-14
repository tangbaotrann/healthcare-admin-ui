// lib
import moment from "moment";
import CardItem from "./CardItem";

// me
import "./Dashboard.css";
import Statistics from "./Statistics";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiUserDoctorsSelector,
  fetchApiUserPatientsSelector,
} from "../../redux/selector";
import { useEffect } from "react";
import {
  fetchApiUserDoctors,
  fetchApiUserPatients,
} from "../../redux/features/userSlice";

function Dashboard() {
  const totalDoctors = useSelector(fetchApiUserDoctorsSelector);
  const totalPatients = useSelector(fetchApiUserPatientsSelector);

  const dispatch = useDispatch();

  console.log("totalDoctors", totalDoctors);
  console.log("totalPatients", totalPatients);

  useEffect(() => {
    dispatch(fetchApiUserDoctors());
  }, []);
  useEffect(() => {
    dispatch(fetchApiUserPatients());
  }, []);

  return (
    <div className="dashboard-wrapper">
      <span className="dashboard-date-now">
        {moment().format("dddd, Do MMM YYYY")}
      </span>

      <div className="dashboard-container">
        {/* Left */}
        <div className="dashboard-container-left">
          <CardItem totalDoctors={totalDoctors} />
          <Statistics />
        </div>

        {/* Right */}
        {/* <div className="dashboard-container-right">
                    <h1>Right</h1>
                </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
