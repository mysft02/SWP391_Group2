import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/UserContext'; // Dùng duy nhất useUser từ UserContext

function PrivateRoute({ requiredRoles, children }) { // Nhận các role được phép truy cập từ props
  const navigate = useNavigate();
  const { user } = useUser(); // Lấy thông tin user từ context đã tích hợp cả auth

  useEffect(() => {
    if (!user) {
      // Nếu chưa đăng nhập thì điều hướng đến trang đăng nhập
      navigate("/sign-in");
    } else {
      // Nếu role của user không nằm trong danh sách các role được phép, điều hướng đến trang không có quyền
      if (!requiredRoles.includes(user.roleId)) {
        navigate("/not-authorized");
      }
    }
  }, [navigate, user, requiredRoles]);

  // Kiểm tra nếu người dùng đăng nhập và có quyền hợp lệ
  if (user && requiredRoles.includes(user.roleId)) {
    return children ? children : <Outlet />; // Hiển thị nội dung con nếu có
  }

  // Trường hợp không hợp lệ, điều hướng về trang đăng nhập hoặc trả về null
  return null;
}

export default PrivateRoute;
