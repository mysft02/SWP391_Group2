import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, message as antdMessage } from 'antd'; // Đổi tên message thành antdMessage để tránh xung đột
import { api } from '../../../../config/AxiosConfig';
import moment from 'moment'; // Nhập moment để xử lý thời gian

const PaymentCustomer = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Lấy thời gian thực và đặt vào trường Create Date
    const currentDate = moment(); // Thời gian hiện tại
    form.setFieldsValue({ createDate: currentDate }); // Thiết lập giá trị cho trường Create Date
  }, [form]);

  // Hàm xử lý gửi form
  const handleSubmit = async (values) => {
    try {
      // Gửi yêu cầu tạo URL thanh toán
      const response = await api.post('/api/VNPay/Get-Payment-Url', values);

      // Chỉ chuyển hướng nếu URL thanh toán được tạo thành công
      if (response.data && response.data.url) {
        // Chuyển hướng đến URL thanh toán
        window.location.href = response.data.url;

        // Gửi yêu cầu lấy thông báo (message) từ API
        const messageResponse = await api.get('/api/VNPay', values);
        
        // Kiểm tra phản hồi từ messageResponse
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
