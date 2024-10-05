import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  message,
} from "antd";
// Trong SignUp.jsx
import { api } from '../../../config/AxiosConfig'; // Thay đổi từ: import api from '../../../config/AxiosConfig' sang import { api } from '../../../config/AxiosConfig';
import React from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = async (info) => {
    try {
      const response = await api.post("/api/User/create", {
        fullName: info.fullName,
        phone: info.phone,
        email: info.email,
        username: info.username,
        password: info.password,
      });
      console.log(info);
      // Check the response status or message as needed
      if (response.status === 200) { // Assuming 201 indicates success
        message.success("Account created successfully!");
        navigate("/sign-in"); // Redirect to sign-in after successful registration
      } else {
        message.error(response.data.message || "Failed to create account. Please try again."); // Handle specific server error messages
      }
    } catch (error) {
      
      console.error("Failed to create account:", error);
      // Check if error response exists
      if (error.response && error.response.data) {
        message.error(error.response.data.message || "Failed to create account. Please try again.");
      } else {
        message.error("Failed to create account. Please try again.");
      }
    }
  };

  return (
    <div className="register-page-background">
      <div className="register-card-detail">
        <Card className="register-card-info">
          <div className="register-title">
            <p>Create your account</p>
            <span className="register-hightline"></span>
          </div>
          <div className="register-form-signin">
            <Form
              labelCol={{ span: 24 }}
              style={{ marginTop: "-20px" }}
              onFinish={onFinish}
            >
              <Row>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    style={{ marginBottom: "1px" }}
                    rules={[{ required: true, message: "Please input your full name" }]}
                  >
                    <Input size="middle" placeholder="Nguyen Van A" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    style={{ marginBottom: "1px" }}
                    rules={[
                      { required: true, message: "Please input your phone" },
                      { pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits" },
                    ]}
                  >
                    <Input size="middle" placeholder="0xxxxxxxxx" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Form.Item
                    label="Email"
                    name="email"
                    style={{ marginBottom: "1px" }}
                    rules={[
                      { required: true, message: "Please input your email" },
                      { type: "email", message: "The input is not valid email" },
                    ]}
                  >
                    <Input size="middle" placeholder="example@gmail.com" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{ marginBottom: "1px" }}
                    rules={[
                      { required: true, message: "Please input your username" },
                      { validator: (_, value) => (value && value.includes(" ")) ? Promise.reject(new Error("Username cannot contain spaces!")) : Promise.resolve() },
                    ]}
                  >
                    <Input size="middle" placeholder="Name1234@@@" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Form.Item
                    label="Password"
                    name="password"
                    style={{ marginBottom: "1px" }}
                    rules={[{ required: true, message: "Please input your password" }]}
                  >
                    <Input.Password size="middle" placeholder="aaAA@12345" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Confirm Password"
                    dependencies={["password"]}
                    name="password2"
                    style={{ marginBottom: "1px" }}
                    rules={[
                      { required: true, message: "Please confirm your password" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          return !value || getFieldValue("password") === value
                            ? Promise.resolve()
                            : Promise.reject(new Error("Passwords do not match!"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password size="middle" placeholder="aaAA@12345" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="register-checkbox">
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  validateTrigger="onSubmit"
                  style={{ marginBottom: "1px" }}
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error("You must accept the terms")),
                    },
                  ]}
                >
                  <Checkbox>
                    By signing up, I agree with the{" "}
                    <Link to="/terms">Terms of Use & Privacy Policy</Link>
                  </Checkbox>
                </Form.Item>
              </div>
              <div className="register-button-hightline">
                <Form.Item>
                  <Button className="register-button" htmlType="submit">
                    Register
                  </Button>
                  <span className="register-hightline-v2"></span>
                </Form.Item>
              </div>
              <div className="register-return">
                <p>
                  Returning user? <Link to="/sign-in">Log in here</Link>
                </p>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
