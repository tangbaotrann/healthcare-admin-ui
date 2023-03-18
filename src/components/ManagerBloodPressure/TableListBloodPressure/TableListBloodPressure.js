// lib
import { Table } from "antd";

// me
import TitleName from "../../TitleName/TitleName";

function TableListBloodPressure() {
  // cols
  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      width: "4%",
    },
    {
      key: "systolic",
      title: "Chỉ số tâm thu",
      dataIndex: "systolic",
      width: "10%",
    },
    {
      key: "diastole",
      title: "Chỉ số tâm trương",
      dataIndex: "diastole",
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
        // dataSource={metrics.map((metric, index) => ({
        //   index: index + 1,
        //   start: metric.start,
        //   end: metric.end,
        //   notification: metric.notification,
        //   type: metric.type,
        // }))}
        rowKey="index"
        style={{ height: "280px" }}
        scroll={{ y: 380 }}
      ></Table>
    </>
  );
}

export default TableListBloodPressure;
