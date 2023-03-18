// lib
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "antd";
import moment from "moment";

// me
import "./TableAccountList.css";
import {
  fetchApiUserDoctors,
  fetchApiViewProfileDoctorById,
} from "../../redux/features/userSlice";
import { listAwaitBrowsingAccountDoctor } from "../../redux/selector";
import ProfileDoctor from "../ProfileDoctor/ProfileDoctor";
import TitleName from "../TitleName/TitleName";

function TableAccountList({ getToken }) {
  const [showModalProfileDoctor, setShowModalProfileDoctor] = useState(false);

  const dispatch = useDispatch();

  const listUsers = useSelector(listAwaitBrowsingAccountDoctor);

  console.log("token tbl account list ->", getToken);

  // fetch all user
  useEffect(() => {
    dispatch(fetchApiUserDoctors());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle view profile doctor
  const handleViewProfile = (record) => {
    console.log(record);
    dispatch(fetchApiViewProfileDoctorById(record));
    setShowModalProfileDoctor(true);
  };

  // close modal view profile doctor
  const handleCancel = () => {
    setShowModalProfileDoctor(false);
  };

  // columns
  const cols = [
    {
      key: "account",
      title: "#",
      dataIndex: "account",
    },
    {
      key: "username",
      title: "Tài khoản",
      dataIndex: "username",
      sorter: (a, b) => a.username > b.username,
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
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      key: "5",
      render: (record) => {
        return (
          <>
            <Button
              type="dashed"
              style={{ marginRight: "10px" }}
              onClick={() => handleViewProfile(record)}
            >
              Xem profile
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <TitleName>
        Danh Sách Duyệt Tài Khoản Khi Đăng Ký Tài Khoản Cho Bác Sĩ
      </TitleName>
      <Table
        dataSource={listUsers.map((user, index) => ({
          // user.person.account
          account: index + 1,
          username: user.person.username,
          password: "***",
          createdAt: moment(user.createdAt).format("DD-MM-YYYY"),
          person: user.person,
          _id: user._id,
        }))}
        columns={cols}
        rowKey="account"
      ></Table>

      {/* View profile doctor */}
      <Modal
        open={showModalProfileDoctor}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <ProfileDoctor getToken={getToken} />
      </Modal>
    </>
  );
}

export default TableAccountList;
