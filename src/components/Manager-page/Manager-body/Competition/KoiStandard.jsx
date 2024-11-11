import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Modal, notification, Popconfirm, Select } from 'antd';
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
      setIsModalVisible(true);
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
        <div style={{display:'flex', gap:'5px'}}>
        <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}>Edit</Button>
        <Popconfirm
          title="Are you sure you want to delete this standard?"
          onConfirm={() => handleDelete(record.id)}
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
        </Popconfirm>

        </div>
         
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

      <Table dataSource={koiStandard} columns={columns} rowKey="id" pagination={{ pageSize: 4 }}/>

      <Modal
        title={editingKoi ? "Edit Koi Standard" : "Add Koi Standard"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="standard_name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the Koi standard!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="color_koi"
            label="Color"
            rules={[{ required: true, message: 'Please select the color of the Koi!' }]}
          >
            <Select>
              <Select.Option value="White (Shiro)">White</Select.Option>
              <Select.Option value="Red (Aka)">Red</Select.Option>
              <Select.Option value="Black (Sumi)">Black</Select.Option>
              <Select.Option value="Yellow (Ki)">Yellow</Select.Option>
              <Select.Option value="Orange (Orenji)">Orange</Select.Option>
              <Select.Option value="Blue (Asagi)">Blue</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="pattern_koi"
            label="Pattern"
            rules={[{ required: true, message: 'Please select the pattern of the Koi!' }]}
          >
            <Select>
              <Select.Option value="Kohaku">Kohaku</Select.Option>
              <Select.Option value="Sanke">Sanke</Select.Option>
              <Select.Option value="Showa">Showa</Select.Option>
              <Select.Option value="Tancho">Tancho</Select.Option>
              <Select.Option value="Utsurimono">Utsurimono</Select.Option>
              <Select.Option value="Asagi">Asagi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
              name="size_koi"
              label="Size"
              rules={[
                { 
                  required: true, 
                  message: 'Please input the size of the Koi!' 
                },
                {
                  validator: (_, value) => {
                    if (value < 50 || value > 100) {
                      return Promise.reject('Koi size must be between 50 and 100 cm!');
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="age_koi"
              label="Age"
              rules={[
                { 
                  required: true, 
                  message: 'Please input the age of the Koi!' 
                },
                {
                  validator: (_, value) => {
                    if (value < 1 || value > 50) {
                      return Promise.reject('Koi age must be between 1 and 50 years!');
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>
          <Form.Item
            name="bodyshape_koi"
            label="Body Shape"
            rules={[{ required: true, message: 'Please input the body shape of the Koi!' }]}
          >
          <Input/>

          </Form.Item>
          <Form.Item
            name="variety_koi"
            label="Variety"
            rules={[{ required: true, message: 'Please input the variety of the Koi!' }]}
          >
            <Select >
              
              <Select.Option value="Kohaku">Kohaku</Select.Option>
              <Select.Option value="Sanke">Sanke</Select.Option>
              <Select.Option value="Showa">Showa</Select.Option>
              <Select.Option value="Tancho">Tancho</Select.Option>
              <Select.Option value="Asagi">Asagi</Select.Option>
              <Select.Option value="Shusui">Shusui</Select.Option>

            </Select>

          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select the gender of the Koi!' }]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
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
