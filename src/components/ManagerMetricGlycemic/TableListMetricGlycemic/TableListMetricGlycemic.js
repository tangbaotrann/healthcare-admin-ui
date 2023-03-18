// lib
import { useSelector } from "react-redux";
import { Table } from "antd";

// me
import TitleName from "../../TitleName";
import { listMetricTypeGlycemic } from "../../../redux/selector";

function TableListMetricGlycemic() {
  const metrics = useSelector(listMetricTypeGlycemic);

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
      title: "Chỉ số bắt đầu (mg/dl)",
      dataIndex: "start",
      width: "10%",
    },
    {
      key: "end",
      title: "Chỉ số kết thúc (mg/dl)",
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
      <TitleName>Danh Sách Chỉ Số Đường Huyết</TitleName>

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
        style={{ height: "280px" }}
        scroll={{ y: 380 }}
      ></Table>
    </>
  );
}

export default TableListMetricGlycemic;
