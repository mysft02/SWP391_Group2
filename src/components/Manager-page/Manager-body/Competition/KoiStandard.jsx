import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Đường dẫn tới file cấu hình Axios

function KoiStandard() {
  const [koiCategories, setKoiCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKoi, setEditingKoi] = useState(null);
  const [form] = Form.useForm();

  // Lấy danh sách Koi Category từ API
  const fetchKoiCategories = async () => {
    try {
      const response = await api.get('/api/KoiCategory/GetAll');
      setKoiCategories(response.data);
    } catch (error) {
      console.error('Error fetching Koi Categories:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch Koi categories.',
      });
    }
  };

  useEffect(() => {
    fetchKoiCategories(); // Gọi hàm khi component được mount
  }, []);

  // Hàm xử lý thêm hoặc cập nhật Koi Category
  const handleSubmit = async (values) => {
    try {
      if (editingKoi) {
        // Cập nhật Koi Category
        await api.put(`/api/KoiCategory/UpdateKoiCategory/${editingKoi.id}`, values);
        notification.success({
          message: 'Update Success',
          description: 'Koi category updated successfully.',
        });
      } else {
        // Tạo mới Koi Category
        await api.post('/api/KoiCategory/CreateKoiCategory', values);
        notification.success({
          message: 'Create Success',
          description: 'Koi category created successfully.',
        });
      }
      setIsModalVisible(false);
      setEditingKoi(null);
      fetchKoiCategories(); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error saving Koi Category:', error);
      notification.error({
        message: 'Operation Failed',
        description: 'Could not save Koi category.',
      });
    }
  };

  // Mở modal để thêm hoặc chỉnh sửa Koi Category
  const showModal = (koi) => {
    setEditingKoi(koi);
    form.setFieldsValue(koi || { name: '', description: '' }); // Đặt giá trị vào form
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingKoi(null);
  };

  // Xóa Koi Category
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/KoiCategory/DeleteKoiCategory/${id}`);
      notification.success({
        message: 'Delete Success',
        description: 'Koi category deleted successfully.',
      });
      fetchKoiCategories(); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error deleting Koi Category:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete Koi category.',
      });
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Koi Category Management</h1>
      <Button type="primary" onClick={() => showModal(null)} style={{ marginBottom: '20px' }}>
        Add Koi Category
      </Button>
      <Table dataSource={koiCategories} columns={columns} rowKey="id" />

      <Modal
        title={editingKoi ? "Edit Koi Category" : "Add Koi Category"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the Koi category!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingKoi ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default KoiStandard;
