// lib
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "antd";
import { fetchApiUserDoctors } from "../../redux/features/userSlice";
import { fetchApiUserDoctorsSelector } from "../../redux/selector";
import moment from "moment";

function TableAccountList() {
  const dispatch = useDispatch();

  const listUsers = useSelector(fetchApiUserDoctorsSelector);

  console.log(listUsers);

  // fetch all user
  useEffect(() => {
    dispatch(fetchApiUserDoctors());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // columns
  const cols = [
    {
      key: "1",
      title: "Id",
      dataIndex: "account",
    },
    {
      key: "2",
      title: "Tài khoản",
      dataIndex: "username",
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
            <Button type="dashed" style={{ marginRight: "10px" }}>
              Xem profile
            </Button>
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

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Danh sách duyệt tài khoản khi đăng ký tài khoản cho bác sĩ
      </h2>
      <Table
        dataSource={listUsers.map((user) => ({
          account: user.person.account,
          username: user.person.username,
          password: "***",
          createdAt: moment(user.createdAt).format("YYYY-MM-DD"),
        }))}
        columns={cols}
        rowKey="id"
      ></Table>
    </>
  );
}

export default TableAccountList;
