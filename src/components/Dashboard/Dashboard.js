// lib
import moment from "moment";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";

// me
import "./Dashboard.css";
import Statistics from "./Statistics";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiUserDoctorsSelector,
  filterTotalAccountAwaiting,
  filterTotalDoctors,
  filterTotalPatients,
  filterTotalPriceOfAllDoctor,
  totalShifts,
} from "../../redux/selector";
import { useEffect } from "react";
import {
  fetchApiUserDoctors,
  fetchApiUserPatients,
} from "../../redux/features/userSlice";
import { fetchApiAllShiftsDoctor } from "../../redux/features/shiftsSlice";
import { endPoints } from "../../routers";

function Dashboard() {
  const checkToken = localStorage.getItem("token_user_login");
  const doctors = useSelector(fetchApiUserDoctorsSelector);
  const totalPrice = useSelector(filterTotalPriceOfAllDoctor);
  const totalDoctors = useSelector(filterTotalDoctors);
  const totalShift = useSelector(totalShifts);
  const totalAccountAwaiting = useSelector(filterTotalAccountAwaiting);
  const totalPatients = useSelector(filterTotalPatients);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log("doctors", doctors);
  // console.log("totalPrice", totalPrice);
  // console.log("totalPatients", totalPatients);
  // console.log("totalShift", totalShift);
  // console.log("totalAccountAwaiting", totalAccountAwaiting);
  // console.log("totalPatients", totalPatients);

  useEffect(() => {
    !checkToken && navigate(`${endPoints.login}`);
  }, [checkToken]);

  useEffect(() => {
    dispatch(fetchApiAllShiftsDoctor());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchApiUserDoctors());
  }, []);

  useEffect(() => {
    checkToken && dispatch(fetchApiUserPatients());
  }, [checkToken]);

  return (
    <div className="dashboard-wrapper">
      <span className="dashboard-date-now">
        {moment().format("dddd, Do MMM YYYY")}
      </span>

      <div className="dashboard-container">
        {/* Left */}
        <div className="dashboard-container-left">
          <CardItem
            totalDoctors={totalDoctors}
            totalPatients={totalPatients}
            totalShift={totalShift}
            totalAccountAwaiting={totalAccountAwaiting}
          />
          <Statistics totalPrice={totalPrice} doctors={doctors} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
