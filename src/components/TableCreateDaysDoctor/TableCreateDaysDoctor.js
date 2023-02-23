// lib
import { Table } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

// me
import "./TableCreateDaysDoctor.css";
import TitleName from "../TitleName";
import { fetchApiAllCreateDaysDoctorSelector } from "../../redux/selector";
import { fetchApiAllCreateDaysDoctor } from "../../redux/features/daysSlice";

function TableCreateDaysDoctor() {
  const dispatch = useDispatch();

  const days = useSelector(fetchApiAllCreateDaysDoctorSelector);

  console.log("days", days);

  useEffect(() => {
    dispatch(fetchApiAllCreateDaysDoctor());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cols
  const cols = [
    {
      key: "_id",
      title: "#",
      dataIndex: "_id",
    },
    {
      key: "day",
      title: "Thứ",
      dataIndex: "day",
    },
    {
      key: "day_number",
      title: "Ngày bằng số",
      dataIndex: "day_number",
      sorter: (a, b) => a.day_number - b.day_number,
    },
  ];

  return (
    <>
      <TitleName>Danh Sách Đã Tạo Ngày Làm Cho Bác Sĩ</TitleName>

      <Table
        columns={cols}
        dataSource={days.map((day, index) => ({
          _id: index + 1,
          day: moment(day.day).format("dddd"),
          day_number: day.day_number,
        }))}
        rowKey="_id"
        style={{ height: "100px" }}
        scroll={{ y: 360 }}
      ></Table>
    </>
  );
}

export default TableCreateDaysDoctor;
