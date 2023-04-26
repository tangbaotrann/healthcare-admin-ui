//lib
import { Button, Form, Input, Modal, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// me
import "./CreateShiftsDoctor.css";
import TitleName from "../TitleName";
import {
  fetchApiAllShiftsDoctor,
  fetchApiCreateShiftsDoctor,
} from "../../redux/features/shiftsSlice";
import TableCreateShiftsDoctor from "../TableCreateShiftsDoctor";
import {
  fetchApiAllShiftsDoctorSelector,
  filterCheckShifts,
} from "../../redux/selector";
import moment from "moment";

// config select time
const format = "HH:mm";

function CreateShiftsDoctor({ getToken }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const shifts = useSelector(fetchApiAllShiftsDoctorSelector); // filterCheckShifts

  // console.log("getToken", getToken);
  console.log("shifts", shifts);

  useEffect(() => {
    dispatch(fetchApiAllShiftsDoctor());

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

  // handle create shifts doctor
  const handleCreateShiftsDoctor = (values) => {
    console.log("values", values);
    if (values) {
      // const timeStart = moment(values.time_start).format('HH:mm');
      // ngày
      // const scheduleDateStart = moment(schedule.date_compare._i.split('/').reverse().join('/') + ' ' + timeStart);

      dispatch(
        fetchApiCreateShiftsDoctor({
          values: values,
          token: getToken,
        })
      );
      setShowModal(false);
    }
  };

  return (
    <div className="wrapper-create-shifts-doctor">
      <Button onClick={handleOpenModal} className="create-shifts-btn">
        <span>Tạo ca làm</span>
      </Button>

      {/* Modal */}
      <Modal
        open={showModal}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
      >
        <TitleName>Tạo ca làm cho Bác sĩ</TitleName>

        <div className="create-shifts-doctor-form">
          <Form
            onFinish={handleCreateShiftsDoctor}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
          >
            {/* name */}
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Bạn cần phải nhập ca làm.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Ca làm..." />
            </Form.Item>

            {/* desc */}
            <Form.Item
              name="desc"
              rules={[
                {
                  required: true,
                  message: "Bạn cần phải nhập mô tả (vd: giờ của ca làm).",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Mô tả giờ của ca làm..." />
            </Form.Item>

            {/* time_start */}
            <Form.Item
              name="time_start"
              rules={[
                {
                  required: true,
                  message: "Bạn cần phải nhập thời giàn bắt đầu làm.",
                },
              ]}
              hasFeedback
            >
              <TimePicker
                format={format}
                placeholder="Thời gian bắt đầu làm..."
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* time_end */}
            <Form.Item
              name="time_end"
              rules={[
                {
                  required: true,
                  message: "Bạn cần phải nhập thời giàn kết thúc ca làm.",
                },
              ]}
              hasFeedback
            >
              <TimePicker
                format={format}
                placeholder="Thời gian kết thúc ca làm..."
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* Button */}
            <Button
              className="create-shifts-doctor-form-btn"
              type="primary"
              htmlType="submit"
              block
            >
              Tạo ca làm
            </Button>
          </Form>
        </div>
      </Modal>

      {/* List create shifts doctor */}
      <TableCreateShiftsDoctor shifts={shifts} />
    </div>
  );
}

export default CreateShiftsDoctor;
