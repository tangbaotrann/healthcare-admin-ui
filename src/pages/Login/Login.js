// lib
import { KeyOutlined, LoadingOutlined } from "@ant-design/icons/lib/icons";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Form, Input, Button, Alert } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// me
import "./Login.css";
import { endPoints } from "../../routers";
import BackgroundOutSite from "../../components/BackgroundOutSite/BackgroundOutSite";
import userSlice, { fetchApiLogin } from "../../redux/features/userSlice";
import { isValidPhoneNumber } from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import axios from "axios";
import {
  fetchApiLoginSelector,
  isLoadingLoginSelector,
} from "../../redux/selector";

function Login() {
  const [number, setNumber] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [ruleAccount, setRuleAccount] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const messageSuccess = useSelector(fetchApiLoginSelector);
  const isLoading = useSelector(isLoadingLoginSelector);

  // console.log("messageSuccess", messageSuccess);

  useEffect(() => {
    if (ruleAccount.rule === "admin") {
      if (messageSuccess.length > 0 || messageSuccess.accessToken) {
        navigate(`${endPoints.adminConfirm}`);
        dispatch(userSlice.actions.btnClickedGetPhone(number));
      }
    }
  }, [
    dispatch,
    messageSuccess.accessToken,
    messageSuccess.length,
    navigate,
    number,
    ruleAccount.rule,
  ]);

  // handle submit login
  const handleOnFishSubmitLogin = (values) => {
    try {
      const validatorPhone = isValidPhoneNumber(values.phone_number);
      const parsePhone = parsePhoneNumber(values.phone_number);

      const formatPhone = parsePhone.number.replace("+84", "0");

      if (validatorPhone === false) {
        setCheckPhone(true);
        setMessageError(false);
        return;
      }

      if (values) {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}accounts/phone/${formatPhone}`)
          .then((res) => {
            console.log("res login ->", res.data.data);

            dispatch(fetchApiLogin(values));
            setCheckPhone(false);
            setMessageError(false);

            if (res.data.data === "admin") {
              if (messageSuccess.accessToken) {
                navigate(`${endPoints.adminConfirm}`);
              }
              if (messageSuccess.status === "fail") {
                return;
              }
            }

            setRuleAccount(res.data.data);
          })
          .catch((err) => {
            if (validatorPhone === false) {
              setCheckPhone(true);
              setMessageError(false);
            } else {
              setMessageError(true);
              setCheckPhone(false);
            }
            console.log({ err });
          });
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <BackgroundOutSite>
      {(messageSuccess.length > 0 || messageSuccess.status === "fail") &&
      !messageError &&
      !checkPhone ? (
        <Alert
          message={`${messageSuccess.message}`}
          type="error"
          style={{ marginBottom: "12px" }}
        />
      ) : null}

      {messageError ? (
        <Alert
          message="Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!"
          type="error"
          style={{ marginBottom: "12px" }}
        />
      ) : checkPhone ? (
        <Alert
          message="Số điện thoại của bạn không hợp lệ. Vui lòng thử lại!"
          type="error"
          style={{ marginBottom: "12px" }}
        />
      ) : null}

      <Form
        onFinish={handleOnFishSubmitLogin}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        {/* Number phone */}
        <Form.Item
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Bạn cần phải nhập số điện thoại.",
            },
          ]}
          hasFeedback
        >
          <PhoneInput
            className="register-phone-number"
            value={number}
            onChange={setNumber}
            defaultCountry="VN"
            placeholder="Số điện thoại..."
          />
          {/* <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại..." /> */}
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Bạn cần phải nhập mật khẩu.",
            },
            {
              min: 6,
              message: "Mật khẩu phải ít nhất 6 kí tự.",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<KeyOutlined />} placeholder="Mật khẩu..." />
        </Form.Item>

        {/* Button */}
        <Button type="primary" htmlType="submit" disabled={isLoading} block>
          {isLoading ? <LoadingOutlined spin /> : "Đăng nhập"}
        </Button>

        {/* Register & Forgot-password button */}
        <div className="link-to">
          {/* <Link to={endPoints.register}>Đăng ký ngay</Link> */}
          {/* <Link to="/forgot-password">Quên mật khẩu</Link> */}
        </div>
      </Form>
    </BackgroundOutSite>
  );
}

export default Login;
