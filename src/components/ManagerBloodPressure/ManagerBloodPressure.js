// lib
import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

// me
import "./ManagerBloodPressure.css";
import TitleName from "../TitleName";
import TableListBloodPressure from "./TableListBloodPressure";

const { TextArea } = Input;

function ManagerBloodPressure() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // show modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // hide modal
  const handleCancel = () => {
    setShowModal(false);
  };

  // handle submit
  const handleOnFishSendNotification = (values) => {
    console.log("values", values);
    if (values) {
      //   dispatch();
      // fetchApiMetricGlycemic({
      //   values: values,
      //   token: getToken,
      // })
      setShowModal(false);
      message.success("Tạo thông báo thành công.");
    } else {
      message.error("Tạo thông báo không thành công!");
      return;
    }
  };

  return (
    <>
      <Button className="create-glycemics-btn" onClick={handleOpenModal}>
        <span>Chỉ số huyết áp</span>
      </Button>

      {/* Modal */}
      <Modal
        open={showModal}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
      >
        <TitleName>Thông báo</TitleName>

        <Form
          onFinish={handleOnFishSendNotification}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
          fields={[
            {
              name: ["type"],
              value: "BLOOD_PRESSURE",
            },
          ]}
        >
          {/* Chỉ số systolic */}
          <Form.Item
            name="systolic"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập chỉ số tâm thu.",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Chỉ số tâm thu..." />
          </Form.Item>

          {/* Chỉ số diastole */}
          <Form.Item
            name="diastole"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập chỉ số tâm trương.",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Chỉ số tâm trương..." />
          </Form.Item>

          {/* Nội dung */}
          <Form.Item
            name="notification"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập nội dung.",
              },
            ]}
            hasFeedback
          >
            <TextArea rows={4} placeholder="Nội dung..." />
          </Form.Item>

          {/* Type */}
          <Form.Item name="type" hasFeedback style={{ display: "none" }}>
            <Input name="type" />
          </Form.Item>

          {/* Button */}
          <Button type="primary" htmlType="submit" block>
            Tạo thông báo
          </Button>
        </Form>
      </Modal>

      {/* Table list */}
      <TableListBloodPressure />
    </>
  );
}

export default ManagerBloodPressure;
