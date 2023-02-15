// lib
import { Table } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// me
import "./TableCreateDaysDoctor.css";
import TitleName from "../TitleName";
import { fetchApiAllCreateDaysDoctorSelector } from "../../redux/selector";
import { fetchApiAllCreateDaysDoctor } from "../../redux/features/daysSlice";

function TableCreateDaysDoctor() {
  const dispatch = useDispatch();

  const days = useSelector(fetchApiAllCreateDaysDoctorSelector);

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
      <TitleName>Danh sách đã tạo ca làm cho Bác sĩ</TitleName>

      <Table
        columns={cols}
        dataSource={days.map((day, index) => ({
          _id: index + 1,
          day: day.day,
          day_number: day.day_number,
        }))}
        rowKey="_id"
      ></Table>
    </>
  );
}

export default TableCreateDaysDoctor;
