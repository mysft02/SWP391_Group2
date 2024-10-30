import React, { useState } from 'react';
import { Modal, Button, Input, message, Select } from 'antd';
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import PrivateRoute from '../../../routes/PrivateRoutes';
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
    competitionName: '',
    categoryName: '',
    registrationFee: 5, // Default value, can be changed
    koi_id: '',
    competitionId: '',
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
      competitionName: news.competitionName,
      categoryName: news.koiCategory.category_name,
      registrationFee: 5,
      koi_id: news.koi_id,
      competitionId: news.competitionId,
      categoryId: news.koiCategory.category_id,
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
    }, 1000); // 1500ms để chờ message hiện trước khi chuyển hướng
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
      console.log("Payload đăng ký:", {
        koi_id: formData.koi_id,
        koi_name: formData.koi_name, // Chỉnh sửa từ koi_name thành koi_name
        competitionId: formData.competitionId,
        competitionName: formData.competitionName,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        registrationFee: formData.registrationFee,
      }); // In ra payload
  
      await api.post('/api/KoiRegistration/Create KoiRegistration', {
        koiId: formData.koi_id,
        koiName: formData.koi_name, // Chỉnh sửa từ koi_name thành koi_name
        competitionId: formData.competitionId,
        competitionName: formData.competitionName,
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
            <h4>{news.competitionName}</h4>
            <p>Rank: {news.koiCategory.category_name}</p>
            <p>Award: {news.award}</p>
            <p>Created At: {new Date(news.startTime).toLocaleDateString()}</p>
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
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedNews && (
          <div>
            <p>Rank: {selectedNews.koiCategory.category_name}</p>
            <p>Detail: {selectedNews.competitionDescription}</p>
            <p>Award: {selectedNews.award}</p>
            <p>Start: {new Date(selectedNews.startTime).toLocaleDateString()}</p>
            <p>End: {new Date(selectedNews.endTime).toLocaleDateString()}</p>
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
            >
                {userFishList.map((fish) => (
                    <Option key={fish.koi_id} value={fish.koi_id}>
                        {fish.koi_name}
                    </Option>
                ))}
            </Select>

          <Input
            name="competitionName"
            placeholder="Competition Name"
            value={formData.competitionName}
            onChange={handleInputChange}
          />
          <Input
            name="categoryName"
            placeholder="Category Name"
            value={formData.categoryName}
            onChange={handleInputChange}
          />
          <Input
            name="registrationFee"
            placeholder="Registration Fee"
            value={formData.registrationFee}
            onChange={handleInputChange}
            type="number"
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
