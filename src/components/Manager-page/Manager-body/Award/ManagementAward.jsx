import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, notification, Popconfirm } from 'antd';
import { api } from '../../../../config/AxiosConfig';
import { TrophyOutlined, NumberOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

function ManagementAward() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingAward, setEditingAward] = useState(null);

  // Fetch all awards
  const fetchAwards = async () => {
    try {
      const response = await api.get('/api/Award/Get All Award');
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
    fetchAwards();
  }, []);

  // Function to add a new award
  const addAward = async (values) => {
    try {
      await api.post('/api/Award/Create Award', values);
      notification.success({
        message: 'Award Created',
        description: `Award "${values.award_name}" has been created.`,
      });
      fetchAwards();
    } catch (error) {
      console.error('Error creating award:', error);
      notification.error({
        message: 'Creation Failed',
        description: 'Could not create award.',
      });
    }
  };

  // Function to update an existing award
  const updateAward = async (values) => {
    try {
      await api.put('/api/Award/Update Award', { ...values, award_id: editingAward.award_id });
      notification.success({
        message: 'Award Updated',
        description: `Award "${values.award_name}" has been updated.`,
      });
      fetchAwards();
    } catch (error) {
      console.error('Error updating award:', error);
      notification.error({
        message: 'Update Failed',
        description: 'Could not update award.',
      });
    }
  };

  // Handle Create or Update Award based on editing state
  const handleSaveAward = async (values) => {
    if (editingAward) {
      await updateAward(values);
    } else {
      await addAward(values);
    }
    setIsModalOpen(false);
    form.resetFields();
    setEditingAward(null);
  };

  // Open modal for creating a new award or editing an existing one
  const openModal = (award = null) => {
    setEditingAward(award);
    setIsModalOpen(true);
    if (award) {
      form.setFieldsValue(award);
    }
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingAward(null);
  };

  // Delete an award with confirmation
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/Award/Delete Award?awardId=${id}`);
      notification.success({
        message: 'Award Deleted',
        description: `Award with ID ${id} has been deleted.`,
      });
      fetchAwards();
    } catch (error) {
      console.error('Error deleting award:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete award.',
      });
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Award ID',
      dataIndex: 'award_id',
      key: 'award_id',
    },
    {
      title: 'Award Name',
      dataIndex: 'award_name',
      key: 'award_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Competition Name',
      dataIndex: ['competition', 'competition_name'],
      key: 'competition_name',
      render: (text, record) => record.competition?.competition_name || 'N/A',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <div style={{display:'flex', gap:'5px'}}>
          <Button type="link" icon={<EditOutlined />} onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this award?"
            onConfirm={() => handleDelete(record.award_id)}
            okText={<span style={{ display: 'flex', alignItems: 'center' }}>Yes</span>}
            cancelText={<span style={{ display: 'flex', alignItems: 'center' }}>No</span>}
            okButtonProps={{
              style: { marginRight: '5px', display: 'inline-flex', alignItems: 'center' }, // Ensure alignment
            }}
            cancelButtonProps={{
              style: { display: 'inline-flex', alignItems: 'center' }, // Ensure alignment
            }}
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Management Award</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        style={{ marginBottom: '20px' }}
      >
        Create Award
      </Button>
      <Table
        dataSource={awards}
        columns={columns}
        loading={loading}
        rowKey="award_id"
        pagination={{ pageSize: 3 }}
      />

      {/* Modal for creating/editing an award */}
      <Modal
        title={editingAward ? 'Edit Award' : 'Create Award'}
        visible={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText={editingAward ? 'Update' : 'Create'}
        footer={
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {editingAward ? 'Update' : 'Create'}
          </Button>,
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
          </div>

        }
      >
        <Form form={form} layout="vertical" onFinish={handleSaveAward}>
          <Form.Item
            label="Award Name"
            name="award_name"
            rules={[{ required: true, message: 'Please enter the award name' }]}
          >
            <Input prefix={<TrophyOutlined />} />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity of the award' }]}
          >
            <Input prefix={<NumberOutlined />} type="number" />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
}

export default ManagementAward;
