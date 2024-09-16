import { Button, Card, Checkbox, Col, Input, Row } from "antd";
import React from "react";
import "../styles/SignIn.css";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div>
      <Card className="card">
        <div className="title">
          <p>Create your account</p>
          <span className="hightline"></span>
        </div>
        <div className="form-signin">
          <form>
            <Row>
              <Col span={12} style={{ paddingRight: "5px" }}>
                <p>Full Name</p>
                <Input size="middle" placeholder="Nguyen Van  A" />
              </Col>
              <Col span={12}>
                <p>Phone</p>
                <Input size="middle" placeholder="0xxxxxxxxx" />
              </Col>
            </Row>
            <p>Email</p>
            <Input size="middle" placeholder="example@gmail.com" />
            <p>Username</p>
            <Input size="middle" placeholder="Name1234@@@" />
            <p>Password</p>
            <Input size="middle" placeholder="aaAA@12345" />
            <div className="checkbox">
              <Checkbox>By signing up, I agree with the</Checkbox>{" "}
              <Link>Terms of Use & Privacy Policy</Link>
            </div>
            <div className="button_hightline">
              <Button className="button">Register</Button>
              <span className="hightline_v2"></span>
            </div>
            <div className="return">
              <p>
                Returning user?<Link>Log in here</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
