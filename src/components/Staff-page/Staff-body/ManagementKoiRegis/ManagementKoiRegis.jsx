import React, { useEffect, useState } from 'react';
import { api } from '../../../../config/AxiosConfig';
import { Table, Button, Modal, Input, message, Select } from 'antd';
import './ManagementKoiRegis.css'; // Ensure to import your CSS file

function ManagementKoiRegis() {
  const [koiRegistrations, setKoiRegistrations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch Koi registrations on component mount
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
      statusRegistration: registration.statusRegistration || 'Pending', // Default value
      // Remove unnecessary fields like koi_name, competitionName, etc.
    });
    setIsModalVisible(true);
  };
  
  const handleUpdate = async () => {
    try {
      // Prepare the body with only the necessary fields
      const requestBody = {
        registrationId: formData.registrationId,
        koiId: selectedRegistration.koiId, // Ensure this is correctly set
        competitionId: formData.competitionId,
        statusRegistration: formData.statusRegistration,
        categoryId: formData.categoryId,
      };
  
      console.log('Updating Koi Registration with data:', requestBody);
  
      await api.put('/api/KoiRegistration/Update KoiRegistration', requestBody);
  
      message.success('Registration updated successfully');
      setIsModalVisible(false);
      
      // Refresh the list
      const response = await api.get('/api/KoiRegistration/Get All KoiRegistration');
      setKoiRegistrations(response.data);
    } catch (error) {
      message.error('Failed to update registration');
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
        <Button onClick={() => showUpdateModal(record)}>Update</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Koi Registrations Management</h2>
      <Table dataSource={koiRegistrations} columns={columns} rowKey="koi_id" />

      <Modal
        title={<div className="modal-title">Update Koi Registration</div>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={
            <div className='fish-modal-footer'>
            <Button key="submit" type="primary" onClick={handleUpdate}>
                Update
            </Button>,
            <Button key="back" onClick={handleCancel}>
                Cancel
            </Button>,

            </div>

        }
        className="custom-modal"
      >
        <Input
          placeholder="Code Registration"
          value={formData.registrationId}
          disabled // assuming registrationId shouldn't be editable
          className="modal-input"
        />
        <Input
          placeholder="Competition ID"
          value={formData.competitionId}
          disabled
          className="modal-input"
        />
        <Input
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

export default ManagementKoiRegis;
