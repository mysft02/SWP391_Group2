import React, { useState } from 'react';
import { Modal, Button, Input, message, Select } from 'antd';
import { UserOutlined, TrophyOutlined, DollarOutlined } from '@ant-design/icons'; // Import icon
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import { useNavigate } from 'react-router-dom';
import { Option } from 'antd/es/mentions';

function NewsContentDisplay({ filteredNews }) {
  const [isRankDetailModalVisible, setIsRankDetailModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate(); // Khai báo useNavigate để chuyển trang

  const [userFishList, setUserFishList] = useState([]);
  const [formData, setFormData] = useState({
    koi_name: '',
    competition_name: '',
    categoryName: '',
    registrationFee: 5, // Default value, can be changed
    koi_id: '',
    competition_id: '',
    categoryId: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showRankDetailModal = (news) => {
    setSelectedNews(news);
    setIsRankDetailModalVisible(true);
  };

  const showRegisterModal = async (news) => {
    setSelectedNews(news);
    setFormData({
      koi_name: news.koi_name,
      competition_name: news.competition_name,
      categoryName: news.category.category_name,
      registrationFee: 5,
      koi_id: news.koi_id,
      competition_id: news.competition_id,
      categoryId: news.category.category_id,
    });

    await fetchUserFishList(); // Lấy danh sách cá Koi của người dùng
    setIsRegisterModalVisible(true);
  };

  const handleCancel = () => {
    setIsRankDetailModalVisible(false);
    setIsRegisterModalVisible(false);
  };

  const handleRegisterClick = () => {
    message.error("Bạn cần đăng nhập để thực hiện hành động này.");
    setTimeout(() => {
      navigate('/sign-in'); // Chuyển hướng tới trang đăng nhập sau khi hiện thông báo
    }, 500); // 1500ms để chờ message hiện trước khi chuyển hướng
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
      console.error(error);
    }
  };

  const handleKoiSelectChange = (value) => {
    const selectedFish = userFishList.find(fish => fish.koi_id === value);
    if (selectedFish) {
      console.log("Selected Koi ID:", selectedFish.koi_id);
      console.log("Selected Koi Name:", selectedFish.koi_name);
      setFormData(prevState => ({
        ...prevState,
        koi_id: selectedFish.koi_id,
        koi_name: selectedFish.koi_name
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Check if user balance is below 10 or equal to 0
      if (user.balance < 10 || user.balance === 0) {
        message.warning("Tài khoản của bạn không đủ. Vui lòng nạp thêm tiền để đăng ký.");
        return;
      }
  
      console.log("Payload đăng ký:", {
        koi_id: formData.koi_id,
        koi_name: formData.koi_name,
        competition_id: formData.competition_id,
        competition_name: formData.competition_name,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        registrationFee: formData.registrationFee,
      }); // Print payload to console for debugging
  
      // Proceed with registration if balance is sufficient
      await api.post('/api/KoiRegistration/Create KoiRegistration', {
        koiId: formData.koi_id,
        koiName: formData.koi_name,
        competition_id: formData.competition_id,
        competition_name: formData.competition_name,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        registrationFee: formData.registrationFee,
      });
      
      message.success("Registration successful!");
      handleCancel();
    } catch (error) {
      message.error("Failed to register. Please try again.");
      console.error(error);
    }
  };
  

  return (
    <div style={{ flex: 1, padding: '20px', height: '850px', overflowY: 'auto' }}>
      <h3>News List</h3>
      {filteredNews.length > 0 ? (
        filteredNews.map((news) => (
          <div key={news.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
            <h4>{news.competition_name}</h4>
            <p>Rank: {news.category.category_name}</p>
            <p>Award: {news.award.award_name}</p>
            <p>Created At: {new Date(news.start_time).toLocaleDateString()}</p>
            <div style={{ display: 'flex', gap: '10px', marginRight: '10px' }}>
              <Button onClick={() => showRankDetailModal(news)}>Detail Rank</Button>
              {user ? (
                <Button onClick={() => showRegisterModal(news)}>Register Competition</Button>
              ) : (
                <Button onClick={handleRegisterClick}>Register Competition</Button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No news found matching the selected filters.</p>
      )}

      <Modal
        title="Detail Rank"
        open={isRankDetailModalVisible}
        onCancel={handleCancel}
        footer={[<Button key="back" onClick={handleCancel}>Close</Button>]}
      >
        {selectedNews && (
          <div>
            <p>Rank: {selectedNews.category.category_name}</p>
            <p>Detail: {selectedNews.competition_description}</p>
            <p>Award: {selectedNews.award.award_name}</p>
            <p>Start: {new Date(selectedNews.start_time).toLocaleDateString()}</p>
            <p>End: {new Date(selectedNews.end_time).toLocaleDateString()}</p>
          </div>
        )}
      </Modal>

      <Modal
        title="Register Competition"
        open={isRegisterModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Select
            placeholder="Select Koi"
            onChange={handleKoiSelectChange}
            style={{ width: '100%' }}
            suffixIcon={<UserOutlined />} // Thêm icon vào Select
          >
            {userFishList.map((fish) => (
              <Option key={fish.koi_id} value={fish.koi_id}>
                {fish.koi_name}
              </Option>
            ))}
          </Select>

          <Input
            name="competition_name"
            placeholder="Competition Name"
            value={formData.competition_name}
            onChange={handleInputChange}
            prefix={<TrophyOutlined />} // Thêm icon vào Input
          />
          <Input
            name="categoryName"
            placeholder="Category Name"
            value={formData.categoryName}
            onChange={handleInputChange}
            prefix={<UserOutlined />} // Thêm icon vào Input
          />
          <Input
            name="registrationFee"
            placeholder="Registration Fee"
            value={formData.registrationFee}
            onChange={handleInputChange}
            type="number"
            prefix={<DollarOutlined />} // Thêm icon vào Input
          />
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={handleCancel}>Close</Button>
          <Button type="primary" onClick={handleSubmit}>Submit</Button>
        </div>
      </Modal>
    </div>
  );
}

export default NewsContentDisplay;
