import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Điều chỉnh đường dẫn này theo cấu hình của bạn

function ManagementAward() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingAward, setEditingAward] = useState(null);

  // Fetch all awards
  const fetchAwards = async () => {
    try {
      const response = await api.get('/api/Award/GetAllAwards');
      setAwards(response.data);
    } catch (error) {
      console.error('Error fetching awards:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch award data.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwards(); // Fetch awards when component is mounted
  }, []);

  // Handle Create or Update Award
  const handleSaveAward = async (values) => {
    try {
      if (editingAward) {
        // Update award
        await api.put(`/api/Award/UpdateAward`, { ...values, id: editingAward.id });
        notification.success({
          message: 'Award Updated',
          description: `Award "${values.name}" has been updated.`,
        });
      } else {
        // Create award
        await api.post('/api/Award/CreateAward', values);
        notification.success({
          message: 'Award Created',
          description: `Award "${values.name}" has been created.`,
        });
      }
      fetchAwards(); // Refresh the list after saving
      setIsModalOpen(false); // Close modal
      form.resetFields(); // Reset form
      setEditingAward(null); // Reset editing state
    } catch (error) {
      console.error('Error saving award:', error);
      notification.error({
        message: 'Save Failed',
        description: 'Could not save award data.',
      });
    }
  };

  // Open modal for creating a new award or editing an existing one
  const openModal = (award = null) => {
    setEditingAward(award);
    setIsModalOpen(true);
    if (award) {
      form.setFieldsValue(award); // Fill form with existing award data
    }
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingAward(null);
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Award ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Award Name',
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
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Delete an award
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/Award/DeleteAward/${id}`); // Giả sử đây là endpoint để xóa award
      notification.success({
        message: 'Award Deleted',
        description: `Award with ID ${id} has been deleted.`,
      });
      fetchAwards(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting award:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete award.',
      });
    }
  };

  return (
    <div>
      <h1>Management Award</h1>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: '20px' }}>
        Create Award
      </Button>
      <Table
        dataSource={awards}
        columns={columns}
        loading={loading}
        rowKey="id" // Ensure 'id' is a unique key
      />

      {/* Modal for creating/editing an award */}
      <Modal
        title={editingAward ? 'Edit Award' : 'Create Award'}
        visible={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText={editingAward ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveAward}>
          <Form.Item
            label="Award Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the award name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagementAward;
