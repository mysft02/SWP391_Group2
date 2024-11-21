import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Modal, Col, Divider } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, DollarOutlined, PlusOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import './CustomeProfile.css';
import avatar from '../../../../assets/img/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg';
import HistoryBet from '../Customer-HistoryBet/HistoryBet';
import HistoryRegisKoi from '../Customer-HistoryRegistration/HistoryRegisKoi';
import CompetitionResult from '../CustomerCompetition/CompetitionResult';
import CustomerResetPassword from '../Customer-Password/CustomerResetPassword';
import ResultMatch from '../CustomerCompetition/ResultMatch';
import { useNavigate } from 'react-router-dom';

function CustomeProfile() {
  const navigate = useNavigate(); // Khởi tạo useNavigate
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
  const handlePaymentClick = () => {
    // Điều hướng đến trang Payment khi nhấn vào nút "+"
    navigate('/member/payment');
  };
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
          <Divider style={{ margin: '5px ',borderWidth: '3px' }} />
          <div className="history-bet-section">
            <HistoryBet />
          </div>
          <Divider style={{ margin: '5px ',borderWidth: '3px' }} />

          <div>
            <HistoryRegisKoi/>
          </div>

        </Form>
      </div>
      
      {/* Right Section - User Info & Change Password */}
      <div className="user-info-section">
        <div className="avatar-section">
          <img src={avatar} alt="avatar" className="avatar" />
          <div className="user-info">
            <div className="username">{user.username}</div>
            <div className="email">{user.email}</div>
            <div className="balance">
              Balance: {user.balance} $
            </div>
            
          </div>
          
        </div>
        
        <div className='button-customer'>
          <Button type="primary" htmlType="submit" onClick={handlePaymentClick} style={{color: '#FFD700'}}>
          <PlusOutlined />
            Nạp Tiền
          </Button>
          <CustomerResetPassword/>
          <CompetitionResult/>
          <ResultMatch/>
        </div>


      </div>

    </div>
  );
}

export default CustomeProfile;
