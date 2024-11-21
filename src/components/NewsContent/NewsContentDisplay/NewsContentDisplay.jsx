import React, { useState } from 'react';
import { Modal, Button, Input, message, Select, Collapse } from 'antd';
import { UserOutlined, TrophyOutlined, DollarOutlined, LoginOutlined, AppstoreAddOutlined, CheckCircleOutlined, PhoneOutlined, MailFilled, NumberOutlined } from '@ant-design/icons'; // Added more icons
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Panel } = Collapse;

function NewsContentDisplay({ filteredNews }) {
  const [isRankDetailModalVisible, setIsRankDetailModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [userFishList, setUserFishList] = useState([]);
  const [formData, setFormData] = useState({
    koi_name: '',
    competition_name: '',
    categoryName: '',
    registrationFee: 5,
    koi_id: '',
    competition_id: '',
    categoryId: '',
  });

  const { user } = useUser();
  const navigate = useNavigate();

  // Open Rank Detail Modal
  const showRankDetailModal = (news) => {
    setSelectedNews(news);
    setIsRankDetailModalVisible(true);
  };

  // Open Register Modal and fetch Koi Fish list
  const showRegisterModal = async (news) => {
    if (!user) {
      message.error("Bạn cần đăng nhập để thực hiện hành động này.");
      setTimeout(() => navigate('/sign-in'), 500);
      return;
    }

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

    await fetchUserFishList();
    setIsRegisterModalVisible(true);
  };

  const handleCancel = () => {
    setIsRankDetailModalVisible(false);
    setIsRegisterModalVisible(false);
  };

  const fetchUserFishList = async () => {
    try {
      const payload = { user_id: user.user_id };
      const response = await api.post('/api/KoiFish/Get Koi Fish By User Id', payload);
      if (Array.isArray(response.data)) {
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
      setFormData(prevState => ({
        ...prevState,
        koi_id: selectedFish.koi_id,
        koi_name: selectedFish.koi_name,
      }));
    }
  };

  const handleSubmit = async () => {
    if (user.balance < formData.registrationFee) {
      message.warning("Tài khoản của bạn không đủ. Vui lòng nạp thêm tiền để đăng ký.");
      return;
    }

    try {
      await api.post('/api/KoiRegistration/Create KoiRegistration', {
        koiId: formData.koi_id,
        koiName: formData.koi_name,
        CompetitionId: formData.competition_id,
        competition_name: formData.competition_name,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        registrationFee: formData.registrationFee,
      });
      message.success("Đăng ký thành công!");
      handleCancel();
    } catch (error) {
      message.error(error.response.data);
      console.error(error);
    }
  };

  // Filter active competitions
  const activeNews = filteredNews.filter(news => news.status_competition === "Active");

  return (
    <div style={{ flex: 1, padding: '20px', height: '850px', overflowY: 'auto' }}>
      <h3>News List</h3>
      {activeNews.length > 0 ? (
        activeNews.map((news) => (
          <div key={news.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
            <h4>{news.competition_name}</h4>
            <p>Category: {news.category.category_name}</p>
            <p>Award: {news.award.award_name}</p>
            <p>Created At: {new Date(news.start_time).toLocaleDateString()}</p>
            <div style={{ display: 'flex', gap: '10px', marginRight: '10px' }}>
              <Button onClick={() => showRankDetailModal(news)} icon={<TrophyOutlined />}>Detail Competition</Button>
              <Button onClick={() => showRegisterModal(news)} icon={<AppstoreAddOutlined />}>Register Competition</Button>
            </div>
          </div>
        ))
      ) : (
        <p>No active news found matching the selected filters.</p>
      )}

      <Modal
        title="Detail Competition"
        visible={isRankDetailModalVisible}
        onCancel={handleCancel}
        footer={[<Button key="back" onClick={handleCancel} icon={<LoginOutlined />}>Close</Button>]}
      >
        {selectedNews && (
          <div>
            <h4><TrophyOutlined style={{marginRight:5}}/>{selectedNews.competition_name}</h4>

            <p>
              <strong><UserOutlined style={{ marginRight: '8px' }} /> Number of Attendees:</strong> {selectedNews.number_attendees || 'N/A'}
            </p>

      <Collapse>
        {/* Category Details Panel */}
        <Panel header="Category Details" style={{ marginBottom: '15px' }}>
          <p><strong><DollarOutlined style={{ marginRight: '8px' }} /> Category Name:</strong> {selectedNews.category.category_name}</p>
          <p><strong><CheckCircleOutlined style={{ marginRight: '8px' }} /> Color:</strong> {selectedNews.category.koiStandard?.color_koi || 'N/A'}</p>
          <p><strong><CheckCircleOutlined style={{ marginRight: '8px' }} /> Pattern:</strong> {selectedNews.category.koiStandard?.pattern_koi || 'N/A'}</p>
          <p><strong><CheckCircleOutlined style={{ marginRight: '8px' }} /> Size:</strong> {selectedNews.category.koiStandard?.size_koi || 'N/A'}</p>
          <p><strong><CheckCircleOutlined style={{ marginRight: '8px' }} /> Age:</strong> {selectedNews.category.koiStandard?.age_koi || 'N/A'}</p>
          <p><strong><CheckCircleOutlined style={{ marginRight: '8px' }} /> Body Shape:</strong> {selectedNews.category.koiStandard?.bodyshape_koi || 'N/A'}</p>
          <p><strong><CheckCircleOutlined style={{ marginRight: '8px' }} /> Variety:</strong> {selectedNews.category.koiStandard?.variety_koi || 'N/A'}</p>
        </Panel>

        {/* Referee Details Panel */}
        <Panel header="Referee Details" style={{ marginBottom: '15px' }}>
          <p><strong><UserOutlined style={{ marginRight: '8px' }} /> Name:</strong> {selectedNews.referee?.refereeName || 'N/A'}</p>
          <p><strong><TrophyOutlined style={{ marginRight: '8px' }} /> Experience:</strong> {selectedNews.referee?.expJudge || 'N/A'}</p>
          <p><strong><UserOutlined style={{ marginRight: '8px' }} /> Full Name:</strong> {selectedNews.referee?.user?.full_name || 'N/A'}</p>
          <p><strong><MailFilled style={{ marginRight: '8px' }} /> Email:</strong> {selectedNews.referee?.user?.email || 'N/A'}</p>
          <p><strong><PhoneOutlined style={{ marginRight: '8px' }} /> Phone:</strong> {selectedNews.referee?.user?.phone || 'N/A'}</p>
        </Panel>

        {/* Award Details Panel */}
        <Panel header="Award Details" style={{ marginBottom: '15px' }}>
          <p><strong><TrophyOutlined style={{ marginRight: '8px' }} /> Award Name:</strong> {selectedNews.award?.award_name || 'N/A'}</p>
          <p><strong><NumberOutlined style={{ marginRight: '8px' }} /> Quantity:</strong> {selectedNews.award?.quantity || 'N/A'}</p>
        </Panel>
      </Collapse>
          </div>
        )}
      </Modal>

      {/* Register Modal */}
      <Modal
        title="Register Competition"
        visible={isRegisterModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Select
            placeholder="Select Koi"
            onChange={handleKoiSelectChange}
            style={{ width: '100%' }}
            suffixIcon={<UserOutlined />}
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
            readOnly
            prefix={<TrophyOutlined />}
          />
          <Input
            name="categoryName"
            placeholder="Category Name"
            value={formData.categoryName}
            readOnly
            prefix={<DollarOutlined />}
          />
          <Input
            name="registrationFee"
            placeholder="Registration Fee"
            value={formData.registrationFee}
            readOnly
            prefix={<DollarOutlined />}
          />
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} type="primary" icon={<AppstoreAddOutlined />}>Register</Button>
        </div>
      </Modal>
    </div>
  );
}

export default NewsContentDisplay;
