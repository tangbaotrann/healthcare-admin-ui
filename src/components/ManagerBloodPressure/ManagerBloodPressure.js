// lib
import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// me
import "./ManagerBloodPressure.css";
import TitleName from "../TitleName";
import TableListBloodPressure from "./TableListBloodPressure";
import {
  fetchApiAllMetric,
  fetchApiMetricBlood,
} from "../../redux/features/metricSlice";

const { TextArea } = Input;

function ManagerBloodPressure({ getToken }) {
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

  useEffect(() => {
    dispatch(fetchApiAllMetric());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle submit
  const handleOnFishSendNotification = (values) => {
    if (values) {
      dispatch(
        fetchApiMetricBlood({
          values: values,
          token: getToken,
        })
      );
      setShowModal(false);
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
              value: "BLOOD",
            },
          ]}
        >
          {/* Chỉ số diastole */}
          <Form.Item
            name="end"
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

          {/* Chỉ số systolic */}
          <Form.Item
            name="start"
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
      <TableListBloodPressure getToken={getToken} />
    </>
  );
}

export default ManagerBloodPressure;
