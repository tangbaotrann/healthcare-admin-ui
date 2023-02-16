// lib
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message, Modal } from "antd";

// me
import TitleName from "../TitleName";
import { fetchApiMetricGlycemic } from "../../redux/features/metricSlice";
import TableListMetricGlycemic from "./TableListMetricGlycemic/TableListMetricGlycemic";

const { TextArea } = Input;

function ManagerMetricGlycemic() {
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
    if (values) {
      dispatch(fetchApiMetricGlycemic(values));
      setShowModal(false);
      message.success("Tạo thông báo thành công.");
    } else {
      message.error("Tạo thông báo không thành công!");
      return;
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Chỉ số Glycemic
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
              value: "GLYCEMIC",
            },
          ]}
        >
          {/* Chỉ số bắt đầu */}
          <Form.Item
            name="start"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập chỉ số bắt đầu.",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Chỉ số bắt đầu..." />
          </Form.Item>

          {/* Chỉ số kết thúc */}
          <Form.Item
            name="end"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập chỉ số kết thúc.",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Chỉ số kết thúc..." />
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
            <Input />
          </Form.Item>

          {/* Button */}
          <Button type="primary" htmlType="submit" block>
            Tạo thông báo
          </Button>
        </Form>
      </Modal>

      {/* Table list */}
      <TableListMetricGlycemic />
    </>
  );
}

export default ManagerMetricGlycemic;
