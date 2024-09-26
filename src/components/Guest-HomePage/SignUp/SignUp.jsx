import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
} from "antd";
import React from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";


const SignUp = () => {
 
  const onFinish = async (info) => {
    
  };

  return (
    <div className="page-background">
      <div className="card-detail">
        <Card className="card_info">
          <div className="title">
            <p>Create your account</p>
            <span className="hightline"></span>
          </div>
          <div className="form-signin">
            <Form
              labelCol={{
                span: 24,
              }}
              style={{ marginTop: "-20px" }}
              onFinish={onFinish}
            >
              <Row>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Form.Item
                    label="Full Name"
                    name="fullname"
                    style={{ marginBottom: "1px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name",
                      },
                    ]}
                  >
                    <Input size="middle" placeholder="Nguyen Van  A" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    style={{ marginBottom: "1px" }}
                    rules={[
                      {
                        required: true,
                        message: "please input your phone",
                      },
                      {
                        pattern: new RegExp(/^[0-9]{10}$/), // Validate số điện thoại
                        message: "Phone number must be 10 digits",
                      },
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
                      {
                        required: true,
                        message: "Please input your email",
                      },
                      {
                        type: "email",
                        message: "The input is not valid email",
                      },
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
                      {
                        required: true,
                        message: "Please input your username",
                      },
                      {
                        validator: (_, value) => {
                          if (value && value.includes(" ")) {
                            return Promise.reject(
                              new Error("Username cannot contain spaces!")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
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
                    rules={[
                      {
                        required: true,
                        message: "Please input your password",
                      },
                    ]}
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
                      {
                        required: true,
                        message: "Please input confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password size="middle" placeholder="aaAA@12345" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="checkbox">
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  validateTrigger="onSubmit"
                  style={{ marginBottom: "1px" }}
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("You must accept the terms")
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    By signing up, I agree with the{" "}
                    <Link>Terms of Use & Privacy Policy</Link>
                  </Checkbox>
                </Form.Item>
              </div>
              <div className="button_hightline">
                <Form.Item>
                  <Button className="button" htmlType="submit">
                    Register
                  </Button>
                  <span className="hightline_v2"></span>
                </Form.Item>
              </div>
              <div className="return">
                <p>
                  Returning user? <Link to={"/sign-in"}>Log in here</Link>
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
