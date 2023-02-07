// lib
import { useSelector } from "react-redux";

// me
import "./ProfileDoctor.css";
import { fetchApiViewProfileDoctorByIdSelector } from "../../redux/selector";

function ProfileDoctor() {
  const viewProfileDoctor = useSelector(fetchApiViewProfileDoctorByIdSelector);

  console.log("viewProfileDoctor", viewProfileDoctor);

  return (
    <>
      <h1 className="view-profile-doctor-title">
        Thông tin profile của Bác sĩ
      </h1>

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
      </div>
    </>
  );
}

export default ProfileDoctor;
