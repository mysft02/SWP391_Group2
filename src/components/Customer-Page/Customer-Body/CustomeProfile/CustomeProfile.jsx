import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, DollarOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import './CustomeProfile.css';
import avatar from '../../../../assets/img/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg';

function CustomeProfile() {
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
  const [oldPassword, setOldPassword] = useState('');

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
          Authorization: `Bearer ${user.accessToken}`,
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
      message.error('Đã xảy ra lỗi khi cập nhật thông tin.');
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
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      await api.post('/api/User/ChangePassword', payload, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      message.success('Mật khẩu đã được cập nhật thành công!');
      setIsModalVisible(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      message.error('Đã xảy ra lỗi khi thay đổi mật khẩu.');
      console.error(error);
    }
  };

  return (
    <div className="custome-profile-container">
      {/* Left Section - Update Profile */}
      
      <div className="profile-section">
        <Form layout="vertical" onFinish={handleSubmit}>
          <h2 className="section-title">Cập nhật hồ sơ</h2>
          <Form.Item label="Họ và Tên" required>
            <Input
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên của bạn"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item label="Email" required>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email của bạn"
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item label="Điện thoại" required>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại của bạn"
              prefix={<PhoneOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật hồ sơ
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Right Section - User Info & Change Password */}
      <div className="user-info-section">
        <div className="avatar-section">
          <img src={avatar} alt="avatar" className="avatar" />
          <div className="user-info">
            <div className="username">{user.username}</div>
            <div className="email">{user.email}</div>
            <div className="balance">Balance: ${user.balance}</div>
          </div>
        </div>

        <div className='button-customer'>
          <Button type="default" icon={<LockOutlined />} onClick={() => setIsModalVisible(true)}>
            Đổi mật khẩu
          </Button>
        </div>

        {/* Change Password Modal */}
        <Modal
          title="Đổi mật khẩu"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={
            <div className="fish-modal-footer">
            <Button key="submit" type="primary" onClick={handleChangePassword}>
              Đổi mật khẩu
            </Button>,
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Hủy
            </Button>,

            </div>
          }
        >
          <Form layout="vertical">
            <Form.Item label="Mật khẩu cũ" required>
              <Input.Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </Form.Item>
            <Form.Item label="Mật khẩu mới" required>
              <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Item>
            <Form.Item label="Xác nhận mật khẩu" required>
              <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default CustomeProfile;
