import { Button, Card, Form, Input } from "antd";
import React from "react";
import "./RestorePassword.css";
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";

const RestorePassword = () => {
  return (
    <div className="restore-page-background">
      <div className="restore-card-detail">
        <Card className="restore-card">
          <Form labelCol={{ span: 24 }}>
            <div className="restore-title">
              <p>
                <span>
                  <Link to={"/sign-in"}>
                    <IoMdReturnLeft />
                  </Link>
                </span>
                Restore Password
              </p>
              <span className="restore-hightline"></span>
            </div>
            <div className="restore-form">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input email need restore password",
                  },
                  {
                    type: "email",
                    message: "The input is not valid email",
                  },
                ]}
              >
                <Input size="large" placeholder="example@gmail.com" />
              </Form.Item>
            </div>
            <div className="restore-button-hightline">
              <Form.Item>
                <Button className="restore-button" htmlType="submit">
                  Send Reset Link
                </Button>
                <span className="restore-hightline-v2"></span>
              </Form.Item>
            </div>
            <div className="restore-return-login">
              <p>
                No account? <Link to={"/sign-up"}>Sign up</Link>
              </p>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RestorePassword;
