// lib
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "antd";
import userSlice, {
  fetchApiAwaitBrowsingRuleForDoctor,
  fetchApiDeleteAwaitBrowsingRuleForDoctor,
  fetchApiUserDoctors,
} from "../../redux/features/userSlice";
import { listAwaitBrowsingAccountDoctor } from "../../redux/selector";
import moment from "moment";

function TableAccountList() {
  const dispatch = useDispatch();

  // fetchApiUserDoctorsSelector
  const listUsers = useSelector(listAwaitBrowsingAccountDoctor);

  console.log(listUsers);

  // fetch all user
  useEffect(() => {
    dispatch(fetchApiUserDoctors());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle Await Browsing Doctor
  const handleAwaitBrowsingDoctor = (record) => {
    dispatch(userSlice.actions.getIdAccountDoctor(record._id));
    dispatch(
      fetchApiAwaitBrowsingRuleForDoctor({
        accountId: record._id,
        isAccepted: true,
      })
    );
  };

  // handle delete await browsing doctor
  const handleDeleteAwaitBrowsingDoctor = (record) => {
    dispatch(
      fetchApiDeleteAwaitBrowsingRuleForDoctor({
        accountId: record._id,
        deleted: true,
      })
    );
  };

  // columns
  const cols = [
    {
      key: "account",
      title: "Id",
      dataIndex: "account",
    },
    {
      key: "username",
      title: "Tài khoản",
      dataIndex: "username",
    },
    {
      key: "password",
      title: "Mật khẩu",
      dataIndex: "password",
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
    },
    {
      key: "5",
      title: "Hành động",
      render: (record) => {
        return (
          <>
            <Button type="dashed" style={{ marginRight: "10px" }}>
              Xem profile
            </Button>
            <Button
              type="primary"
              style={{ marginRight: "10px" }}
              onClick={() => handleAwaitBrowsingDoctor(record)}
            >
              Duyệt
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteAwaitBrowsingDoctor(record)}
            >
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
          _id: user._id,
        }))}
        columns={cols}
        rowKey="account"
      ></Table>
    </>
  );
}

export default TableAccountList;
