import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext'; // Sử dụng UserContext

function CustomeProfile() {
  const { user } = useUser(); // Lấy dữ liệu người dùng từ UserContext
  const [formData, setFormData] = useState({
    user_name: '',
    full_name: '',
    email: '',
    phone: '',
  });

  // Cập nhật formData từ dữ liệu user trong context
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

  // Cập nhật thông tin khi người dùng thay đổi các input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit dữ liệu cập nhật lên server
  const handleSubmit = async () => {
    const payload = {
      user_name: formData.user_name,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,

    };

    try {
      await api.put('/api/User/update-profile', payload);
      message.success('Thông tin đã được cập nhật thành công!');
    } catch (error) {
      message.error('Đã xảy ra lỗi khi cập nhật thông tin.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#003366' }}>
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
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
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
