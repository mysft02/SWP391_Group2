import { Button, Card,  Form, Input } from "antd";
import "./SignIn.css";
import { Link } from "react-router-dom";
const SignIn = () => {
  const onFinish = (inforSuccess) => {
    console.log("success:" + JSON.stringify(inforSuccess));
  };
  const onFinishFailed = (inforError) => {
    console.log("fail:" + JSON.stringify(inforError));
  };
  return (
    <div className="page-background">
      <div className="background">
        <Card className="card_signin">
          <div className="title">
            <p>Sign in</p>
            <span className="hightline"></span>
          </div>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
