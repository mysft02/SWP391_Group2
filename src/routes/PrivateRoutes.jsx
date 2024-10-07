import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/UserContext';

function PrivateRoutes({ requiredRoles }) { // Nhận các role được phép truy cập từ props
    const navigate = useNavigate();
    const { user } = useUser(); // Lấy thông tin user từ context

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            // Nếu chưa đăng nhập thì điều hướng đến trang đăng nhập
            navigate("/sign-in");
        } else {
            const parsedUser = JSON.parse(storedUser);
            if (!requiredRoles.includes(parsedUser.roleId)) {
                // Nếu role của user không nằm trong danh sách các role được phép, điều hướng đến trang không có quyền
                navigate("/not-authorized");
            }
        }
    }, [navigate, requiredRoles]);

    // Nếu user đã đăng nhập và có role hợp lệ, hiển thị Outlet
    return user && requiredRoles.includes(user.roleId) ? <Outlet /> : null; 
}

export default PrivateRoutes;
