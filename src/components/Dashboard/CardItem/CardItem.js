// me
import "./CardItem.css";

function CardItem({ totalDoctors }) {
  //   const getTotalScheduleOfDoctor = useSelector(totalScheduleOfDoctor);
  //   const getTotalAppointmentScheduleOfDoctor = useSelector(
  //     totalAppointmentScheduleOfDoctor
  //   );
  //   const getTotalPatients = useSelector(totalPatients);

  return (
    <div className="card-item-wrapper">
      {/* Tổng lịch khám */}
      <div className="card-item">
        <div className="card-item-header">
          <span className="card-item-header-title">Tổng Bác Sĩ</span>
          <span className="card-item-header-change"></span>
        </div>

        <div className="card-item-footer">
          <span className="card-item-footer-type">{totalDoctors.length}</span>
          <span className="card-item-footer-amount">
            {/* {getTotalScheduleOfDoctor} */}
          </span>
        </div>
      </div>

      {/* Lịch hẹn khám */}
      <div className="card-item">
        <div className="card-item-header">
          <span className="card-item-header-title">
            Lịch Chờ Xác Nhận Khám{" "}
          </span>
          <span className="card-item-header-change"></span>
        </div>

        <div className="card-item-footer">
          <span className="card-item-footer-type"> </span>
          <span className="card-item-footer-amount">
            {/* {getTotalAppointmentScheduleOfDoctor} */}
          </span>
        </div>
      </div>

      {/* Ca làm  */}
      <div className="card-item">
        <div className="card-item-header">
          <span className="card-item-header-title">Ca Làm </span>
          <span className="card-item-header-change"></span>
        </div>

        <div className="card-item-footer">
          <span className="card-item-footer-type"> </span>
          {/* <span className="card-item-footer-amount">{schedules.length}</span> */}
        </div>
      </div>

      {/* Tổng số bệnh nhân */}
      <div className="card-item">
        <div className="card-item-header">
          <span className="card-item-header-title">Tổng Số Bệnh Nhân </span>
          <span className="card-item-header-change"></span>
        </div>

        <div className="card-item-footer">
          <span className="card-item-footer-type"> </span>
          {/* <span className="card-item-footer-amount">{getTotalPatients}</span> */}
        </div>
      </div>
    </div>
  );
}

export default CardItem;