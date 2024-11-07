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
        competition_id: item.competition_id,
        competition_name: item.competition_name,
        competition_description: item.competition_description,
        start_time: item.start_time,
        end_time: item.end_time,
        status_competition: item.status_competition,
        rounds: item.rounds,
        competition_img: item.competition_img,
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
      competition_name: values.competition_name,
      competition_description: values.competition_description,
      start_time: values.start_time ? values.start_time.toISOString() : null,
      end_time: values.end_time ? values.end_time.toISOString() : null,
      status_competition: values.status_competition,
      category_id: values.categoryId || "CAT_1",
      koi_id: values.koiId || "K1",
      referee_id: values.refereeId || "REF_1",
      award_id: values.award_id || "AWD_1",
      rounds: values.rounds,
      competition_img: values.competition_img || "haha.jpg",
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
    const params = new URLSearchParams({
        competition_id: editingCompetition.competition_id,
        competition_name: values.competition_name,
        competition_description: values.competition_description,
        start_time: values.start_time ? values.start_time.toISOString() : '',
        end_time: values.end_time ? values.end_time.toISOString() : '',
        status_competition: values.status_competition,
        koiCategoryId: values.categoryId || "CAT_1",
        koiFishId: values.koiId || "K1",
        refereeId: values.refereeId || "REF_1",
        award_id: values.award_id || "AWD_1",
        rounds: values.rounds,
        competition_img: values.competition_img || "haha.jpg",
    });

    try {
        // Gọi API với query string
        await api.post(`/api/CompetitionKoi/Update Competition?${params.toString()}`);
        notification.success({
            message: 'Cập nhật thành công',
            description: 'Cập nhật cuộc thi thành công.',
        });
        fetchCompetitions(); // Tải lại danh sách
    } catch (error) {
        console.error('Lỗi khi cập nhật cuộc thi:', error);
        notification.error({
            message: 'Cập nhật thất bại',
            description: 'Không thể cập nhật cuộc thi.',
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
        competition_name: competition.competition_name || '',
        competition_description: competition.competition_description || '',
        rounds: competition.rounds || '',
        status_competition: competition.status_competition || '',
        start_time: competition.start_time ? moment(competition.start_time) : null,
        end_time: competition.end_time ? moment(competition.end_time) : null,
        categoryId: competition.category_id || '',
        koiId: competition.koi_id || '',
        refereeId: competition.referee_id || '',
        award_id: competition.award_id || '',
        competition_img: competition.competition_img || '',
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
      await api.delete(`/api/CompetitionKoi/Delete Competition?competition_id=${id}`);
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
      dataIndex: 'competition_id',
      key: 'competition_id',
    },
    {
      title: 'Name',
      dataIndex: 'competition_name',
      key: 'competition_name',
    },
    {
      title: 'Description',
      dataIndex: 'competition_description',
      key: 'competition_description',
    },
    {
      title: 'Round',
      dataIndex: 'rounds',
      key: 'rounds',
    },
    {
      title: 'Status',
      dataIndex: 'status_competition',
      key: 'status_competition',
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.competition_id)}>Delete</Button>
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
      <Table dataSource={competitions} columns={columns} rowKey="competition_id" />

      <Modal
        title={editingCompetition ? "Edit Competition" : "Add Competition"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="competition_name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the competition!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="competition_description"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="rounds"
            label="rounds"
            rules={[{ required: true, message: 'Please input the rounds!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status_competition"
            label="Status"
            rules={[{ required: true, message: 'Please input the status!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="start_time"
            label="Start Time"
            rules={[{ required: true, message: 'Please select the start time!' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name="end_time"
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
            name="award_id"
            label="Award ID"
            rules={[{ required: true, message: 'Please input the award ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="competition_img"
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
