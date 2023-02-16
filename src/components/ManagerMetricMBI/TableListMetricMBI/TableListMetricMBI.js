import { Table } from "antd";
import TitleName from "../../TitleName";

function TableListMetricMBI({ metrics }) {
  console.log("metrics", metrics);

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
      <TitleName>Danh sách chỉ số BMI</TitleName>

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
      ></Table>
    </>
  );
}

export default TableListMetricMBI;
