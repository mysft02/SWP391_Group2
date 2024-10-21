import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Modal, Select } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Thay đổi theo đường dẫn của bạn
import { useUser } from '../../../../data/UserContext'; // Sử dụng useUser để lấy token

const { Option } = Select;

function UserManagement() {
  const { user } = useUser(); // Lấy user từ useUser
  const accessToken = user.accessToken; // Lấy accessToken từ user
  const [users, setUsers] = useState([]); // Quản lý danh sách người dùng
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  // Hàm để lấy danh sách người dùng từ API
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
        <>
          <Button type="link" onClick={() => handleUpdateRole(record)}>
            Update Role
          </Button>
        </>
      ),
    },
  ];

  // Hiển thị modal cập nhật role
  const handleUpdateRole = (user) => {
    setSelectedUser(user);
    setNewRole(user.role_id);
    setIsModalVisible(true);
  };

  // Hàm cập nhật role người dùng
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
      <h1>User Manager</h1>
      <Button type="primary" onClick={fetchUsers} style={{ marginBottom: '20px' }}>
        Refresh Users
      </Button>
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="uid"
      />

      {/* Modal cập nhật Role */}
      <Modal
        title="Update Role"
        visible={isModalVisible}
        onOk={updateRole}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Update role for {selectedUser?.full_name}</p>
        <Select value={newRole} onChange={setNewRole} style={{ width: '100%' }}>
          <Option value="R5">Admin</Option>
          <Option value="R4">Manager</Option>
          <Option value="R3">Reefeer</Option>
          <Option value="R2">Staff</Option>
          <Option value="R1">Customer</Option>
        </Select>
      </Modal>
    </div>
  );
}

export default UserManagement;
