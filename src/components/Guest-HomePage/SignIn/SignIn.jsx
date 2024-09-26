import { Button, Card, Form, Input, notification } from "antd";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "https://66f4f6749aa4891f2a2349a0.mockapi.io/api/example/user", //đường dẫn đến mockApi demo
  });

  useEffect(() => {
    api.get("/").then((user) => setUsers(user.data)); //lấy api 1 lần duy nhất khi load trang
  }, []);

  const onFinish = (inforSuccess) => {
    //tìm kiếm email và password
    try {
      const user = users.find(
        (user) =>
          user.email === inforSuccess.email &&
          user.password === inforSuccess.password
      );

      if (user) {
        navigate("/"); //tìm thấy chuyển qua trang home
      } else {
        //thông báo lỗi nếu không tìm thấy
        notification.error({
          message: "Login Failed",
          description: "email or password is wrong",
        });
      }
    } catch (error) {
      console.log("fail to login" + error);
    }
  };

  return (
    <div className="page-background">
      <div className="card_detail">
        <Card className="card_signin">
          <div className="title">
            <p>Sign in</p>
            <span className="hightline"></span>
          </div>
          <Form onFinish={onFinish}>
            <p>Email</p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Input Your Email",
                },
                {
                  type: "email",
                  message: "The input is not valid email",
                },
              ]}
            >
              <Input size="large" placeholder="example@gmail.com" />
            </Form.Item>
            <p>Password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Input Your Password",
                },
              ]}
            >
              <Input size="large" placeholder="aaAA@12345" />
            </Form.Item>
            <div className="forgot">
              <Link to={"/forgot-password"}>Forgot password</Link>
            </div>
            <div className="button_hightline">
              <Form.Item>
                <Button className="button" htmlType="submit">
                  Login
                </Button>
                <span className="hightline_v2"></span>
              </Form.Item>
            </div>

            <div className="return">
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

export default SignIn;
