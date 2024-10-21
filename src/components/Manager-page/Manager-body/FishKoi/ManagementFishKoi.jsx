import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, notification } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Đảm bảo đường dẫn đúng

function ManagementFishKoi() {
  const [fishes, setFishes] = useState([]); // Quản lý danh sách cá Koi
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFish, setCurrentFish] = useState(null);
  const [form] = Form.useForm();

  // Hàm để lấy danh sách cá Koi từ API
  const fetchFishes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/KoiFish/GetAllKoiFishes');
      setFishes(response.data);
    } catch (error) {
      console.error('Error fetching fishes:', error);
      notification.error({
        message: 'Fetch Failed',
        description: 'Could not fetch fish data.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFishes();
  }, []);

  // Hàm để hiển thị modal cho việc thêm/sửa cá Koi
  const showModal = (fish) => {
    setCurrentFish(fish);
    if (fish) {
      form.setFieldsValue(fish); // Set giá trị cho form nếu là sửa
    } else {
      form.resetFields(); // Reset form nếu là thêm mới
    }
    setIsModalVisible(true);
  };

  // Hàm để xử lý thêm cá Koi
  const handleAddFish = async (values) => {
    try {
      await api.post(`/api/CompetitionKoi/Create CompetitionKoi`, values);
      notification.success({ message: 'Fish added successfully' });
      fetchFishes(); // Cập nhật lại danh sách cá Koi
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding fish:', error);
      notification.error({
        message: 'Add Failed',
        description: 'Could not add fish data.',
      });
    }
  };

  // Hàm để xử lý cập nhật cá Koi
  const handleUpdateFish = async (values) => {
    try {
      await api.put(`/api/CompetitionKoi/Update Competition`, {
        ...values,
        id: currentFish.id, // Giả sử bạn có id trong thông tin cá
      });
      notification.success({ message: 'Fish updated successfully' });
      fetchFishes(); // Cập nhật lại danh sách cá Koi
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating fish:', error);
      notification.error({
        message: 'Update Failed',
        description: 'Could not update fish data.',
      });
    }
  };

  // Hàm để xóa cá Koi
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/KoiFish/DeleteKoiFish/${id}`);
      notification.success({ message: 'Fish deleted successfully' });
      fetchFishes(); // Cập nhật lại danh sách cá Koi
    } catch (error) {
      console.error('Error deleting fish:', error);
      notification.error({
        message: 'Delete Failed',
        description: 'Could not delete fish.',
      });
    }
  };

  const columns = [
    {
      title: 'Fish ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fish Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const handleSubmit = (values) => {
    if (currentFish) {
      handleUpdateFish(values); // Nếu có currentFish, gọi hàm cập nhật
    } else {
      handleAddFish(values); // Nếu không có currentFish, gọi hàm thêm mới
    }
  };

  return (
    <div>
      <h1>Management Fish Koi</h1>
      <Button type="primary" onClick={() => showModal(null)} style={{ marginBottom: '20px' }}>
        Add New Fish
      </Button>
      <Table
        dataSource={fishes}
        columns={columns}
        loading={loading}
        rowKey="id" // Đảm bảo id là key duy nhất
      />

      <Modal
        title={currentFish ? 'Edit Fish' : 'Add Fish'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Fish Name" rules={[{ required: true, message: 'Please input fish name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="color" label="Color" rules={[{ required: true, message: 'Please input fish color!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="size" label="Size" rules={[{ required: true, message: 'Please input fish size!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentFish ? 'Update Fish' : 'Add Fish'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagementFishKoi;
