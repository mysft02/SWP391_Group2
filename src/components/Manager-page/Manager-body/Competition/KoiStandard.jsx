import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification } from 'antd';
import { api } from '../../../../config/AxiosConfig'; 
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

function KoiStandard() {
  const [koiStandard, setKoiStandard] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKoi, setEditingKoi] = useState(null);
  const [form] = Form.useForm();

  const fetchKoiStandard = async () => {
    try {
      const response = await api.get('/api/KoiStandard/Get All KoiStandard');
      const formattedData = response.data.map(koi => ({
        id: koi.standard_id,
        color: koi.color_koi,
        pattern: koi.pattern_koi,
        size: koi.size_koi,
        age: koi.age_koi,
        bodyShape: koi.bodyshape_koi,
        variety: koi.variety_koi,
        name: koi.standard_name,
        gender: koi.gender,
      }));
      setKoiStandard(formattedData);
    } catch (error) {
      console.error('Error fetching Koi Standard:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch Koi standard.',
      });
    }
  };

  useEffect(() => {
    fetchKoiStandard();
  }, []);

  const handleCreate = async (values) => {
    try {
      const payload = {
        color_koi: values.color_koi,
        pattern_koi: values.pattern_koi,
        size_koi: Number(values.size_koi),
        age_koi: Number(values.age_koi),
        bodyshape_koi: values.bodyshape_koi,
        variety_koi: values.variety_koi,
        standard_name: values.standard_name,
        gender: values.gender,
      };
      
      await api.post('/api/KoiStandard/CreateKoiStandard', payload);
      notification.success({
        message: 'Create Success',
        description: 'Koi standard created successfully.',
      });
      setIsModalVisible(false);
      fetchKoiStandard(); 
    } catch (error) {
      console.error('Error creating Koi Standard:', error);
      notification.error({
        message: 'Operation Failed',
        description: 'Could not create Koi standard.',
      });
    }
  };

  const handleUpdate = async (values) => {
    if (!editingKoi) {
      console.error('No editing Koi found');
      return;
    }
    
    try {
      const payload = {
        standard_id: editingKoi.id,
        color_koi: values.color_koi,
        pattern_koi: values.pattern_koi,
        size_koi: Number(values.size_koi),
        age_koi: Number(values.age_koi),
        bodyshape_koi: values.bodyshape_koi,
        variety_koi: values.variety_koi,
        standard_name: values.standard_name,
        gender: values.gender,
      };
      
      console.log("Updating Koi Standard with payload:", payload);
      
      await api.put(`/api/KoiStandard/Update KoiStandard/${payload.standard_id}`, payload);
      notification.success({
        message: 'Update Success',
        description: 'Koi standard updated successfully.',
      });
      setIsModalVisible(false);
      setEditingKoi(null);
      fetchKoiStandard(); 
    } catch (error) {
      console.error('Error updating Koi Standard:', error);
      notification.error({
        message: 'Operation Failed',
        description: error.response?.data?.message || 'Could not update Koi standard.',
      });
    }
    
  };
  

  const handleSubmit = async (values) => {
    console.log("Submitting values:", values);
    if (editingKoi) {
      await handleUpdate(values);
    } else {
      await handleCreate(values);
    }
  };

  const showModal = (koi) => {
    setEditingKoi(koi);
    console.log("ID:",koi.id)
    form.setFieldsValue(koi ? {
        standard_id: koi.id,
        standard_name: koi.name,
        color_koi: koi.color,
        pattern_koi: koi.pattern,
        size_koi: koi.size,
        age_koi: koi.age,
        bodyshape_koi: koi.bodyShape,
        variety_koi: koi.variety,
        gender: koi.gender,
    } : {
        standard_name: '',
        color_koi: '',
        pattern_koi: '',
        size_koi: '',
        age_koi: '',
        bodyshape_koi: '',
        variety_koi: '',
        gender: '',
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingKoi(null);
  };

  const handleDelete = async (id) => {
    console.log('Deleting Koi Standard ID:', id);
    try {
      await api.delete(`/api/KoiStandard/Delete KoiStandard?standardId=${id}`);
      notification.success({
        message: 'Delete Success',
        description: 'Koi standard deleted successfully.',
      });
      fetchKoiStandard(); 
    } catch (error) {
      console.error('Error deleting Koi Standard:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete Koi standard.',
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
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Pattern',
      dataIndex: 'pattern',
      key: 'pattern',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Body Shape',
      dataIndex: 'bodyShape',
      key: 'bodyShape',
    },
    {
      title: 'Variety',
      dataIndex: 'variety',
      key: 'variety',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Koi Standard Management</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)} style={{ marginBottom: '20px' }}>
        Add Koi Standard
      </Button>
      <Table dataSource={koiStandard} columns={columns} rowKey="id" />

      <Modal
        title={editingKoi ? "Edit Koi Standard" : "Add Koi Standard"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="standard_name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the Koi standard!' }]}
          >
            <Input prefix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item
            name="color_koi"
            label="Color"
            rules={[{ required: true, message: 'Please input the color of the Koi!' }]}
          >
            <Input prefix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item
            name="pattern_koi"
            label="Pattern"
            rules={[{ required: true, message: 'Please input the pattern of the Koi!' }]}
          >
            <Input prefix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item
            name="size_koi"
            label="Size"
          >
            <Input prefix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item
            name="age_koi"
            label="Age"
          >
            <Input prefix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item
            name="bodyshape_koi"
            label="Body Shape"
          >
            <Input prefix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item
            name="variety_koi"
            label="Variety"
          >
            <Input prefix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
          >
            <Input prefix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
              {editingKoi ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default KoiStandard;
