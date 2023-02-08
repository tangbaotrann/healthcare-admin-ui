// lib
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "antd";
import moment from "moment";

// me
import "./TableAccountList.css";
import userSlice, {
  fetchApiAwaitBrowsingRuleForDoctor,
  fetchApiDeleteAwaitBrowsingRuleForDoctor,
  fetchApiUserDoctors,
  fetchApiViewProfileDoctorById,
} from "../../redux/features/userSlice";
import { listAwaitBrowsingAccountDoctor } from "../../redux/selector";
import ProfileDoctor from "../ProfileDoctor/ProfileDoctor";
import TitleName from "../TitleName/TitleName";

function TableAccountList() {
  const [showModalProfileDoctor, setShowModalProfileDoctor] = useState(false);

  const dispatch = useDispatch();

  const listUsers = useSelector(listAwaitBrowsingAccountDoctor);

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

  // handle view profile doctor
  const handleViewProfile = (record) => {
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
      title: "Id",
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
      title: "Hành động",
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
      <TitleName>
        Danh sách duyệt tài khoản khi đăng ký tài khoản cho bác sĩ
      </TitleName>
      <Table
        dataSource={listUsers.map((user) => ({
          account: user.person.account,
          username: user.person.username,
          password: "***",
          createdAt: moment(user.createdAt).format("YYYY-MM-DD"),
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
        <ProfileDoctor />
      </Modal>
    </>
  );
}

export default TableAccountList;
