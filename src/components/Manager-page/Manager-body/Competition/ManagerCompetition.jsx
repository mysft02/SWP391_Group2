import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import moment from 'moment';


function ManagerCompetition() {
  const [competitions, setCompetitions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [form] = Form.useForm();

  const fetchCompetitions = async () => {
    try {
      const response = await api.get('/api/CompetitionKoi/Get all CompetitionKoi');
      const formattedData = response.data.map(item => ({
        competitionId: item.competitionId,
        competitionName: item.competitionName,
        competitionDescription: item.competitionDescription,
        startTime: item.startTime,
        endTime: item.endTime,
        statusCompetition: item.statusCompetition,
        round: item.round,
        competitionImg: item.competitionImg,
        category_id: item.category_id,
        koi_id: item.koi_id,
        referee_id: item.referee_id,
        award_id: item.award_id,
      }));
      setCompetitions(formattedData);
    } catch (error) {
      console.error('Error fetching competitions:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch competitions.',
      });
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const createCompetition = async (values) => {
    const payload = {
      competition_name: values.competitionName,
      competition_description: values.competitionDescription,
      start_time: values.startTime ? values.startTime.toISOString() : null,
      end_time: values.endTime ? values.endTime.toISOString() : null,
      status_competition: values.statusCompetition,
      category_id: values.categoryId || "CAT_1",
      koi_id: values.koiId || "K1",
      referee_id: values.refereeId || "REF_1",
      award_id: values.awardId || "AWD_1",
      rounds: values.round,
      competition_img: values.competitionImg || "haha.jpg",
    };

    try {
      await api.post('/api/CompetitionKoi/Create CompetitionKoi', payload);
      notification.success({
        message: 'Create Success',
        description: 'Competition created successfully.',
      });
      fetchCompetitions();
    } catch (error) {
      console.error('Error creating competition:', error);
      notification.error({
        message: 'Create Failed',
        description: 'Could not create competition.',
      });
    }
  };

  const updateCompetition = async (values) => {
    const payload = {
      competitionId: editingCompetition.competitionId, // Thêm trường competitionId
      competitionName: values.competitionName,
      competitionDescription: values.competitionDescription,
      start_time: values.startTime ? values.startTime.toISOString() : null,
      end_time: values.endTime ? values.endTime.toISOString() : null,
      status_competition: values.statusCompetition,
      category_id: values.categoryId || "CAT_1", // Cần tương ứng với koiCategoryId
      koi_id: values.koiId || "K1", // Cần tương ứng với koiFishId
      referee_id: values.refereeId || "REF_1",
      award_id: values.awardId || "AWD_1",
      rounds: values.round,
      competition_img: values.competitionImg || "haha.jpg",
    };
  
    try {
      await api.put(`/api/CompetitionKoi/Update Competition/${editingCompetition.competitionId}`, payload);
      notification.success({
        message: 'Update Success',
        description: 'Competition updated successfully.',
      });
      fetchCompetitions();
    } catch (error) {
      console.error('Error updating competition:', error);
      notification.error({
        message: 'Update Failed',
        description: 'Could not update competition.',
      });
    }
  };
  

  const handleSubmit = async (values) => {
    if (editingCompetition) {
      await updateCompetition(values);
    } else {
      await createCompetition(values);
    }
    setIsModalVisible(false);
    setEditingCompetition(null);
  };

  const showModal = (competition) => {
    if (competition) {
      console.log("Editing competition:", competition); // Log đối tượng cuộc thi đang chỉnh sửa
      setEditingCompetition(competition);
      form.setFieldsValue({
        competitionName: competition.competitionName || '',
        competitionDescription: competition.competitionDescription || '',
        round: competition.round || '',
        statusCompetition: competition.statusCompetition || '',
        startTime: competition.startTime ? moment(competition.startTime) : null,
        endTime: competition.endTime ? moment(competition.endTime) : null,
        categoryId: competition.category_id || '',
        koiId: competition.koi_id || '',
        refereeId: competition.referee_id || '',
        awardId: competition.award_id || '',
        competitionImg: competition.competitionImg || '',
      });
    } else {
      console.log("Adding new competition"); // Log khi thêm mới
      setEditingCompetition(null);
      form.resetFields(); // Đặt lại các trường khi thêm mới
    }
    
    setIsModalVisible(true);
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCompetition(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/CompetitionKoi/Delete Competition?competitionId=${id}`);
      notification.success({
        message: 'Delete Success',
        description: 'Competition deleted successfully.',
      });
      fetchCompetitions();
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
          <Form.Item
            name="categoryId"
            label="Category ID"
            rules={[{ required: true, message: 'Please input the category ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="koiId"
            label="Koi ID"
            rules={[{ required: true, message: 'Please input the koi ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="refereeId"
            label="Referee ID"
            rules={[{ required: true, message: 'Please input the referee ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="awardId"
            label="Award ID"
            rules={[{ required: true, message: 'Please input the award ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="competitionImg"
            label="Competition Image"
            rules={[{ required: true, message: 'Please input the competition image!' }]}
          >
            <Input />
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
