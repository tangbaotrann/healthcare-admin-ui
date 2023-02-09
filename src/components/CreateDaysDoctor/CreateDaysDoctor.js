//lib
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";

// me
import "./CreateDaysDoctor.css";
import TitleName from "../TitleName";
import { fetchApiCreateDaysDoctor } from "../../redux/features/daysSlice";

function CreateDaysDoctor() {
  const dispatch = useDispatch();

  // handle create day doctor
  const handleCreateDaysDoctor = (values) => {
    if (values) {
      dispatch(fetchApiCreateDaysDoctor(values));
      message.success("Bạn đã tạo thành công ngày làm cho Bác sĩ.");
    } else {
      message.error("Tạo ngày làm không thành công!");
      return;
    }
  };

  return (
    <div className="wrapper-create-days-doctor">
      <div className="create-days-doctor">
        <TitleName>Tạo ngày làm cho Bác sĩ</TitleName>

        <div className="create-days-doctor-form">
          <Form
            onFinish={handleCreateDaysDoctor}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
          >
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
              <Input placeholder="Thứ trong tuần..." />
            </Form.Item>

            {/* day_number */}
            <Form.Item
              name="day_number"
              rules={[
                {
                  required: true,
                  message: "Bạn cần phải nhập số ngày.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Số ngày..." />
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
      </div>
    </div>
  );
}

export default CreateDaysDoctor;
