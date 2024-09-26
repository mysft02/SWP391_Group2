import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
} from "antd";
import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "https://66f4f6749aa4891f2a2349a0.mockapi.io/api/example/user", //đường dẫn đến mockApi demo
  });

  useEffect(() => {
    api.get("/").then((user) => setUsers(user.data)); //lấy api 1 lần duy nhất khi load trang
  }, []);

  const checkDuplicateName = (username) => {
    return users.some((user) => user.username === username); //check username exit or not
  };
  const checkDuplicateEmail = (email) => {
    return users.find((user) => user.email === email); //check email
  };

  const onFinish = async (info) => {
    if (checkDuplicateName(info.username)) {
      //notification if exit
      notification.error({
        message: "Register Failed",
        description: "User Name is exit",
      });
      return Promise.reject();
    }
    if (checkDuplicateEmail(info.email)) {
      notification.error({
        message: "Register Failed",
        description: "email is exit",
      });
      return Promise.reject();
    }
    try {
      //if not exit email and password add new user
      await api.post("/", {
        phone: info.phone,
        fullName: info.fullname,
        email: info.email,
        username: info.username,
        password: info.password,
      });
      navigate("/sign-in"); //dispatch to sign in page
    } catch (error) {
      console.log("Register not success " + error);
    }
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
