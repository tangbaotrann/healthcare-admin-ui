// lib
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Modal, Select } from "antd";

// me
import "./ManagerMetricMBI.css";
import TitleName from "../TitleName";
import {
  fetchApiAllMetric,
  fetchApiMetricBMI,
} from "../../redux/features/metricSlice";
import { listMetricTypeMBI } from "../../redux/selector";
import TableListMetricMBI from "./TableListMetricMBI/TableListMetricMBI";

const { TextArea } = Input;

function ManagerMetricMBI({ getToken }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const metrics = useSelector(listMetricTypeMBI);

  // console.log("token bmi ->", getToken);
  // console.log("metrics bmi ->", metrics);

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
      dispatch(
        fetchApiMetricBMI({
          values: values,
          token: getToken,
        })
      );
      setShowModal(false);
    }
  };

  return (
    <>
      <Button className="create-bmis-btn" onClick={handleOpenModal}>
        <span>Chỉ số BMI</span>
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

          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: "Bạn cần phải chọn giới tính.",
              },
            ]}
            hasFeedback
          >
            <Select
              options={[
                { label: "Nam", value: 0 },
                { label: "Nữ", value: 1 },
              ]}
              placeholder="Giới tính"
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
      <TableListMetricMBI metrics={metrics} getToken={getToken} />
    </>
  );
}

export default ManagerMetricMBI;
