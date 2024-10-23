import React, { useState, useEffect } from 'react';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import { Form, Input, Button, Table, message, Modal } from 'antd';
import { UserOutlined, TagOutlined, ExpandOutlined, CalendarOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './CustomerFish.css'; // Import CSS

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
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Modal xóa

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Số cá hiển thị trên mỗi trang

  // Khởi tạo form
  const [form] = Form.useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
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

      const payload = {
        user_id: user.user_id,
      };
      const response = await api.post('/api/KoiFish/Get Koi Fish By User Id', payload);
      if (response.data && Array.isArray(response.data)) {
        setUserFishList(response.data);
      } else {
        message.error('Không có dữ liệu cá Koi');
      }
    } catch (error) {
      message.error('Lỗi khi lấy danh sách cá Koi');
    }
  };

  const createFish = async () => {
    if (!fishData.koi_name || !fishData.koi_variety || !fishData.koi_size || !fishData.koi_age) {
      message.error('Vui lòng điền đầy đủ thông tin cá Koi.');
      return; // Không gửi nếu có trường trống
    }

    try {
      const payload = {
        koi_name: fishData.koi_name,
        koi_variety: fishData.koi_variety,
        koi_size: fishData.koi_size,
        koi_age: fishData.koi_age,
        userId: user.user_id,
      };
      await api.post('/api/KoiFish/Create New Koi Fish', payload);
      message.success('Tạo cá Koi thành công!');
      fetchUserFishList();
      setFishData({ koi_name: '', koi_variety: '', koi_size: '', koi_age: '' });
    } catch (error) {
      message.error('Đã xảy ra lỗi khi tạo cá Koi.');
    }
  };

  const updateFish = async () => {
    if (!fishData.koi_name || !fishData.koi_variety || !fishData.koi_size || !fishData.koi_age) {
      message.error('Vui lòng điền đầy đủ thông tin cá Koi để cập nhật.');
      return; // Không gửi nếu có trường trống
    }

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
      message.error('Đã xảy ra lỗi khi cập nhật cá Koi.');
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

  // Hàm xóa cá Koi
  const deleteFish = async (koiId) => {
    try {
      await api.post('/api/KoiFish/Delete Koi Fish', { koi_id: koiId });
      message.success('Xóa cá Koi thành công!');
      fetchUserFishList();
      setIsDeleteModalVisible(false);
    } catch (error) {
      message.error('Đã xảy ra lỗi khi xóa cá Koi.');
    }
  };

  const confirmDelete = (koiId) => {
    setIsDeleteModalVisible(true);
    setFishId(koiId);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setFishId(null);
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
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleSelectFish(record)}>
            Cập nhật
          </Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => confirmDelete(record.koi_id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const paginatedData = userFishList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="customer-fish-container">
      <div className="customer-fish-form">
        <h2>Tạo cá Koi</h2>
        <Form form={form} layout="vertical">
          <Form.Item label="Tên cá">
            <Input value={fishData.koi_name} onChange={handleChange} name="koi_name" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Loài cá">
            <Input value={fishData.koi_variety} onChange={handleChange} name="koi_variety" prefix={<TagOutlined />} />
          </Form.Item>
          <Form.Item label="Kích thước cá">
            <Input value={fishData.koi_size} onChange={handleChange} name="koi_size" prefix={<ExpandOutlined />} />
          </Form.Item>
          <Form.Item label="Tuổi cá">
            <Input value={fishData.koi_age} onChange={handleChange} name="koi_age" prefix={<CalendarOutlined />} />
          </Form.Item>
          <Button type="primary" icon={<PlusOutlined />} onClick={createFish}>
            Tạo cá Koi
          </Button>
        </Form>
      </div>

      <div className="divider"></div>

      <div className="customer-fish-table">
        <h2>Danh sách cá Koi</h2>
        <Table
          dataSource={paginatedData}
          columns={columns}
          rowKey="koi_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: userFishList.length,
            onChange: (page) => setCurrentPage(page),
          }}
          style={{ marginTop: '20px' }}
        />

        {/* Modal xóa */}
        <Modal
          title="Xóa cá Koi"
          visible={isDeleteModalVisible}
          onOk={() => deleteFish(fishId)}
          onCancel={handleCancelDelete}
        >
          <p>Bạn có chắc chắn muốn xóa cá Koi này?</p>
        </Modal>
      </div>

      {/* Modal cập nhật */}
      <Modal
        title="Cập nhật cá Koi"
        visible={isModalVisible}
        onOk={updateFish}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Tên cá">
            <Input value={fishData.koi_name} onChange={handleChange} name="koi_name" />
          </Form.Item>
          <Form.Item label="Loài cá">
            <Input value={fishData.koi_variety} onChange={handleChange} name="koi_variety" />
          </Form.Item>
          <Form.Item label="Kích thước cá">
            <Input value={fishData.koi_size} onChange={handleChange} name="koi_size" />
          </Form.Item>
          <Form.Item label="Tuổi cá">
            <Input value={fishData.koi_age} onChange={handleChange} name="koi_age" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerFish;
