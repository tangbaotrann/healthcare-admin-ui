// lib
import { Table } from "antd";
import moment from "moment";

// me
import "./TableCreateShiftsDoctor.css";
import TitleName from "../TitleName";

function TableCreateShiftsDoctor({ shifts }) {
  // cols
  const cols = [
    {
      key: "_id",
      title: "#",
      dataIndex: "_id",
    },
    {
      key: "name",
      title: "Ca làm",
      dataIndex: "name",
      sorter: (a, b) => a.name > b.name,
    },
    {
      key: "desc",
      title: "Mô tả",
      dataIndex: "desc",
    },
    {
      key: "time_start",
      title: "Thời gian bắt đầu làm",
      dataIndex: "time_start",
      sorter: (a, b) => a.time_start > b.time_start,
    },
    {
      key: "time_end",
      title: "Thời gian kết thúc ca làm",
      dataIndex: "time_end",
    },
    {
      key: "shift_day",
      title: "Ngày làm",
      dataIndex: "shift_day",
    },
  ];

  return (
    <>
      <TitleName>Danh Sách Đã Tạo Ca Làm Cho Bác Sĩ</TitleName>

      {/* Table list */}
      <Table
        columns={cols}
        dataSource={shifts.map((shift, index) => ({
          desc: shift.desc,
          name: shift.name,
          time_end: moment(shift.time_end).format("h:mm a"),
          time_start: moment(shift.time_start).format("h:mm a"),
          _id: index + 1,
          shift_day: moment(shift.time_end).format("DD/MM/YYYY"),
        }))}
        rowKey="_id"
        // style={{ height: "100px" }}
        // scroll={{ y: 360 }}
      ></Table>
    </>
  );
}

export default TableCreateShiftsDoctor;
