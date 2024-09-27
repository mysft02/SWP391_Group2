import { Button, Card, Form, Input, notification } from "antd";
import "./SignIn.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const onFinish = (values) => {
    console.log("Form values: ", values);
    notification.success({
      message: "Login Success",
      description: "You have successfully logged in.",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
    notification.error({
      message: "Login Failed",
      description: "Please check your input and try again.",
    });
  };

  return (
    <div className="login-page-background">
      <div className="login-card-detail">
        <Card className="login-card-signin">
          <div className="login-title">
            <p>Sign in</p>
            <span className="login-hightline"></span>
          </div>
          <Form 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p>Email</p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                {
                  type: "email",
                  message: "The input is not a valid email",
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
                  message: "Please input your password",
                },
              ]}
            >
              <Input size="large" type="password" placeholder="aaAA@12345" />
            </Form.Item>
            <div className="login-forgot">
              <Link to={"/forgot-password"}>Forgot password</Link>
            </div>
            <div className="login-button-hightline">
              <Form.Item>
                <Button className="login-button" htmlType="submit">
                  Login
                </Button>
                <span className="login-hightline-v2"></span>
              </Form.Item>
            </div>

            <div className="login-return">
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
