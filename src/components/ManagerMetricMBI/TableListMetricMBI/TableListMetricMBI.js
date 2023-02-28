import { Table } from "antd";
import TitleName from "../../TitleName";

function TableListMetricMBI({ metrics }) {
  console.log("metrics - bmi", metrics);

  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "start",
      title: "Chỉ số bắt đầu",
      dataIndex: "start",
    },
    {
      key: "end",
      title: "Chỉ số kết thúc",
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
      <TitleName>Danh Sách Chỉ Số BMI</TitleName>

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

export default TableListMetricMBI;
