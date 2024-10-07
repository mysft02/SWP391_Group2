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
import { api } from '../../../config/AxiosConfig';
import React from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post("/api/Auth/register", {
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        confirmPassword: values.confirmPassword,
        username: values.username,
        password: values.password,
      });
      console.log(values);

      if (response.status === 200) {
        message.success("Account created successfully!");
        navigate("/sign-in");
      } else {
        message.error(response.data.message || "Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Failed to create account:", error);
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
                    name="fullName" // Đã sửa ở đây
                    style={{ marginBottom: "1px" }}
                    rules={[{ required: true, message: "Please input your full name" }]}>
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
                    ]}>
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
                    ]}>
                    <Input size="middle" placeholder="example@gmail.com" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Username"
                    name="username" // Đã sửa ở đây
                    style={{ marginBottom: "1px" }}
                    rules={[
                      { required: true, message: "Please input your username" },
                      { validator: (_, value) => (value && value.includes(" ")) ? Promise.reject(new Error("Username cannot contain spaces!")) : Promise.resolve() },
                    ]}>
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
                    rules={[{ required: true, message: "Please input your password" }]}>
                    <Input.Password size="middle" placeholder="aaAA@12345" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Confirm Password"
                    dependencies={["password"]}
                    name="confirmPassword" // Đã sửa ở đây
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
                    ]}>
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
                  ]}>
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
