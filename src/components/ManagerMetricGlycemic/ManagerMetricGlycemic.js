// lib
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message, Modal, Select } from "antd";

// me
import "./ManagerMetricGlycemic.css";
import TitleName from "../TitleName";
import {
  fetchApiAllMetric,
  fetchApiMetricGlycemic,
} from "../../redux/features/metricSlice";
import TableListMetricGlycemic from "./TableListMetricGlycemic/TableListMetricGlycemic";

const { TextArea } = Input;

function ManagerMetricGlycemic({ getToken }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // console.log("token glycemic ->", getToken);

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
        fetchApiMetricGlycemic({
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
        <span>Chỉ số đường huyết</span>
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

          <Form.Item
            name="case_gly"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập nội dung.",
              },
            ]}
            hasFeedback
          >
            <Select
              options={[
                { label: "Trước bữa ăn", value: 1 },
                { label: "Sau bữa ăn", value: 2 },
                { label: "Trước khi ngủ", value: 3 },
              ]}
              placeholder="Lựa chọn"
            />
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
      <TableListMetricGlycemic getToken={getToken} />
    </>
  );
}

export default ManagerMetricGlycemic;
