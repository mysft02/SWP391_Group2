import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification, DatePicker, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import moment from 'moment';
import { Option } from 'antd/es/mentions';
import { useUser } from '../../../../data/UserContext';
import SearchMatch from './SearchMatch';
import ProcessMatch from './ProcessMatch';

function ManagerCompetition() {
  const {user} = useUser();
  const [competitions, setCompetitions] = useState([]);
  const [competitionId] = useState(null); // Giá trị khởi tạo mặc định

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [koiCategories, setKoiCategories] = useState([]);
  const [koiFishes, setKoiFishes] = useState([]);
  const [referees, setReferees] = useState([]);
  const [awards, setAwards] = useState([]);
  const [form] = Form.useForm();
  const fetchKoiCategories = async () => {
    try {
      const response = await api.get('/api/KoiCategory/Get all KoiCategory');
      setKoiCategories(response.data);
    } catch (error) {
      console.error('Error fetching Koi Categories:', error);
    }
  };

  const fetchKoiFishes = async () => {
    try {
      const response = await api.post('/api/KoiFish/Get All Koi Fishes',{},{
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },

      });
      setKoiFishes(response.data);
    } catch (error) {
      console.error('Error fetching Koi Fishes:', error);
    }
  };

  const fetchReferees = async () => {
    try {
      const response = await api.post('/api/Referees/GetAllReferees',{},{
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setReferees(response.data);
    } catch (error) {
      console.error('Error fetching Referees:', error);
    }
  };

  const fetchAwards = async () => {
    try {
      const response = await api.get('/api/Award/Get All Award');
      setAwards(response.data);
    } catch (error) {
      console.error('Error fetching Awards:', error);
    }
  };

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
        number_attendees: item.number_attendees
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
    fetchKoiCategories();
    fetchKoiFishes();
    fetchReferees();
    fetchAwards();
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
      referee_id: values.refereeId || "REF_1",  // Giá trị này có thể gây lỗi nếu referee không có sẵn
      award_id: values.award_id || "AWD_1",
      rounds: values.rounds,
      number_attendees: values.number_attendees,
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
      console.error('Error creating competition:', error.response?.data || error.message);
  
      // Hiển thị thông báo lỗi từ API nếu có
      const errorMessage = error.response?.data || 'Could not create competition.';
  
      // Hiển thị thông báo lỗi với lý do từ API
      notification.error({
        message: 'Create Failed',
        description: errorMessage,
      });
    }
  };
  

  const updateCompetition = async (values) => {

  
    const params = new URLSearchParams({
        CompetitionId: editingCompetition.competition_id,
        CompetitionName: values.competition_name,
        CompetitionDescription: values.competition_description,
        // StartTime: values.start_time ? values.start_time.toISOString() : '',
        // EndTime: values.end_time ? values.end_time.toISOString() : '',
        StatusCompetition: values.status_competition,
        KoiCategoryId: values.categoryId || "CAT_1",
        // KoiFishId: values.koiId || "K1",
        RefereeId: values.refereeId || "REF_1",
        AwardId: values.award_id || "AWD_1",
        // Round: values.rounds,
        number_attendees: values.number_attendees,
        CompetitionImg: values.competition_img || "haha.jpg",
    });
    console.log('Payload:', params.toString());
    try {
        // Gọi API với query string
        await api.post(`/api/CompetitionKoi/Update Competition?${params}`);
        notification.success({
            message: 'Cập nhật thành công',
            description: 'Cập nhật cuộc thi thành công.',
        });
        fetchCompetitions(); // Tải lại danh sách
    } catch (error) {
        console.error('Lỗi khi cập nhật cuộc thi:', error.response?.data || error.message);
        notification.error({
            message: 'Cập nhật thất bại',
            description: error.response?.data || 'Could not update competition.',
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
        number_attendees:competition.number_attendees,
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
      title: 'Number Attendees',
      dataIndex: 'number_attendees',
      key: 'number_attendees',
      render: (Number) => Number || 0, // Hiển thị 0 nếu giá trị bị thiếu
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
      <div style={{display:'flex', gap:'10px'}}>
        <Button  type="link" icon={<EditOutlined />} onClick={() => showModal(record)}>Edit</Button>
        <ProcessMatch competitionId={record.competition_id}/>
        {/* <Popconfirm
          title="Are you sure you want to delete this competition?"
          onConfirm={() => handleDelete(record.competition_id)}
          okText="Yes"
          cancelText="No"
          // Tùy chỉnh các nút trong Popconfirm
          okButtonProps={{
            style: {
              marginRight: '8px', // Optional: adds space between the buttons
              display: 'inline-flex', // Ensures the button is inline with the cancel button
              alignItems: 'center', // Center align the button content
            }
          }}
          cancelButtonProps={{
            style: {
              display: 'inline-flex', // Ensures the button is inline with the ok button
              alignItems: 'center', // Center align the button content
            }
          }}
        >
          <Button type="link" icon={<DeleteOutlined />} danger>Delete</Button>
        </Popconfirm> */}
      </div>
          
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Competition Management</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          {/* Nút Add Competition */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal(null)}
          >
            Add Competition
          </Button>

          {/* Thanh tìm kiếm */}
          <div className="search-match" style={{ display: 'flex',justifyContent:'flex-end' }}>
            <SearchMatch />
          </div>
        </div>
      <Table dataSource={competitions} columns={columns} rowKey="competition_id"   pagination={{ pageSize: 3 }}/>

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
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
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
          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select>
              {koiCategories.map(category => (
                <Option key={category.category_id} value={category.category_id}>{category.category_name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="koiId" label="Koi Fish" rules={[{ required: false }]}>
            <Select>
              {koiFishes.map(koi => (
                <Option key={koi.koi_id} value={koi.koi_id}>{koi.koi_name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="refereeId" label="Referee" rules={[{ required: true }]}>
            <Select>
              {referees.map(referee => (
                <Option key={referee.refereeId} value={referee.id}>{referee.refereeName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="award_id" label="Award" rules={[{ required: true }]}>
            <Select>
              {awards.map(award => (
                <Option key={award.award_id} value={award.award_id}>{award.award_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="number_attendees"
            label="Number Attendees"
            rules={[{ required: true, message: 'Please select the numbers people!' }]}
          >
            <Select placeholder="Select numbers people">
              <Option value={2}>2 people </Option>
              <Option value={4}>4 people </Option>
              <Option value={8}>8 people </Option>

            </Select>
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
