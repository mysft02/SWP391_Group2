import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Đường dẫn tới file cấu hình Axios

function KoiStandard() {
  const [koiStandard, setKoiStandard] = useState([]); // Khởi tạo danh sách Koi Standard
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKoi, setEditingKoi] = useState(null);
  const [form] = Form.useForm();

  // Lấy danh sách Koi Standard từ API
  const fetchKoiStandard = async () => {
    try {
      const response = await api.get('/api/KoiStandard/Get All KoiStandard');
      const formattedData = response.data.map(koi => ({
        id: koi.standard_id, // Sử dụng standard_id làm ID
        color: koi.color_koi, // Khởi tạo trường color
        pattern: koi.pattern_koi, // Khởi tạo trường pattern
        size: koi.size_koi, // Khởi tạo trường size
        age: koi.age_koi, // Khởi tạo trường age
        bodyShape: koi.bodyshape_koi, // Khởi tạo trường bodyShape
        variety: koi.variety_koi, // Khởi tạo trường variety
        name: koi.standard_name, // Khởi tạo trường name
        gender: koi.gender // Khởi tạo trường gender
      }));
      setKoiStandard(formattedData); // Cập nhật danh sách Koi Standard
    } catch (error) {
      console.error('Error fetching Koi Standard:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch Koi standard.',
      });
    }
  };

  useEffect(() => {
    fetchKoiStandard(); // Gọi hàm khi component được mount
  }, []);

  // Hàm xử lý thêm hoặc cập nhật Koi Standard
  const handleSubmit = async (values) => {
    try {
      if (editingKoi) {
        // Cập nhật Koi Standard
        await api.put(`/api/KoiCategory/UpdateKoiCategory/${editingKoi.id}`, values);
        notification.success({
          message: 'Update Success',
          description: 'Koi standard updated successfully.',
        });
      } else {
        // Tạo mới Koi Standard
        await api.post('/api/KoiCategory/CreateKoiCategory', values);
        notification.success({
          message: 'Create Success',
          description: 'Koi standard created successfully.',
        });
      }
      setIsModalVisible(false);
      setEditingKoi(null);
      fetchKoiStandard(); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error saving Koi Standard:', error);
      notification.error({
        message: 'Operation Failed',
        description: 'Could not save Koi standard.',
      });
    }
  };

  // Mở modal để thêm hoặc chỉnh sửa Koi Standard
  const showModal = (koi) => {
    setEditingKoi(koi);
    form.setFieldsValue(koi || { // Đặt giá trị vào form
      id: '',
      color: '',
      pattern: '',
      size: '',
      age: '',
      bodyShape: '',
      variety: '',
      name: '',
      gender: ''
    });
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingKoi(null);
  };

  // Xóa Koi Standard
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/KoiCategory/DeleteKoiCategory/${id}`);
      notification.success({
        message: 'Delete Success',
        description: 'Koi standard deleted successfully.',
      });
      fetchKoiStandard(); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error deleting Koi Standard:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete Koi standard.',
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
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Pattern',
      dataIndex: 'pattern',
      key: 'pattern',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Body Shape',
      dataIndex: 'bodyShape',
      key: 'bodyShape',
    },
    {
      title: 'Variety',
      dataIndex: 'variety',
      key: 'variety',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
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
      <h1>Koi Standard Management</h1>
      <Button type="primary" onClick={() => showModal(null)} style={{ marginBottom: '20px' }}>
        Add Koi Standard
      </Button>
      <Table dataSource={koiStandard} columns={columns} rowKey="id" />

      <Modal
        title={editingKoi ? "Edit Koi Standard" : "Add Koi Standard"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the Koi standard!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: 'Please input the color of the Koi!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="pattern"
            label="Pattern"
            rules={[{ required: true, message: 'Please input the pattern of the Koi!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bodyShape"
            label="Body Shape"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="variety"
            label="Variety"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
          >
            <Input />
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
