import React from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { api } from '../../../config/AxiosConfig';

const PaymentCustomer = () => {
  const [form] = Form.useForm();

  // Hàm xử lý gửi form
  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/api/VNPay/Get-Payment-Url', values);
      
      // Kiểm tra xem response có dữ liệu cần thiết không
      if (response.data && response.data.paymentUrl) {
        // Chuyển hướng đến URL thanh toán
        window.location.href = response.data.paymentUrl;
      } else {
        message.error('Payment URL not found. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      message.error('Failed to submit payment. Please try again.');
    }
  };

  return (
    <div className='payment-container'>
      <h2>Payment Form</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="User ID"
          name="userID"
          rules={[{ required: true, message: 'Please input your User ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input a description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please input the amount!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Create Date"
          name="createDate"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Koi ID"
          name="koiId"
          rules={[{ required: true, message: 'Please input the Koi ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Payment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaymentCustomer;
