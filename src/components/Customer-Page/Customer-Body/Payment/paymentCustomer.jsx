import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message as antdMessage, Divider, List } from 'antd';
import { UserOutlined, DollarOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import moment from 'moment';
import './paymentCustomer.css';

const PaymentCustomer = () => {
  const [form] = Form.useForm();
  const { user } = useUser();
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Set up the user data
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        user_id: user.user_id,
        username: user.username,
        balance: user.balance,
      });
    }
  }, [user, form]);

  // Set current date for createDate
  useEffect(() => {
    const currentDate = moment();
    form.setFieldsValue({ createDate: currentDate });
  }, [form]);

  // Handle payment status (success or failed)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
      antdMessage.success('Thanh toán thành công!');
    } else if (status === 'failed') {
      antdMessage.error('Thanh toán thất bại. Vui lòng thử lại.');
    }
  }, []);

  // Fetch transaction history
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await api.get('/api/transaction-history', {
          headers: {
            'Authorization': `Bearer ${user.accessToken}`,
          },
        });
        if (response.data) {
          setTransactionHistory(response.data);
        }
      } catch (error) {
        console.error('Error fetching transaction history:', error);
        antdMessage.error('Không thể lấy lịch sử giao dịch. Vui lòng thử lại.');
      }
    };
    
    if (user) {
      fetchTransactionHistory();
    }
  }, [user]);

  // Handle payment submission
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
    <div className="payment-container">
      {/* Left Form for Payment */}
      <div className="form-section payment-form">
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

      {/* Right Form for Transaction History */}
      <div className="form-section transaction-history">
        <h2>Lịch sử giao dịch</h2>

        {/* Transaction List */}
        <List
          itemLayout="horizontal"
          dataSource={transactionHistory}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<span>{moment(item.transactionDate).format('DD/MM/YYYY')}</span>}
                description={
                  <div>
                    <p>Mã giao dịch: {item.transactionId}</p>
                    <p>Số tiền: {item.amount} VND</p>
                    <p>{item.status === 'success' ? 'Thành công' : 'Thất bại'}</p>
                  </div>
                }
              />
            </List.Item>
          )}
/>

      </div>
    </div>
  );
};

export default PaymentCustomer;
