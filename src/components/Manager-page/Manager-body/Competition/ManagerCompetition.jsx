import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Đường dẫn tới file cấu hình Axios

function ManagerCompetition() {
  const [competitions, setCompetitions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [form] = Form.useForm();

  // Lấy danh sách Competition Koi từ API
  const fetchCompetitions = async () => {
    try {
      const response = await api.get('/api/CompetitionKoi/GetAll'); // Đảm bảo endpoint này chính xác
      setCompetitions(response.data);
    } catch (error) {
      console.error('Error fetching competitions:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch competitions.',
      });
    }
  };

  useEffect(() => {
    fetchCompetitions(); // Gọi hàm khi component được mount
  }, []);

  // Hàm xử lý thêm hoặc cập nhật Competition Koi
  const handleSubmit = async (values) => {
    try {
      if (editingCompetition) {
        // Cập nhật Competition Koi
        await api.put(`/api/CompetitionKoi/UpdateCompetitionKoi/${editingCompetition.id}`, values);
        notification.success({
          message: 'Update Success',
          description: 'Competition updated successfully.',
        });
      } else {
        // Tạo mới Competition Koi
        await api.post('/api/CompetitionKoi/CreateCompetitionKoi', values);
        notification.success({
          message: 'Create Success',
          description: 'Competition created successfully.',
        });
      }
      setIsModalVisible(false);
      setEditingCompetition(null);
      fetchCompetitions(); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error saving competition:', error);
      notification.error({
        message: 'Operation Failed',
        description: 'Could not save competition.',
      });
    }
  };

  // Mở modal để thêm hoặc chỉnh sửa Competition Koi
  const showModal = (competition) => {
    setEditingCompetition(competition);
    form.setFieldsValue(competition || { name: '', description: '', categoryId: '' }); // Đặt giá trị vào form
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCompetition(null);
  };

  // Xóa Competition Koi
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/CompetitionKoi/DeleteCompetitionKoi/${id}`);
      notification.success({
        message: 'Delete Success',
        description: 'Competition deleted successfully.',
      });
      fetchCompetitions(); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error deleting competition:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete competition.',
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
      title: 'Category ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
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
      <h1>Competition Management</h1>
      <Button type="primary" onClick={() => showModal(null)} style={{ marginBottom: '20px' }}>
        Add Competition
      </Button>
      <Table dataSource={competitions} columns={columns} rowKey="id" />

      <Modal
        title={editingCompetition ? "Edit Competition" : "Add Competition"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the competition!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category ID"
            rules={[{ required: true, message: 'Please input the category ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCompetition ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagerCompetition;
