import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";

import BackgroundOutSite from "../../components/BackgroundOutSite";
import "./ConfirmAdmin.css";
import {
  btnClickedGetPhoneNumberSelector,
  fetchApiLoginSelector,
} from "../../redux/selector";
import { useUserAuth } from "../../context/UserAuthContext";
import { endPoints } from "../../routers";
import TitleName from "../../components/TitleName";
import userSlice from "../../redux/features/userSlice";

function ConfirmAdmin() {
  const [flag, setFlag] = useState(false);
  const [confirmOTP, setConfirmOTP] = useState("");
  const [checkOTP, setCheckOTP] = useState(false);
  const [tokenAccount, setTokenAccount] = useState();
  const [disabledButton, setDisabledButton] = useState(false);

  const [isLoadingConfirmAdmin, setIsLoadingConfirmAdmin] = useState(false);
  const [isLoadingConfirmOTP, setIsLoadingConfirmOTP] = useState(false);

  const { setUpRecaptcha } = useUserAuth();

  const messageSuccess = useSelector(fetchApiLoginSelector);
  const phoneNumber = useSelector(btnClickedGetPhoneNumberSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("phoneNumber", phoneNumber);
  // console.log("messageSuccess confirm admin ->", messageSuccess);
  // console.log("tokenAccount ->", tokenAccount);

  useEffect(() => {
    messageSuccess?.accessToken && setTokenAccount(messageSuccess.accessToken);
  }, [messageSuccess?.accessToken]);

  const handleConfirmAdmin = async (values) => {
    try {
      if (phoneNumber) {
        setIsLoadingConfirmAdmin(true);
        const __res = await setUpRecaptcha(phoneNumber);
        console.log(__res);
        setConfirmOTP(__res);
        setFlag(true);
        setDisabledButton(true);
        setIsLoadingConfirmAdmin(false);
      }
    } catch (err) {
      console.log({ err });
      setDisabledButton(false);
      setIsLoadingConfirmAdmin(false);
    }
  };

  // handle verify OTP
  const handleOnFinishVerifyOTP = async (values) => {
    const { basic_otp } = values;

    console.log("basic_otp", basic_otp);

    try {
      if (values) {
        setIsLoadingConfirmOTP(true);
        await confirmOTP.confirm(basic_otp);
        localStorage.setItem("token_user_login", JSON.stringify(tokenAccount));
        setIsLoadingConfirmOTP(false);
        navigate(`${endPoints.admin}`);
      }
    } catch (err) {
      console.log({ err });
      setCheckOTP(true);
      setIsLoadingConfirmOTP(false);
    }
  };

  return (
    <BackgroundOutSite hideTitle>
      <div className="confirm-admin-back">
        <Link
          to={`${endPoints.login}`}
          className="confirm-admin-back-link"
          onClick={() => dispatch(userSlice.actions.btnClickedGetPhone(null))}
        >
          <ArrowLeftOutlined /> Quay lại
        </Link>
      </div>

      <Form
        onFinish={handleConfirmAdmin}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        fields={[{ name: ["phone_number"], value: phoneNumber }]}
      >
        <TitleName>Xác Thực Tài Khoản Admin</TitleName>

        <Form.Item name="phone_number">
          <Input disabled />
        </Form.Item>

        <p className="message-note-confirm-admin">
          <i>* Vui lòng nhấn nút xác thực bên dưới.</i>
        </p>

        {/* reCaptcha */}
        <div id="recaptcha-container"></div>

        {tokenAccount ? (
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={disabledButton}
            style={{ marginTop: "4px", marginBottom: "42px" }}
          >
            {isLoadingConfirmAdmin ? <LoadingOutlined spin /> : "Xác thực"}
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled
            style={{ marginTop: "4px", marginBottom: "42px" }}
          >
            {isLoadingConfirmAdmin ? <LoadingOutlined spin /> : "Xác thực"}
          </Button>
        )}
      </Form>

      {checkOTP ? (
        <Alert
          type="error"
          message="Mã OTP không chính xác. Vui lòng kiểm tra lại!"
          style={{ marginBottom: "8px" }}
        />
      ) : null}

      {/* Verify captcha (otp) */}
      <Form
        onFinish={handleOnFinishVerifyOTP}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        style={{ display: flag ? "block" : "none" }}
      >
        <Form.Item
          name="basic_otp"
          rules={[
            {
              required: true,
              message: "Bạn cần phải nhập mã OTP.",
            },
          ]}
          hasFeedback
        >
          <Input name="basic_otp" placeholder="Mã OTP của bạn..." />
        </Form.Item>

        <div className="register-footer">
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={isLoadingConfirmOTP}
            style={{ marginTop: "-18px" }}
          >
            {isLoadingConfirmOTP ? <LoadingOutlined spin /> : "Xác nhận mã OTP"}
          </Button>
        </div>
      </Form>
    </BackgroundOutSite>
  );
}

export default ConfirmAdmin;
