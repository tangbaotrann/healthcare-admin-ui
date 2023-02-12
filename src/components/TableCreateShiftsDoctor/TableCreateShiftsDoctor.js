// lib
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// me
import { Table } from "antd";
import TitleName from "../TitleName";
import "./TableCreateShiftsDoctor.css";
import { fetchApiAllShiftsDoctor } from "../../redux/features/shiftsSlice";
import { fetchApiAllShiftsDoctorSelector } from "../../redux/selector";

function TableCreateShiftsDoctor() {
  const dispatch = useDispatch();

  const shifts = useSelector(fetchApiAllShiftsDoctorSelector);

  useEffect(() => {
    dispatch(fetchApiAllShiftsDoctor());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cols
  const cols = [
    {
      key: "_id",
      title: "Id",
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
  ];

  return (
    <>
      <TitleName>Danh sách đã tạo ca làm cho Bác sĩ</TitleName>

      {/* Table list */}
      <Table
        columns={cols}
        dataSource={shifts.map((shift) => ({
          desc: shift.desc,
          name: shift.name,
          time_end: moment(shift.time_end).format("h:mm a"),
          time_start: moment(shift.time_start).format("h:mm a"),
          _id: shift._id,
        }))}
        rowKey="_id"
        // scroll={{ y: 800 }}
      ></Table>
    </>
  );
}

export default TableCreateShiftsDoctor;
