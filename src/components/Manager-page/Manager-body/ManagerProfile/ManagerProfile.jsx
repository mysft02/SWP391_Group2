import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';

function ManagerProfile() {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    user_name: '',
    full_name: '',
    email: '',
    phone: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState(''); // New state for old password

  useEffect(() => {
    if (user) {
      setFormData({
        user_name: user.username || '',
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!user || !user.accessToken) {
      message.error('Không tìm thấy token, vui lòng đăng nhập lại.');
      return;
    }

    const payload = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      await api.put('/api/User/update-profile', payload, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      message.success('Thông tin đã được cập nhật thành công!');
      setUser({
        ...user,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        message.error('Bạn không có quyền thực hiện hành động này. Vui lòng đăng nhập lại.');
      } else {
        message.error('Đã xảy ra lỗi khi cập nhật thông tin.');
      }
      console.error(error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      message.error('Mật khẩu mới không khớp.');
      return;
    }
    
    if (!user || !user.accessToken) {
      message.error('Không tìm thấy token, vui lòng đăng nhập lại.');
      return;
    }

    try {
      const payload = {
        oldPassword: oldPassword, // Include oldPassword
        newPassword: newPassword,
      };
      
      await api.post('/api/User/Change Password', payload, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      message.success('Mật khẩu đã được cập nhật thành công!');
      setIsModalVisible(false);
      setOldPassword(''); // Clear old password field
      setNewPassword(''); // Clear new password field
      setConfirmPassword(''); // Clear confirm password field
    } catch (error) {
      message.error('Đã xảy ra lỗi khi thay đổi mật khẩu.');
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '800px', margin: '0 auto', color: '#003366' }}>
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>Cập nhật hồ sơ</h2>
        <Form layout="vertical" onFinish={handleSubmit} style={{ width: '200%' }}>
          <Form.Item
            label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Tên người dùng</span>}
            required
          >
            <Input
              name="username"
              value={formData.user_name}
              onChange={handleInputChange}
              placeholder="Nhập tên người dùng của bạn"
              prefix={<UserOutlined />}
              style={{ color: '#003366' }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Họ và Tên</span>}
            required
          >
            <Input
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên của bạn"
              prefix={<UserOutlined />}
              style={{ color: '#003366' }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Email</span>}
            required
          >
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email của bạn"
              prefix={<MailOutlined />}
              style={{ color: '#003366' }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Điện thoại</span>}
            required
          >
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại của bạn"
              prefix={<PhoneOutlined />}
              style={{ color: '#003366' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<UserOutlined />}
              style={{ fontSize: '15px', fontWeight: 'bold', marginLeft: '0' }}
            >
              Cập nhật hồ sơ
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Đường kẻ phân tách */}
      <div style={{ borderLeft: '2px solid #333', height: 'auto', marginLeft:'350px' }}></div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'inherit', justifyContent: 'center' , marginTop:'50px'}}>
        <Button
          type="default"
          icon={<LockOutlined />}
          onClick={() => setIsModalVisible(true)}
          style={{ fontSize: '15px', fontWeight: 'bold' }}
        >
          Đổi mật khẩu
        </Button>
      </div>

      <Modal
        title="Đổi mật khẩu"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <div className="fish-modal-footer">
            <Button key="submit" type="primary" onClick={handleChangePassword}>
              Đổi mật khẩu
            </Button>
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Hủy
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item
            label="Mật khẩu cũ"
            required
          >
            <Input.Password
              value={oldPassword} // Bind oldPassword state
              onChange={(e) => setOldPassword(e.target.value)} // Update oldPassword state
              placeholder="Nhập mật khẩu cũ của bạn"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            required
          >
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới của bạn"
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            required
          >
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu mới"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagerProfile;
