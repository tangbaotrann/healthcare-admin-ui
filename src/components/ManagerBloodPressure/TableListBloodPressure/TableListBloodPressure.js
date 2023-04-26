// lib
import { Table } from "antd";
import { useSelector } from "react-redux";

// me
import TitleName from "../../TitleName/TitleName";
import { listMetricTypeBlood } from "../../../redux/selector";

function TableListBloodPressure() {
  const metrics = useSelector(listMetricTypeBlood);
  console.log("blood", metrics);
  // cols
  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      width: "4%",
    },
    {
      key: "start",
      title: "Chỉ số tâm thu",
      dataIndex: "start",
      width: "10%",
    },
    {
      key: "end",
      title: "Chỉ số tâm trương",
      dataIndex: "end",
      width: "10%",
    },
    {
      key: "notification",
      title: "Thông báo",
      dataIndex: "notification",
    },
    {
      key: "type",
      title: "Loại chỉ số",
      dataIndex: "type",
      width: "10%",
    },
  ];

  return (
    <>
      <TitleName>Danh Sách Chỉ Số Huyết Áp</TitleName>

      <Table
        columns={cols}
        dataSource={metrics.map((metric, index) => ({
          index: index + 1,
          start: metric.start,
          end: metric.end,
          notification: metric.notification,
          type: metric.type,
        }))}
        rowKey="index"
        // style={{ height: "280px" }}
        // scroll={{ y: 380 }}
      ></Table>
    </>
  );
}

export default TableListBloodPressure;
