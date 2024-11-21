import React, { useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { LockOutlined } from '@ant-design/icons'; // Import icon
import { useUser } from '../../../../data/UserContext';
import { api } from '../../../../config/AxiosConfig';

function CustomerResetPassword() {
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  const [form] = Form.useForm(); // Sử dụng form instance của Ant Design

  const handleChangePassword = async () => {
    try {
      // Validate các trường trước khi gửi dữ liệu
      await form.validateFields();

      const { oldPassword, newPassword, confirmPassword } = form.getFieldsValue();

      if (newPassword !== confirmPassword) {
        message.error('Mật khẩu mới không khớp.');
        return;
      }

      if (!user || !user.accessToken) {
        message.error('Không tìm thấy token, vui lòng đăng nhập lại.');
        return;
      }

      const payload = {
        oldPassword,
        newPassword,
      };

      await api.post('/api/User/Change Password', payload, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      message.success('Mật khẩu đã được cập nhật thành công!');
      handleClose();
    } catch (error) {
      if (error.name === 'ValidationError') {
        message.error('Vui lòng kiểm tra lại các trường.');
      } else {
        message.error('Đã xảy ra lỗi khi thay đổi mật khẩu.');
        console.error(error);
      }
    }
  };

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => {
    setIsVisible(false);
    form.resetFields(); // Reset tất cả các trường trong form
  };

  return (
    <div>
      {/* Button mở modal */}
      <Button type="primary" icon={<LockOutlined />} onClick={handleOpen} style={{color: '#FFD700'}}>
        Đổi mật khẩu
      </Button>

      {/* Modal đổi mật khẩu */}
      <Modal
        title="Đổi mật khẩu"
        visible={isVisible}
        onCancel={handleClose}
        footer={
          <div style={{ display: 'flex', gap: 220 }}>
            <Button key="submit" type="primary" onClick={handleChangePassword}>
              Đổi mật khẩu
            </Button>
            <Button key="cancel" onClick={handleClose}>
              Hủy
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]} // Validation
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]} // Validation
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]} // Validation
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerResetPassword;
