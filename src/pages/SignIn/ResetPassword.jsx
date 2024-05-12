import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import "../../assets/css/signin.css"

function ResetPassword() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const onFinish = async ({ email }) => {
    try {
      const res = await authApi.resetPassword({
        email,
      });
      if (res) {
        setSuccess(true);
      }
    } catch (error) {
      if (error?.response?.data?.code === 'not_found_email') {
        message.error("Vui lòng kiểm tra lại email");
      } else {
        message.error("Vui lòng kiểm tra lại email");
      }
    }
  };

  return (
    <div className="reset-password-mail ">
      <img src="https://accgroup.vn/wp-content/uploads/2023/01/tmdt.jpg.webp"
        alt="Background"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '-1',
          filter: 'blur(4px)'
        }} />
      <div className="account-wrapper container">
        <Form
          name="normal_login"
          className="account-form"
          onFinish={onFinish}
          layout="vertical"
        >
          {success ? (
            <>
              Vui lòng kiểm tra email của bạn để cài đặt lại mật khẩu
            </>
          ) : (
            <>
              <h1 className="title">
                Forget Password
              </h1>
              <ul className=" list-message">
                Nhập vào email của bạn để nhận được hướng dẫn cài đặt lại mật khẩu
              </ul>
              <Form.Item
                rules={[
                ]}
                name="email"
                className="form-group"
              >
                <input
                  name="password"
                  className="form-group"
                  type="email"
                  placeholder={"Nhập email của bạn"}
                />
              </Form.Item>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button
                  htmlType="submit"
                  className="d-block lab-btn button-send"
                >
                  Send to email
                </button>
                <button
                  shape="round"
                  className="d-block lab-btn button-cancel"
                  onClick={() => navigate("/sign-in")}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
