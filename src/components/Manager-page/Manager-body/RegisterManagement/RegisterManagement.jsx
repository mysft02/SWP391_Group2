import React, { useEffect, useState } from 'react';
import { api } from '../../../../config/AxiosConfig';
import { Table, Button, Modal, Input, message, Select, Popconfirm } from 'antd';
import { IdcardOutlined, TrophyOutlined, TagOutlined, DollarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

function RegisterManagement() {
  const [koiRegistrations, setKoiRegistrations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchKoiRegistrations = async () => {
      try {
        const response = await api.get('/api/KoiRegistration/Get All KoiRegistration');
        setKoiRegistrations(response.data);
      } catch (error) {
        message.error('Failed to fetch Koi registrations');
        console.error(error);
      }
    };

    fetchKoiRegistrations();
  }, []);

  const showUpdateModal = (registration) => {
    setSelectedRegistration(registration);
    setFormData({
      registrationId: registration.registrationId,
      koiId: registration.koiId,
      competitionId: registration.competitionId,
      categoryId: registration.categoryId,
      statusRegistration: registration.statusRegistration || 'Pending',
    });
    setIsModalVisible(true);
  };
  
  const handleUpdate = async () => {
    try {
      const requestBody = {
        registrationId: formData.registrationId,
        koiId: selectedRegistration.koiId,
        competitionId: formData.competitionId,
        statusRegistration: formData.statusRegistration,
        categoryId: formData.categoryId,
      };
  
      await api.put('/api/KoiRegistration/Update KoiRegistration', requestBody);
      message.success('Registration updated successfully');
      setIsModalVisible(false);
      
      const response = await api.get('/api/KoiRegistration/Get All KoiRegistration');
      setKoiRegistrations(response.data);
    } catch (error) {
      message.error('Failed to update registration');
      console.error(error);
    }
  };

  const handleDelete = async (registrationId) => {
    try {
      await api.delete(`/api/KoiRegistration/Delete KoiRegistration?koiRegistrationId=${registrationId}`);
      message.success('Registration deleted successfully');
      
      setKoiRegistrations(koiRegistrations.filter(item => item.registrationId !== registrationId));
    } catch (error) {
      message.error('Failed to delete registration');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Code Registration',
      dataIndex: 'registrationId',
      key: 'registrationId',
    },
    {
      title: 'Competition ID',
      dataIndex: 'competitionId',
      key: 'competitionId',
    },
    {
      title: 'Code Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Status',
      dataIndex: 'statusRegistration',
      key: 'statusRegistration',
    },
    {
      title: 'Registration Fee',
      dataIndex: 'registrationFee',
      key: 'registrationFee',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
        <Button icon={<EditOutlined />} onClick={() => showUpdateModal(record)}>
            Update
        </Button>
        
        <Popconfirm
            title="Are you sure you want to delete this registration?"
            onConfirm={() => handleDelete(record.registrationId)}
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
            <Button danger icon={<DeleteOutlined />}>
            Delete
            </Button>
        </Popconfirm>
        </div>

      ),
    },
  ];

  return (
    <div>
      <h2>Koi Registrations Management</h2>
      <Table dataSource={koiRegistrations} columns={columns} rowKey="registrationId" />

      <Modal
        title={<div className="modal-title">Update Koi Registration</div>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={
          <div className="fish-modal-footer">
            <Button key="submit" type="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        }
        className="custom-modal"
      >
        <Input
          prefix={<IdcardOutlined />}
          placeholder="Code Registration"
          value={formData.registrationId}
          disabled
          className="modal-input"
        />
        <Input
          prefix={<TrophyOutlined />}
          placeholder="Competition ID"
          value={formData.competitionId}
          disabled
          className="modal-input"
        />
        <Input
          prefix={<TagOutlined />}
          placeholder="Code Category"
          value={formData.categoryId}
          disabled
          className="modal-input"
        />
        <Select
          placeholder="Status"
          value={formData.statusRegistration}
          onChange={(value) => setFormData({ ...formData, statusRegistration: value })}
          className="modal-select"
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Accepted">Accepted</Select.Option>
        </Select>
      </Modal>
    </div>
  );
}

export default RegisterManagement;
