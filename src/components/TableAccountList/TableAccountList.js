// lib
import { Button, Table } from "antd";

function TableAccountList() {
  // columns
  const cols = [
    {
      key: "1",
      title: "Id",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Tài khoản",
      dataIndex: "account",
    },
    {
      key: "3",
      title: "Mật khẩu",
      dataIndex: "password",
    },
    {
      key: "4",
      title: "Ngày tạo",
      dataIndex: "createdAt",
    },
    {
      key: "5",
      title: "Hành động",
      render: () => {
        return (
          <>
            <Button type="primary" style={{ marginRight: "10px" }}>
              Duyệt
            </Button>
            <Button type="primary" danger>
              Không duyệt
            </Button>
          </>
        );
      },
    },
  ];

  // data
  const data = [
    {
      id: "001",
      account: "baotran",
      password: "***",
      createdAt: "09/01/2023",
    },
    {
      id: "002",
      account: "baotang",
      password: "***",
      createdAt: "11/01/2023",
    },
    {
      id: "003",
      account: "ltuan",
      password: "***",
      createdAt: "18/01/2023",
    },
  ];

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Danh sách duyệt tài khoản khi đăng ký tài khoản cho bác sĩ
      </h2>
      <Table dataSource={data} columns={cols} rowKey="id"></Table>
    </>
  );
}

export default TableAccountList;
