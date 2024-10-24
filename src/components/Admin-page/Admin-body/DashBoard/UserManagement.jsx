import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Modal, Select } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Điều chỉnh đường dẫn nếu cần
import { useUser } from '../../../../data/UserContext'; // Sử dụng useUser để lấy token
import { UserOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'; // Nhập các biểu tượng cần thiết

const { Option } = Select;

function UserManagement() {
  const { user } = useUser(); // Lấy user từ useUser
  const accessToken = user.accessToken; // Lấy accessToken từ user
  const [users, setUsers] = useState([]); // Quản lý danh sách người dùng
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    if (!accessToken) {
      console.error("Access token is missing");
      notification.error({
        message: 'Fetch Failed',
        description: 'No access token found. Please log in again.',
      });
      return;
    }

    try {
      const response = await api.get('/api/User/GetAllUser', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
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
    fetchUsers(); // Gọi API ngay khi component được render
  }, [accessToken]);

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'uid',
      render: (text) => (
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          {text.length > 10 ? `${text.slice(0, 10)}...` : text} {/* Cắt bớt nếu dài hơn 10 ký tự */}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'fullName',
    },
    {
      title: 'Role',
      dataIndex: 'role_id',
      key: 'roleId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleUpdateRole(record)}>
          <EditOutlined style={{ marginRight: 8 }} /> Cập nhật vai trò
        </Button>
      ),
    },
  ];

  // Hiển thị modal để cập nhật vai trò
  const handleUpdateRole = (user) => {
    setSelectedUser(user);
    setNewRole(user.role_id);
    setIsModalVisible(true);
  };

  // Cập nhật vai trò người dùng
  const updateRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      await api.post(`/api/User/UpdateUserRole`, null, {
        params: {
          user_id: selectedUser.user_id,
          role_id: newRole,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      notification.success({
        message: 'Role Updated',
        description: `User with ID ${selectedUser.user_id} role has been updated.`,
      });
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      notification.error({
        message: 'Update Failed',
        description: 'Could not update user role.',
      });
    }
  };

  return (
    <div>
      <h1>Management Account </h1>
      <Button type="primary" onClick={fetchUsers} style={{ marginBottom: '20px' }}>
        <LoadingOutlined style={{ marginRight: 8 }} /> Refresh
      </Button>
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="uid"
        pagination={{ pageSize: 5 }} // Đặt phân trang cho 5 người dùng mỗi trang
      />

      {/* Modal để cập nhật vai trò */}
      <Modal
  title="Cập nhật Vai trò"
  visible={isModalVisible}
  onCancel={() => setIsModalVisible(false)} // Đóng modal khi nhấn hủy
  footer={null} // Tắt footer mặc định để tùy chỉnh
>
  <p>Cập nhật vai trò cho {selectedUser?.full_name}</p>
  <Select value={newRole} onChange={setNewRole} style={{ width: '100%' }}>
    <Option value="R5">Admin</Option>
    <Option value="R4">Manager</Option>
    <Option value="R3">Reefeer</Option>
    <Option value="R2">Staff</Option>
    <Option value="R1">Customer</Option>
  </Select>
  
  {/* Thêm hai nút tại đây */}
  <div className="fish-modal-footer">
  <Button type="primary" onClick={updateRole}>
      Lưu
    </Button>
    <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: '10px' }}>
      Hủy
    </Button>

  </div>
</Modal>

    </div>
  );
}

export default UserManagement;
