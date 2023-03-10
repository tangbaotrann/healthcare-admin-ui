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

function ProfileDoctor() {
  const viewProfileDoctor = useSelector(fetchApiViewProfileDoctorByIdSelector);

  console.log("viewProfileDoctor", viewProfileDoctor);

  const dispatch = useDispatch();

  // handle Await Browsing Doctor
  const handleAwaitBrowsingDoctor = () => {
    dispatch(
      userSlice.actions.getIdAccountDoctor(viewProfileDoctor.doctor._id)
    );
    dispatch(
      fetchApiAwaitBrowsingRuleForDoctor({
        accountId: viewProfileDoctor.doctor._id,
        isAccepted: true,
      })
    );
    message.success("Bạn đã duyệt tài khoản cho Bác sĩ này thành công!");
  };

  // handle delete await browsing doctor
  const handleDeleteAwaitBrowsingDoctor = () => {
    dispatch(
      fetchApiDeleteAwaitBrowsingRuleForDoctor({
        accountId: viewProfileDoctor.doctor._id,
        deleted: true,
      })
    );
    message.error("Bạn đã từ chối duyệt tài khoản cho Bác sĩ này!");
  };

  return (
    <>
      <h1 className="view-profile-doctor-title">Thông tin của Bác sĩ</h1>

      {/* info profile doctor */}
      <div className="view-profile-doctor-container">
        <p>
          <b>- Chuyên gia:</b> {viewProfileDoctor.specialist?.join("")}
        </p>
        <p>
          <b>- Nơi đào tạo:</b> {viewProfileDoctor.training_place}
        </p>
        <p>
          <b>- Bằng cấp:</b> {viewProfileDoctor.degree}
        </p>
        <p>
          <b>- Ngôn ngữ:</b> {viewProfileDoctor.languages?.join("")}
        </p>
        <p>
          <b>- Chứng chỉ:</b> {viewProfileDoctor.certificate}
        </p>
        <p>
          <b>- Giáo dục:</b> {viewProfileDoctor.education}
        </p>
        <p>
          <b>- Kinh nghiệm:</b> {viewProfileDoctor.experiences?.join("")}
        </p>

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
      </div>
    </>
  );
}

export default ProfileDoctor;
