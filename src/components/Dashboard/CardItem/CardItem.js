// me
import "./CardItem.css";

function CardItem({
  totalDoctors,
  totalPatients,
  totalShift,
  totalAccountAwaiting,
}) {
  return (
    <div className="card-item-wrapper">
      {/* Tổng Bác sĩ */}
      <div className="card-item">
        <div className="card-item-header">
          <span className="card-item-header-title">Tổng Bác Sĩ</span>
          <span className="card-item-header-change"></span>
        </div>

        <div className="card-item-footer">
          <span className="card-item-footer-type">{totalDoctors}</span>
        </div>
      </div>

      {/* Tổng số bệnh nhân */}
      <div className="card-item">
        <div className="card-item-header">
          <span className="card-item-header-title">Tổng Bệnh Nhân </span>
          <span className="card-item-header-change"></span>
        </div>

        <div className="card-item-footer">
          <span className="card-item-footer-type">{totalPatients}</span>
        </div>
      </div>

      {/* Tài khoản đợi duyệt */}
      <div className="card-item">
        <div className="card-item-header">
          <span className="card-item-header-title">Tài khoản đợi duyệt</span>
          <span className="card-item-header-change"></span>
        </div>

        <div className="card-item-footer">
          <span className="card-item-footer-type">{totalAccountAwaiting}</span>
        </div>
      </div>

      {/* Ca làm  */}
      <div className="card-item">
        <div className="card-item-header">
          <span className="card-item-header-title">Ca Làm </span>
          <span className="card-item-header-change"></span>
        </div>

        <div className="card-item-footer">
          <span className="card-item-footer-type">{totalShift}</span>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
