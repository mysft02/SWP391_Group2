import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Thay đổi theo đường dẫn của bạn
import { useUser } from '../../../../data/UserContext'; // Sử dụng useUser để lấy token

function UserManagement() {
  const { user } = useUser(); // Lấy user từ useUser
  const accessToken = user.accessToken; // Lấy accessToken từ user
  const [users, setUsers] = useState([]); // Quản lý danh sách người dùng
  const [loading, setLoading] = useState(true);

  // Hàm để lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    if (!accessToken) {
      console.error("Access token is missing");
      notification.error({
        message: 'Fetch Failed',
        description: 'No access token found. Please log in again.',
      });
      return; // Ngăn chặn việc gọi API nếu không có token
    }

    try {
      const response = await api.get('/api/User/GetAllUser', {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sử dụng accessToken từ useUser
          'Content-Type': 'application/json',
        },
      });
      console.log("Token:", accessToken);
      console.log('Response:', response);
      setUsers(response.data); // Cập nhật danh sách người dùng
    } catch (error) {
      console.error('Error fetching users:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch user data.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Gọi API ngay khi component được render
  }, [accessToken]); // Chỉ chạy khi accessToken thay đổi

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'uid',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      dataIndex: 'FullName',
      key: 'fullName',
    },
    {
      title: 'Role',
      dataIndex: 'role_Id',
      key: 'roleId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.user_id)}>
          Delete
        </Button>
      ),
    },
  ];

  // Hàm để xử lý xóa người dùng
  const handleDelete = async (uid) => {
    console.log("uid",uid)
    try {
      await api.delete(`/api/User?id=${uid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Thêm accessToken khi xóa người dùng
        },
      });
      notification.success({
        message: 'User Deleted',
        description: `User with ID ${uid} has been deleted.`,
      });
      fetchUsers(); // Cập nhật lại danh sách người dùng
    } catch (error) {
      console.error('Error deleting user:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete user.',
      });
    }
  };

  return (
    <div>
      <h1>User Manager</h1>
      <Button type="primary" onClick={fetchUsers} style={{ marginBottom: '20px' }}>
        Refresh Users
      </Button>
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="uid" // Đảm bảo uid là key duy nhất
      />
    </div>
  );
}

export default UserManagement;
