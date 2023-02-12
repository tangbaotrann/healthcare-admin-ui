//lib
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message, Modal, Select } from "antd";

// me
import "./CreateDaysDoctor.css";
import TitleName from "../TitleName";
import { fetchApiCreateDaysDoctor } from "../../redux/features/daysSlice";
import TableCreateDaysDoctor from "../TableCreateDaysDoctor/TableCreateDaysDoctor";

function CreateDaysDoctor() {
  const [showModal, setShowModal] = useState(false);
  const [weekDay, setWeekDay] = useState("");

  const dispatch = useDispatch();

  // show modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // hide modal
  const handleCancel = () => {
    setShowModal(false);
  };

  // handle change day number
  const handleChangeDayNumber = (value) => {
    setWeekDay(value);
  };

  // handle create day doctor
  const handleCreateDaysDoctor = (values) => {
    if (values) {
      dispatch(fetchApiCreateDaysDoctor(values));
      setShowModal(false);
      message.success("Bạn đã tạo thành công ngày làm cho Bác sĩ.");
    } else {
      message.error("Tạo ngày làm không thành công!");
      return;
    }
  };

  return (
    <div className="wrapper-create-days-doctor">
      <Button onClick={handleOpenModal} type="primary">
        Tạo ngày làm
      </Button>

      {/* Modal */}
      <Modal
        open={showModal}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
      >
        <TitleName>Tạo ngày làm cho Bác sĩ</TitleName>

        <div className="create-days-doctor-form">
          <Form
            onFinish={handleCreateDaysDoctor}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
            fields={[
              {
                name: ["day"],
                value: weekDay === "Chủ nhật" ? `${weekDay}` : `Thứ ${weekDay}`,
              },
            ]}
          >
            {/* day_number */}
            <Form.Item
              name="day_number"
              rules={[
                {
                  required: true,
                  message: "Bạn cần phải chọn ngày bằng số.",
                },
              ]}
              hasFeedback
            >
              <Select
                options={[
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                  { value: "7", label: "7" },
                  { value: "Chủ nhật", label: "8" },
                ]}
                onChange={handleChangeDayNumber}
                placeholder="Ngày bằng số..."
              />
            </Form.Item>

            {/* day */}
            <Form.Item
              name="day"
              rules={[
                {
                  required: true,
                  message: "Bạn cần phải nhập thứ.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Thứ trong tuần..." disabled />
            </Form.Item>

            {/* Button */}
            <Button
              className="create-days-doctor-form-btn"
              type="primary"
              htmlType="submit"
              block
            >
              Tạo ngày làm
            </Button>
          </Form>
        </div>
      </Modal>

      {/* List days */}
      <TableCreateDaysDoctor />
    </div>
  );
}

export default CreateDaysDoctor;
