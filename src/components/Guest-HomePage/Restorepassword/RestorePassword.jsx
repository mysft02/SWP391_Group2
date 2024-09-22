import { Button, Card, Form, Input } from "antd";
import React from "react";
import "./RestorePassword.css";
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";

const RestorePassword = () => {
  return (
    <div>
      <Card className="card_restore">
        <Form
          labelCol={{
            span: 24,
          }}
        >
          <div className="title">
            <p>
              <span>
                <Link to={"/sign-in"}>
                  <IoMdReturnLeft />
                </Link>
              </span>
              Restore Password
            </p>
            <span className="hightline"></span>
          </div>
          <div className="form_restore">
            <form>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input email need restore password",
                  }, {
                    type: "email",
                    message: "The input is not valid email"
                  }
                ]}
              >
                <Input size="large" placeholder="example@gmail.com" />
              </Form.Item>
            </form>
          </div>
          <div className="button_hightline">
            <Form.Item>
              <Button className="button" htmlType="submit">Send Reset Link</Button>
              <span className="hightline_v2"></span>
            </Form.Item>
          </div>
          <div className="return_login">
            <p>
              no account? <Link to={"/sign-up"}>Sign up</Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RestorePassword;
