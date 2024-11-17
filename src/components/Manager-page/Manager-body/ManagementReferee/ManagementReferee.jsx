import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message } from 'antd';
import { UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';

const { Option } = Select;

function ManagementReferee() {
  const { user } = useUser();
  const [referees, setReferees] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingReferee, setEditingReferee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newReferee, setNewReferee] = useState({
    refereeName: '',
    expJudge: '0 years',
    userId: '',
  });

  // Fetch referees
  const fetchReferees = async () => {
    try {
      const response = await api.post(
        '/api/Referees/GetAllReferees',
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setReferees(response.data);
    } catch (error) {
      message.error('Failed to fetch referees');
    }
  };

  // Fetch eligible users for creating referees
  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/User/GetAllUsersByRoleId?roleId=R3', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchReferees();
    fetchUsers();
  }, []);

  // Columns for the Table
  const columns = [
    { title: 'Referee ID', dataIndex: 'refereeId', key: 'refereeId' },
    { title: 'Name', dataIndex: 'refereeName', key: 'refereeName' },
    { title: 'Experience', dataIndex: 'expJudge', key: 'expJudge' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>

              <Popconfirm
                title="Are you sure to delete this referee?"
                onConfirm={() => handleDelete(record.refereeId)}
                okText="Yes"
                cancelText="No"
                icon={<DeleteOutlined />}
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
                <Button icon={<DeleteOutlined />} type="danger">
                  Delete
                </Button>
              </Popconfirm>
            </div>
        </>
      ),
    },
  ];

  const handleDelete = async (refereeId) => {
    try {
      await api.delete(`/api/Referees/DeleteReferee?refereeId=${refereeId}`);
      setReferees(referees.filter((ref) => ref.refereeId !== refereeId));
      message.success('Referee deleted successfully');
    } catch (error) {
      message.error('Failed to delete referee');
    }
  };

  const handleEdit = (referee) => {
    setEditingReferee(referee);
    setNewReferee({
      refereeName: referee.refereeName,
      expJudge: referee.expJudge,
      userId: referee.userId,
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setNewReferee({ refereeName: '', expJudge: '0 years', userId: '' });
    setEditingReferee(null);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingReferee(null);
  };

  const handleAddReferee = async () => {
    try {
      const newRefereeData = {
        refereeName: newReferee.refereeName,
        expJudge: newReferee.expJudge,
        usersId: newReferee.userId,
      };
      const response = await api.post('/api/Referees/CreateReferee', newRefereeData);
      if (response.status === 200) {
        message.success('Referee added successfully');
        fetchReferees();
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error('Failed to add referee');
    }
  };

  const handleUpdateReferee = async () => {
    try {
      const updateData = {
        refereeId: editingReferee.refereeId,
        refereeName: newReferee.refereeName,
        expJudge: newReferee.expJudge,
        usersId: newReferee.userId,
      };
      const response = await api.post(`/api/Referees/UpdateReferee`, updateData);
      if (response.status === 200) {
        message.success('Referee updated successfully');
        fetchReferees();
        setIsModalVisible(false);
        setEditingReferee(null);
      }
    } catch (error) {
      message.error('Failed to update referee');
    }
  };

  const handleModalOk = () => {
    if (!newReferee.userId) {
      message.error('Please select a user.');
      return;
    }
    editingReferee ? handleUpdateReferee() : handleAddReferee();
  };

  return (
    <div>
            <h1>Management Referee</h1>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add Referee
      </Button>
      <Table columns={columns} dataSource={referees} rowKey="refereeId" />

      {/* Edit/Add Modal */}
      <Modal
        title={editingReferee ? 'Edit Referee' : 'Add Referee'}
        open={isModalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalOk}>
            {editingReferee ? 'Update Referee' : 'Add Referee'}
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="User" required>
            <Select
              value={newReferee.userId}
              onChange={(value, option) =>
                setNewReferee({ ...newReferee, userId: value, refereeName: option.children })
              }
              placeholder="Select a user with role 'R3'"
              suffixIcon={<UserOutlined />}
            >
              {users.map((user) => (
                <Option key={user.user_id} value={user.user_id}>
                  {user.username}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Experience" required>
            <Input
              value={newReferee.expJudge}
              onChange={(e) => setNewReferee({ ...newReferee, expJudge: e.target.value })}
              suffix={<UserOutlined />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagementReferee;
