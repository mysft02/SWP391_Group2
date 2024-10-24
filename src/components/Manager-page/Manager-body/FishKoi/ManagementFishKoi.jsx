import React, { useEffect, useState } from 'react';
import { Table, Input, notification, Button } from 'antd';
import { api } from '../../../../config/AxiosConfig'; // Đảm bảo đường dẫn đúng
import { useUser } from '../../../../data/UserContext';
import { SearchOutlined, ReloadOutlined, IdcardOutlined, TagOutlined, DashboardOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons'; // Import icons

function ManagementFishKoi() {
  const { user } = useUser(); // Lấy thông tin user từ context
  const [fishes, setFishes] = useState([]); // Quản lý danh sách cá Koi
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(''); // Lưu trữ giá trị tìm kiếm

  // Hàm để lấy danh sách cá Koi từ API
  const fetchFishes = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/KoiFish/Get All Koi Fishes', {}, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`, // Token lấy từ user context
          'Content-Type': 'application/json',
        },
      });
      setFishes(response.data);
      console.log("List koi:", response.data);
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

  console.log("Rendering ManagementFishKoi", fishes);

  useEffect(() => {
    if (user && user.accessToken) {
      fetchFishes();
    }
  }, [user]); // Gọi fetchFishes khi user thay đổi

  // Hàm lọc cá Koi theo tên
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Lọc cá theo tên dựa trên từ khóa tìm kiếm
  const filteredFishes = fishes.filter((fish) =>
    fish.koi_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: (
        <span>
          <IdcardOutlined style={{ marginRight: 8 }} />
          Fish ID
        </span>
      ),
      dataIndex: 'koi_id', // Dùng đúng tên thuộc tính từ API
      key: 'koi_id',
    },
    {
      title: (
        <span>
          <TagOutlined style={{ marginRight: 8 }} />
          Fish Name
        </span>
      ),
      dataIndex: 'koi_name', // Đúng tên thuộc tính từ API
      key: 'koi_name',
    },
    {
      title: (
        <span>
          <DashboardOutlined style={{ marginRight: 8 }} />
          Variety
        </span>
      ),
      dataIndex: 'koi_variety', // Đúng tên thuộc tính từ API
      key: 'koi_variety',
    },
    {
      title: (
        <span>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          Size
        </span>
      ),
      dataIndex: 'koi_size', // Đúng tên thuộc tính từ API
      key: 'koi_size',
    },
    {
      title: (
        <span>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          Age
        </span>
      ),
      dataIndex: 'koi_age', // Đúng tên thuộc tính từ API
      key: 'koi_age',
    },
    {
      title: (
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          User
        </span>
      ),
      dataIndex: ['users_id', 'username'], // Đúng tên thuộc tính từ API
      key: 'username',
    },
  ];

  return (
    <div>
      <h1>Management Fish Koi</h1>
      <Button 
        type="primary" 
        icon={<ReloadOutlined />} // Thêm icon cho nút refresh
        onClick={fetchFishes} // Gọi hàm fetchFishes khi nhấn nút
        style={{ marginBottom: '20px', marginLeft: '10px' }}
      >
        Refresh
      </Button>

      {/* Ô tìm kiếm */}
      <Input
        placeholder="Search fish by name"
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />} // Thêm icon vào ô tìm kiếm
        style={{ marginBottom: '20px', width: '300px' }}
      />

      <Table
        dataSource={filteredFishes}
        columns={columns}
        loading={loading}
        rowKey="koi_id" // Đảm bảo id là key duy nhất 
        pagination={{
          pageSize: 5, // Số lượng cá hiển thị trên mỗi trang
        }}
      />
    </div>
  );
}

export default ManagementFishKoi;
