import React, { useState, useEffect } from 'react';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import { Form, Input, Button, Table, message, Modal } from 'antd';
import { UserOutlined, TagOutlined, ExpandOutlined, CalendarOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

function CustomerFish() {
  const { user } = useUser();
  const [fishData, setFishData] = useState({
    koi_name: '',
    koi_variety: '',
    koi_size: '',
    koi_age: '',
  });
  const [fishId, setFishId] = useState(null);
  const [userFishList, setUserFishList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(true); // Default to true to show the table

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Thay đổi:", name, value);
    setFishData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchUserFishList = async () => {
    try {
      if (!user || !user.user_id) {
        message.error('Người dùng không hợp lệ');
        return;
      }
      const response = await api.post('/api/KoiFish/Get Koi Fish By Id', user.user_id);
      console.log("list fish:", response.data);
      console.log('User ID:', user.user_id);

      if (response.data && Array.isArray(response.data)) {
        setUserFishList(response.data);
      } else {
        message.error('Không có dữ liệu cá Koi');
      }
    } catch (error) {
      message.error('Lỗi khi lấy danh sách cá Koi');
      console.error(error);
    }
  };

  const createFish = async () => {
    const payload = {
      koi_name: fishData.koi_name,
      koi_variety: fishData.koi_variety,
      koi_size: fishData.koi_size,
      koi_age: fishData.koi_age,
      userId: user.user_id
    };
    console.log("Fish:", fishData);
    console.log("payload:", payload);
    try {
      await api.post('/api/KoiFish/Create New Koi Fish', payload);
      message.success('Tạo cá Koi thành công!');
      fetchUserFishList(); // Tải lại danh sách cá sau khi tạo thành công
      setFishData({ koi_name: '', koi_variety: '', koi_size: '', koi_age: '' }); // Reset form
    } catch (error) {
      message.error('Lỗi khi tạo cá Koi');
      console.error(error);
    }
  };

  const updateFish = async () => {
    if (!fishId) {
      message.error('Vui lòng chọn cá Koi để cập nhật');
      return;
    }
    try {
      await api.post('/api/KoiFish/Update Koi Fish', {
        koi_id: fishId,
        ...fishData,
      });
      message.success('Cập nhật cá Koi thành công!');
      fetchUserFishList();
      setIsModalVisible(false);
      setFishId(null);
      setFishData({ koi_name: '', koi_variety: '', koi_size: '', koi_age: '' });
    } catch (error) {
      message.error('Lỗi khi cập nhật cá Koi');
      console.error(error);
    }
  };

  const handleSelectFish = (record) => {
    setFishId(record.koi_id);
    setFishData({
      koi_name: record.koi_name,
      koi_variety: record.koi_variety,
      koi_size: record.koi_size,
      koi_age: record.koi_age,
    });
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchUserFishList();
  }, []);

  const columns = [
    {
      title: 'Tên cá',
      dataIndex: 'koi_name',
      key: 'koi_name',
    },
    {
      title: 'Loài cá',
      dataIndex: 'koi_variety',
      key: 'koi_variety',
    },
    {
      title: 'Kích thước cá',
      dataIndex: 'koi_size',
      key: 'koi_size',
    },
    {
      title: 'Tuổi cá',
      dataIndex: 'koi_age',
      key: 'koi_age',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="link" icon={<EditOutlined />} onClick={() => handleSelectFish(record)}>
          Cập nhật
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', marginTop: '20px' }}>
      <div style={{ flex: 1, paddingRight: '10px' }}>
        <h2>Tạo cá Koi</h2>
        <Form layout="vertical">
          <Form.Item label="Tên cá">
            <Input name="koi_name" value={fishData.koi_name} onChange={handleChange} prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Loài cá">
            <Input name="koi_variety" value={fishData.koi_variety} onChange={handleChange} prefix={<TagOutlined />} />
          </Form.Item>
          <Form.Item label="Kích thước cá">
            <Input name="koi_size" value={fishData.koi_size} onChange={handleChange} prefix={<ExpandOutlined />} />
          </Form.Item>
          <Form.Item label="Tuổi cá">
            <Input name="koi_age" value={fishData.koi_age} onChange={handleChange} prefix={<CalendarOutlined />} />
          </Form.Item>
          <Button type="primary" icon={<PlusOutlined />} onClick={createFish}>
            Tạo cá Koi
          </Button>
        </Form>
      </div>

      {/* Đường kẻ giữa 2 phần */}
      <div style={{ width: '1px', backgroundColor: '#000', margin: '0 10px' }}></div>

      <div style={{ flex: 1, paddingLeft: '10px', width: '500px' }}>
        <h2>Danh sách cá Koi</h2>
        <Button
          type="default"
          onClick={() => setIsTableVisible(!isTableVisible)}
          style={{ marginBottom: '20px' }}
        >
          {isTableVisible ? 'Ẩn danh sách cá' : 'Hiện danh sách cá'}
        </Button>

        {/* Bảng hiển thị danh sách cá Koi */}
        {isTableVisible && (
          <Table
            dataSource={userFishList}
            columns={columns}
            rowKey="koi_id"
            pagination={false}
            style={{ marginTop: '20px' }}
          />
        )}
      </div>

      <Modal
        title="Cập nhật cá Koi"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="update" type="primary" onClick={updateFish} icon={<EditOutlined />}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form layout="inline">
          <Form.Item label="Tên cá">
            <Input name="koi_name" value={fishData.koi_name} onChange={handleChange} prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Loài cá">
            <Input name="koi_variety" value={fishData.koi_variety} onChange={handleChange} prefix={<TagOutlined />} />
          </Form.Item>
          <Form.Item label="Kích thước cá">
            <Input name="koi_size" value={fishData.koi_size} onChange={handleChange} prefix={<ExpandOutlined />} />
          </Form.Item>
          <Form.Item label="Tuổi cá">
            <Input name="koi_age" value={fishData.koi_age} onChange={handleChange} prefix={<CalendarOutlined />} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerFish;
