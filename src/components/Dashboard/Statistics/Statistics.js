// me
import { ArrowUpOutlined } from "@ant-design/icons";
import { Divider, Select } from "antd";
import { useDispatch } from "react-redux";

import "./Statistics.css";
import StatisticsChart from "../StatisticsChart";
import { groupNumber } from "../../../utils/formatPrice";
import { fetchApiPatientById } from "../../../redux/features/userSlice";

function Statistics({ totalPrice, doctors }) {
  const dispatch = useDispatch();

  const handleChangeSelectDoctor = (value) => {
    console.log("value", value);
    dispatch(fetchApiPatientById(value));
  };

  return (
    <div className="statistics-wrapper">
      <h2 className="statistics-title">Thống Kê Tổng Quan</h2>

      <Divider />

      <div className="overview-statistics">
        <div className="overview-statistics-item-side">
          <ArrowUpOutlined className="item-side-icon" />
          <div className="item-side-text">
            <p className="item-side-top">Doanh thu tổng tiền của các bác sĩ</p>
            <p className="item-side-bottom">
              {groupNumber(totalPrice) || 0} VNĐ
            </p>
          </div>
        </div>

        <div>
          <Select
            style={{ width: "220px" }}
            placeholder="Chọn bác sĩ..."
            allowClear
            onChange={handleChangeSelectDoctor}
          >
            {doctors
              .filter(
                (__doctor) =>
                  __doctor.is_accepted === true && __doctor.deleted === false
              )
              .map((_doctor) => {
                return (
                  <Select.Option key={_doctor._id} value={_doctor._id}>
                    {_doctor.person.username}
                  </Select.Option>
                );
              })}
          </Select>
        </div>

        {/* <div className="overview-statistics-item">
          <p className="item-side-top">Items</p>
          <p className="item-side-bottom">400</p>
        </div> */}

        {/* <div className="overview-statistics-item">
          <p className="item-side-top">Profit</p>
          <p className="item-side-bottom">$ {groupNumber(30000)}</p>
        </div> */}
      </div>

      <Divider />

      {/* Chart statistics */}
      <StatisticsChart doctors={doctors} />
    </div>
  );
}

export default Statistics;
