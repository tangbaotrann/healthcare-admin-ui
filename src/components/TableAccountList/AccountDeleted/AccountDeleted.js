import { useSelector } from "react-redux";
import TitleName from "../../TitleName/TitleName";
import { listAccountDoctorDeleted } from "../../../redux/selector";
import { Button, Modal, Table } from "antd";
import moment from "moment";
import ProfileDoctor from "../../ProfileDoctor/ProfileDoctor";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchApiUserDoctors,
  fetchApiViewProfileDoctorById,
} from "../../../redux/features/userSlice";

function AccountDeleted({ getToken }) {
  const [showModalProfileDoctor, setShowModalProfileDoctor] = useState(false);

  const dispatch = useDispatch();

  const listAccountDeleted = useSelector(listAccountDoctorDeleted);

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

  return (
    <div>
      <TitleName>Danh Sách Tài Khoản Đã Bị Chặn</TitleName>

      <Table
        dataSource={listAccountDeleted.map((user, index) => ({
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
        centered={true}
      >
        <ProfileDoctor getToken={getToken} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
}

export default AccountDeleted;
