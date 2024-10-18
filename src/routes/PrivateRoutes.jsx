import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../data/UserContext'; // Dùng duy nhất useUser từ UserContext

function PrivateRoute({ requiredRoles }) {
  const { user } = useUser(); // Lấy thông tin user từ context đã tích hợp cả auth
  const location = useLocation(); // Lấy thông tin vị trí hiện tại

  useEffect(() => {
    // Lưu ý: Navigate không phải là cách lý tưởng để kiểm tra quyền truy cập ở đây
    // vì nó có thể gây ra vòng lặp vô hạn. Cách tốt nhất là sử dụng trạng thái loading.
  }, [user]);

  // Kiểm tra nếu người dùng chưa đăng nhập
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Kiểm tra nếu role của user không nằm trong danh sách các role được phép
  if (!requiredRoles.includes(user.roleId)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Nếu người dùng hợp lệ, hiển thị nội dung con hoặc Outlet
  return <Outlet />;
}

export default PrivateRoute;
