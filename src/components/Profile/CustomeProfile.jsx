import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

function CustomeProfile() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    message.success('Thông tin đã được cập nhật thành công!');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#003366' }}>
      <h2 style={{ fontSize:'30px', fontWeight: 'bold' }}>Update Profile</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label={<span style={{ fontSize:'20px', fontWeight: 'bold' }}>User Name</span>} required>
          <Input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item label={<span style={{ fontSize:'20px', fontWeight: 'bold' }}>Full Name</span>} required>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item label={<span style={{ fontSize:'20px', fontWeight: 'bold' }}>Password</span>} required>
          <Input.Password
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item label={<span style={{ fontSize:'20px', fontWeight: 'bold' }}>Email</span>} required>
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item label={<span style={{ fontSize:'20px', fontWeight: 'bold' }}>Phone</span>} required>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            style={{ color: '#003366' }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit"  style={{ fontSize:'15px', fontWeight: 'bold', marginLeft: '200px' }}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CustomeProfile;
