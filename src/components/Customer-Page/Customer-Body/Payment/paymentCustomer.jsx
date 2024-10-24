import React, { useEffect } from 'react';
import { Form, Input, Button, message as antdMessage } from 'antd';
import { UserOutlined, DollarOutlined, InfoCircleOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import moment from 'moment'; // Import moment để xử lý thời gian

const PaymentCustomer = () => {
  const [form] = Form.useForm();
  const { user } = useUser(); // Lấy thông tin user từ useUser
  
  useEffect(() => {
    if (user) {
      // Thiết lập lại giá trị cho form khi có dữ liệu user
      form.setFieldsValue({
        user_id: user.user_id,
        username: user.username,
        balance: user.balance,
      });
    }
  }, [user, form]); // Chỉ khi user hoặc form thay đổi
  
  useEffect(() => {
    // Lấy thời gian thực và đặt vào trường Create Date
    const currentDate = moment(); // Thời gian hiện tại
    form.setFieldsValue({ createDate: currentDate }); // Thiết lập giá trị cho trường Create Date
  }, [form]); // Chỉ khi form thay đổi
  
  // Hàm xử lý gửi form nạp tiền
  const handleSubmit = async (values) => {
    try {
      // Gửi yêu cầu tạo URL thanh toán
      const response = await api.post('/api/VNPay/Get-Payment-Url', values, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Chỉ chuyển hướng nếu URL thanh toán được tạo thành công
      if (response.data && response.data.url) {
        window.location.href = response.data.url;

        // Lấy thông báo sau khi thanh toán
        const messageResponse = await api.post('/api/VNPay', values);
        
        // Kiểm tra phản hồi từ API
        if (messageResponse.data && messageResponse.data.success) {
          console.log("Data:", messageResponse.data);
          antdMessage.success('Payment was successful!');
        } else {
          antdMessage.error('Payment was unsuccessful. Please try again.');
        }
      } else {
        antdMessage.error('Payment URL not found. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      antdMessage.error('Failed to submit payment. Please try again.');
    }
  };

  return (
    <div className="payment-container" style={{ padding: '20px',height:'120%' }}>
      <h2>Payment Form</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ display: 'flex', flexDirection: 'column' }} // Changed to column layout
      >
        {/* Combined Form Fields */}

        <Form.Item label="Tên người dùng">
          <Input
            prefix={<UserOutlined />} // Icon for username
            value={user.username}
            disabled
          />
        </Form.Item>

        <Form.Item label="Số dư tài khoản">
          <Input
            prefix={<DollarOutlined />} // Icon for balance
            value={user.balance}
            disabled
          />
        </Form.Item>



        <Form.Item
          label="Số tiền nạp"
          name="amount"
          rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
        >
          <Input
            prefix={<DollarOutlined />} // Icon for amount
            type="number"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Nạp Tiền
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaymentCustomer;
