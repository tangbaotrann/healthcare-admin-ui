// lib
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";

// me
import "./ProfileDoctor.css";
import { fetchApiViewProfileDoctorByIdSelector } from "../../redux/selector";
import userSlice, {
  fetchApiAwaitBrowsingRuleForDoctor,
  fetchApiDeleteAwaitBrowsingRuleForDoctor,
} from "../../redux/features/userSlice";
import moment from "moment";

function ProfileDoctor({ getToken, handleCancel }) {
  const viewProfileDoctor = useSelector(fetchApiViewProfileDoctorByIdSelector);

  // console.log("viewProfileDoctor", viewProfileDoctor);
  // console.log("token viewProfileDoctor", getToken);

  const dispatch = useDispatch();

  // handle Await Browsing Doctor
  const handleAwaitBrowsingDoctor = () => {
    if (getToken) {
      dispatch(
        userSlice.actions.getIdAccountDoctor(viewProfileDoctor.doctor._id)
      );
      dispatch(
        fetchApiAwaitBrowsingRuleForDoctor({
          account_id: viewProfileDoctor.doctor._id,
          is_accepted: true,
          token: getToken,
        })
      );
      message.success("Bạn đã duyệt tài khoản cho Bác sĩ này thành công!");
      handleCancel();
    } else {
      message.error("Duyệt tài khoản không thành công!");
    }
  };

  // handle delete await browsing doctor
  const handleDeleteAwaitBrowsingDoctor = () => {
    if (getToken) {
      dispatch(
        fetchApiDeleteAwaitBrowsingRuleForDoctor({
          account_id: viewProfileDoctor.doctor._id,
          deleted: true,
          token: getToken,
        })
      );
      message.success("Bạn đã từ chối duyệt tài khoản cho Bác sĩ này!");
      handleCancel();
    } else {
      message.error("Từ chối duyệt tài khoản không thành công!");
    }
  };

  // handle cancel account deleted
  const handleCancelAccountDeleted = () => {
    if (getToken) {
      dispatch(
        fetchApiDeleteAwaitBrowsingRuleForDoctor({
          account_id: viewProfileDoctor.doctor._id,
          deleted: false,
          token: getToken,
        })
      );
      message.success("Bạn đã bỏ chặn với tài khoản này!");
      handleCancel();
    } else {
      message.error("Bỏ chặn tài khoản không thành công!");
    }
  };

  return (
    <>
      <h1 className="view-profile-doctor-title">Thông tin của Bác sĩ</h1>

      {/* info profile doctor */}
      <div className="view-profile-doctor-container">
        <div style={{ margin: "0 auto" }}>
          <img
            className="acc-list-avatar-doctor"
            src={viewProfileDoctor?.doctor?.person?.avatar}
            alt="avatar-doctor"
          />
        </div>
        <p>
          <b>- Họ tên:</b> {viewProfileDoctor?.doctor?.person?.username}
        </p>
        <p>
          <b>- Giới tính:</b>{" "}
          {viewProfileDoctor?.doctor?.person?.gender === true ? "Nam" : "Nữ"}
        </p>
        <p>
          <b>- Năm sinh:</b>{" "}
          {moment(viewProfileDoctor?.doctor?.person?.dob).format("DD/MM/YYYY")}
        </p>
        <p>
          <b>- Địa chỉ:</b> {viewProfileDoctor?.doctor?.person?.address}
        </p>
        <p>
          <b>- Chuyên gia:</b> {viewProfileDoctor?.specialist?.join(" ")}
        </p>
        <p>
          <b>- Đảm nhận:</b>{" "}
          {viewProfileDoctor?.doctor?.work_type === "glycemic"
            ? "Bệnh đường huyết"
            : "Bệnh huyết áp"}
        </p>
        <p>
          <b>- Nơi đào tạo:</b> {viewProfileDoctor?.training_place}
        </p>
        <p>
          <b>- Bằng cấp:</b> {viewProfileDoctor?.degree}
        </p>
        <p>
          <b>- Ngôn ngữ:</b> {viewProfileDoctor?.languages?.join("")}
        </p>
        <p>
          <b>- Chứng chỉ:</b> {viewProfileDoctor?.certificate}
        </p>
        <p>
          <b>- Giáo dục:</b> {viewProfileDoctor?.education}
        </p>
        <p>
          <b>- Kinh nghiệm:</b> {viewProfileDoctor?.experiences?.join("")}
        </p>

        {viewProfileDoctor?.doctor?.deleted ? (
          <Button
            type="primary"
            danger
            style={{ marginRight: "10px", marginBottom: "10px" }}
            onClick={handleCancelAccountDeleted}
            block
          >
            Bỏ chặn
          </Button>
        ) : (
          <>
            <Button
              type="primary"
              style={{ marginRight: "10px", marginBottom: "10px" }}
              onClick={handleAwaitBrowsingDoctor}
              block
            >
              Duyệt
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDeleteAwaitBrowsingDoctor}
              block
            >
              Không duyệt
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileDoctor;
