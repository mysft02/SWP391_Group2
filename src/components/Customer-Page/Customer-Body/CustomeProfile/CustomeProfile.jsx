import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';

function CustomeProfile() {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    user_name: '',
    full_name: '',
    email: '',
    phone: '',
  });

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

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', color: '#003366' }}>
      <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>Update Profile</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>User Name</span>}
          required
        >
          <Input
            name="username"
            value={formData.user_name}
            onChange={handleInputChange}
            placeholder="Enter your username"
            prefix={<UserOutlined />}
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Full Name</span>}
          required
        >
          <Input
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
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
            placeholder="Enter your email"
            prefix={<MailOutlined />}
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Phone</span>}
          required
        >
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            prefix={<PhoneOutlined />}
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<UserOutlined />} // Add icon here
            style={{ fontSize: '15px', fontWeight: 'bold', marginLeft: '200px' }}
          >
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CustomeProfile;
