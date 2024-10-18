import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';
import { api } from '../../../config/AxiosConfig'; // Thay đổi theo đường dẫn của bạn

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm để lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users'); // Giả sử đây là endpoint để lấy danh sách người dùng
      setUsers(response.data);
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
    fetchUsers(); // Gọi hàm khi component được mount
  }, []);

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Role',
      dataIndex: 'roleId',
      key: 'roleId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.uid)}>
          Delete
        </Button>
      ),
    },
  ];

  // Hàm để xử lý xóa người dùng
  const handleDelete = async (uid) => {
    try {
      await api.delete(`/api/users/${uid}`); // Giả sử đây là endpoint để xóa người dùng
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
      <h1>Admin Dashboard</h1>
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

export default AdminDashboard;
