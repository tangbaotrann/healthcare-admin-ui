// lib
import { Table } from "antd";
import moment from "moment";

// me
import "./TableCreateDaysDoctor.css";
import TitleName from "../TitleName";
import "moment/locale/vi"; // without this line it didn't work
moment.locale("vi");

function TableCreateDaysDoctor({ daysCreate }) {
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
    // {
    //   key: "day_number",
    //   title: "Ngày bằng số",
    //   dataIndex: "day_number",
    //   sorter: (a, b) => a.day_number - b.day_number,
    // },
  ];

  return (
    <>
      <TitleName>Danh Sách Đã Tạo Ngày Làm Cho Bác Sĩ</TitleName>

      <Table
        columns={cols}
        dataSource={daysCreate.map((day, index) => ({
          _id: index + 1,
          day: moment(day.day).format("dddd"),
          // day_number: day.day_number,
        }))}
        rowKey="_id"
      ></Table>
    </>
  );
}

export default TableCreateDaysDoctor;
