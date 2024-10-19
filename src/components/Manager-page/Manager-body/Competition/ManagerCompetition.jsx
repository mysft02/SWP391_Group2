import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Import các icon cần thiết
import { api } from '../../../../config/AxiosConfig'; // Đường dẫn tới file cấu hình Axios

function ManagerCompetition() {
  const [competitions, setCompetitions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [form] = Form.useForm();

  // Lấy danh sách Competition Koi từ API
  const fetchCompetitions = async () => {
    try {
      const response = await api.get('/api/CompetitionKoi/Get all CompetitionKoi'); // Đảm bảo endpoint này chính xác
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
        await api.put(`/api/Competition/UpdateCompetition/${editingCompetition.competitionId}`, values);
        notification.success({
          message: 'Update Success',
          description: 'Competition updated successfully.',
        });
      } else {
        // Tạo mới Competition Koi
        await api.post('/api/Competition/CreateCompetition', values);
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
    form.setFieldsValue(competition || { 
      competitionName: '', 
      competitionDescription: '', 
      round: '', 
      statusCompetition: '', 
      startTime: null, 
      endTime: null
    }); // Đặt giá trị vào form
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
      await api.delete(`/api/Competition/DeleteCompetition/${id}`);
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
      dataIndex: 'competitionId',
      key: 'competitionId',
    },
    {
      title: 'Name',
      dataIndex: 'competitionName',
      key: 'competitionName',
    },
    {
      title: 'Description',
      dataIndex: 'competitionDescription',
      key: 'competitionDescription',
    },
    {
      title: 'Round',
      dataIndex: 'round',
      key: 'round',
    },
    {
      title: 'Status',
      dataIndex: 'statusCompetition',
      key: 'statusCompetition',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.competitionId)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Competition Management</h1>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => showModal(null)} 
        style={{ marginBottom: '20px' }}
      >
        Add Competition
      </Button>
      <Table dataSource={competitions} columns={columns} rowKey="competitionId" />

      <Modal
        title={editingCompetition ? "Edit Competition" : "Add Competition"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="competitionName"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the competition!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="competitionDescription"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="round"
            label="Round"
            rules={[{ required: true, message: 'Please input the round!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="statusCompetition"
            label="Status"
            rules={[{ required: true, message: 'Please input the status!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: 'Please select the start time!' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: 'Please select the end time!' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={editingCompetition ? <EditOutlined /> : <PlusOutlined />}>
              {editingCompetition ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagerCompetition;
