//lib
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Modal, Select } from "antd";

// me
import "./CreateDaysDoctor.css";
import TitleName from "../TitleName";
import {
  fetchApiAllCreateDaysDoctor,
  fetchApiCreateDaysDoctor,
} from "../../redux/features/daysSlice";
import TableCreateDaysDoctor from "../TableCreateDaysDoctor";
import days from "../../utils/days";
import { fetchApiAllCreateDaysDoctorSelector } from "../../redux/selector";

function CreateDaysDoctor({ getToken }) {
  const [showModal, setShowModal] = useState(false);
  const [weekDay, setWeekDay] = useState("");

  // console.log("weekDay", weekDay);
  // console.log("getToken create day", getToken);

  const dispatch = useDispatch();

  const daysCreate = useSelector(fetchApiAllCreateDaysDoctorSelector);

  console.log("daysCreate", daysCreate);

  useEffect(() => {
    dispatch(fetchApiAllCreateDaysDoctor());
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

  // handle change day number
  const handleChangeDayNumber = (value) => {
    setWeekDay(+value + 1);
  };

  // handle create day doctor
  const handleCreateDaysDoctor = (values) => {
    let dateFormat = days(+values.day_number);

    if (values) {
      dispatch(
        fetchApiCreateDaysDoctor({
          dateFormat: dateFormat,
          weekDay: weekDay,
          token: getToken,
        })
      );
      setShowModal(false);
    }
  };

  return (
    <div className="wrapper-create-days-doctor">
      <Button onClick={handleOpenModal} className="create-days-btn">
        <span>Tạo ngày làm</span>
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
                value:
                  weekDay === 1
                    ? "Chủ nhật"
                    : weekDay === 2
                    ? "Thứ 2"
                    : weekDay === 3
                    ? "Thứ 3"
                    : weekDay === 4
                    ? "Thứ 4"
                    : weekDay === 5
                    ? "Thứ 5"
                    : weekDay === 6
                    ? "Thứ 6"
                    : weekDay === 7
                    ? "Thứ 7"
                    : null,
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
                  { value: "1", label: "2" },
                  { value: "2", label: "3" },
                  { value: "3", label: "4" },
                  { value: "4", label: "5" },
                  { value: "5", label: "6" },
                  { value: "6", label: "7" },
                  { value: "0", label: "8" },
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
      <TableCreateDaysDoctor daysCreate={daysCreate} />
    </div>
  );
}

export default CreateDaysDoctor;
