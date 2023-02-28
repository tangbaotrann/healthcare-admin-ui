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
    },
    {
      key: "start",
      title: "Chỉ số bắt đầu (mg/dl)",
      dataIndex: "start",
    },
    {
      key: "end",
      title: "Chỉ số kết thúc (mg/dl)",
      dataIndex: "end",
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
    },
  ];

  return (
    <>
      <TitleName>Danh Sách Chỉ Số Glycemic</TitleName>

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
        style={{ height: "300px" }}
        scroll={{ y: 400 }}
      ></Table>
    </>
  );
}

export default TableListMetricGlycemic;
