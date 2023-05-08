import { Button, Form, Input, Modal, Table, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

import TitleName from "../../TitleName";
import { fetchApiUpdatedNotificationRule } from "../../../redux/features/metricSlice";
import moment from "moment";

const { TextArea } = Input;

function TableListMetricMBI({ metrics, getToken }) {
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState();

  const dispatch = useDispatch();

  // console.log("metrics - bmi", metrics);

  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      width: "4%",
    },
    {
      key: "start",
      title: "Chỉ số bắt đầu",
      dataIndex: "start",
      width: "10%",
    },
    {
      key: "end",
      title: "Chỉ số kết thúc",
      dataIndex: "end",
      width: "10%",
    },
    {
      key: "gender",
      title: "Giới tính",
      dataIndex: "gender",
      filters: [
        { text: "Nam", value: "Nam" },
        { text: "Nữ", value: "Nữ" },
      ],
      onFilter: (value, record) => {
        return record.gender === value;
      },
    },
    {
      key: "notification",
      title: "Thông báo",
      dataIndex: "notification",
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
    },
    {
      key: "type",
      title: "Loại chỉ số",
      dataIndex: "type",
      width: "10%",
    },
    {
      key: "updated",
      render: (record) => {
        return (
          <Button
            type="primary"
            onClick={() => handleUpdatedNotificationRule(record)}
          >
            Cập nhật thông báo
          </Button>
        );
      },
    },
  ];

  const handleUpdatedNotificationRule = (record) => {
    setOpenModal(true);
    setNotification(record);
  };

  const handleHideModal = () => {
    setOpenModal(false);
  };

  const handleSubmitForm = (values) => {
    if (values && getToken) {
      dispatch(
        fetchApiUpdatedNotificationRule({
          values: values,
          token: getToken,
        })
      );
      setOpenModal(false);
      message.success("Bạn đã cập nhật thành công tập luật cho chỉ số này.");
    } else {
      message.error(
        "Bạn không có quyền cập nhật tập luật này. Vui lòng thử lại!"
      );
    }
  };

  return (
    <>
      <TitleName>Danh Sách Chỉ Số BMI</TitleName>

      <Table
        columns={cols}
        dataSource={metrics.map((metric, index) => ({
          index: index + 1,
          start: metric.start,
          end: metric.end,
          notification: metric.notification,
          type: metric.type,
          gender: metric.gender === true ? "Nam" : "Nữ",
          createdAt: `${moment(metric.createdAt).format(
            "DD/MM/YYYY"
          )} - ${moment(metric.createdAt).format("HH:mm")}`,
          _id: metric._id,
        }))}
        rowKey="index"
      ></Table>

      <Modal
        open={openModal}
        onCancel={handleHideModal}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <TitleName>Cập Nhật Thông Báo Cho Tập Luật BMI</TitleName>

        <Form
          onFinish={handleSubmitForm}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
          fields={[
            { name: ["_id"], value: notification?._id },
            { name: ["notification"], value: notification?.notification },
          ]}
        >
          <Form.Item name="_id" style={{ display: "none" }}>
            <Input name="_id" />
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

          <Button type="primary" htmlType="submit" block>
            Cập nhật
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default TableListMetricMBI;
