import React, { useEffect } from 'react';
import { Form, Input, Button, message as antdMessage } from 'antd';
import { UserOutlined, DollarOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import moment from 'moment';

const PaymentCustomer = () => {
  const [form] = Form.useForm();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        user_id: user.user_id,
        username: user.username,
        balance: user.balance,
      });
    }
  }, [user, form]);

  useEffect(() => {
    const currentDate = moment();
    form.setFieldsValue({ createDate: currentDate });
  }, [form]);

  // Kiểm tra thanh toán thành công
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
      antdMessage.success('Thanh toán thành công!');
    } else if (status === 'failed') {
      antdMessage.error('Thanh toán thất bại. Vui lòng thử lại.');
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/api/VNPay/Get-Payment-Url', values, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        antdMessage.error('Không tìm thấy URL thanh toán. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi nạp tiền:', error);
      antdMessage.error('Không thể nạp tiền. Vui lòng thử lại.');
    }
  };

  return (
    <div className="payment-container" style={{ padding: '20px', height: '120%' }}>
      <h2>Payment Form</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical" style={{ display: 'flex', flexDirection: 'column' }}>
        <Form.Item label="Tên người dùng">
          <Input prefix={<UserOutlined />} value={user.username} disabled />
        </Form.Item>

        <Form.Item label="Số dư tài khoản">
          <Input prefix={<DollarOutlined />} value={user.balance} disabled />
        </Form.Item>

        <Form.Item label="Số tiền nạp" name="amount" rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}>
          <Input prefix={<DollarOutlined />} type="number" />
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
