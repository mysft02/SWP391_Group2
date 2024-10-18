import React from "react";
import { Button, Card, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../data/UserContext"; // Sử dụng hook từ context của bạn
import { api } from '../../../config/AxiosConfig';
import "./SignIn.css";
import LoginGoogle from "../LoginGoogle/LoginGoogle";

const SignIn = () => {
  const { setUser } = useUser(); // Lấy setUser từ context để cập nhật thông tin người dùng
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/api/Auth/login', {
        username: values.username,
        password: values.password,
      });
  
      const user = response.data;
      console.log("User from API:", user);
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log("User saved in session and context:", user);
  
        notification.success({
          message: "Login Success",
          description: `Welcome back, ${user.username}!`,
        });
  
        // Kiểm tra và điều hướng theo roleId
        if (user.roleId === 'R5') {
          navigate("/admin-dashboard");
        }else if(user.roleId === 'R4'){
          navigate("/manager");
        } 
        else if (user.roleId === 'R1') {
          navigate("/member");
        } else {
          // Thông báo nếu role không hợp lệ
          notification.error({
            message: "Role Not Found",
            description: "Your role is not recognized, please contact support.",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "Login Failed",
        description: "Invalid username or password.",
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

  // Xử lý đăng nhập với Google
  const onGoogleLogin = async (googleUser) => {
    try {
      const googleEmail = googleUser.email; // Lấy email từ Google
      const response = await api.post('/api/Auth/google-login', {
        email: googleEmail,
      });
  
      console.log("API Response:", response); // Kiểm tra phản hồi từ API
  
      const user = response.data;
      console.log("User from Google Login API:", user);
  
      if (user) {
        setUser(user); // Lưu vào context
        localStorage.setItem('user', JSON.stringify(user)); // Lưu vào localStorage
  
        notification.success({
          message: "Login Success",
          description: `Welcome back, ${user.username || user.email}!`,
        });
  
        // Kiểm tra và điều hướng theo roleId
        if (user.roleId === 'R5') {
          navigate("/admin-dashboard");
        } else if (user.roleId === 'R1') {
          navigate("/member");
        } else {
          notification.error({
            message: "Role Not Found",
            description: "Your role is not recognized, please contact support.",
          });
        }
      } else {
        notification.error({
          message: "Login Failed",
          description: "User data not returned from server.",
        });
      }
    } catch (error) {
      console.error("Google Login error:", error);
      notification.error({
        message: "Login Failed",
        description: "Google login failed. Please try again.",
      });
    }
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
              name="username"
              rules={[{ required: true, message: "Please input your email or username" }]}>
              <Input size="large" placeholder="example@gmail.com or username" />
            </Form.Item>
            <p>Password</p>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password" }]}>
              <Input size="large" type="password" placeholder="123" />
            </Form.Item>
            <div className="login-forgot">
              <Link to={"/forgot-password"}>Forgot password</Link>
            </div>
            <div className="login-button-hightline">
              <Form.Item>
                <Button className="login-button" htmlType="submit">Login</Button>
                <span className="login-hightline-v2"></span>
              </Form.Item>
            </div>
            <div className="login-google">
              <LoginGoogle onGoogleLogin={onGoogleLogin} /> {/* Truyền hàm xử lý đăng nhập Google */}
            </div>
            <div className="login-return">
              <p>No account? <Link to={"/sign-up"}>Sign up</Link></p>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
