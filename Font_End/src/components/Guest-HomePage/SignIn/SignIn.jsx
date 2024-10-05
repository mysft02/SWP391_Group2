import { Button, Card, Form, Input, notification } from "antd";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { api } from '../../../config/AxiosConfig'; // Ensure this points to your Axios configuration
  // import useUsers from "../../../data/UserContext"; // Make sure this import is correct

const SignIn = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const onFinish = async (values) => {
    try {
      const response = await api.post('/api/Auth/login', {
        emailOrUsername: values.emailOrUsername,
        password: values.password,
      });
  
      const user = response.data;
  
      if (user) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(user));
  
        notification.success({
          message: "Login Success",
          description: `Welcome back, ${user.username}!`,
        });
  
        navigate("/member");
      }
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "Login Failed",
        description: "Invalid email/username or password.",
      });
    }
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
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <p>Email or Username</p>
            <Form.Item
              name="emailOrUsername"
              rules={[{ required: true, message: "Please input your email or username" }]}
            >
              <Input size="large" placeholder="example@gmail.com or username" />
            </Form.Item>
            <p>Password</p>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password" }]}
            >
              <Input size="large" type="password" placeholder="123" />
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
