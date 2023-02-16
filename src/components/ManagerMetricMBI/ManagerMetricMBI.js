// lib
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Modal } from "antd";

// me
import TitleName from "../TitleName";
import {
  fetchApiAllMetric,
  fetchApiMetricBMI,
} from "../../redux/features/metricSlice";
import { listMetricType, listMetricTypeMBI } from "../../redux/selector";
import TableListMetricMBI from "./TableListMetricMBI/TableListMetricMBI";

const { TextArea } = Input;

function ManagerMetricMBI() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const metrics = useSelector(listMetricTypeMBI);

  useEffect(() => {
    dispatch(fetchApiAllMetric());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // show modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // hide modal
  const handleCancel = () => {
    setShowModal(false);
  };

  // handle submit form
  const handleOnFishSendNotification = (values) => {
    if (values) {
      dispatch(fetchApiMetricBMI(values));
      message.success("Tạo thông báo thành công!");
      setShowModal(false);
    } else {
      message.error("Tạo thông báo không thành công!");
      return;
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Chỉ số BMI
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
              value: "BMI",
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
      <TableListMetricMBI metrics={metrics} />
    </>
  );
}

export default ManagerMetricMBI;
