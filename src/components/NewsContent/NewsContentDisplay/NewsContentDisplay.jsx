import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

function NewsContentDisplay({ filteredNews }) {
  const [isRankDetailModalVisible, setIsRankDetailModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showRankDetailModal = (news) => {
    setSelectedNews(news);
    setIsRankDetailModalVisible(true);
  };

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleCancel = () => {
    setIsRankDetailModalVisible(false);
    setIsRegisterModalVisible(false);
  };

  const handleSubmit = () => {
    console.log(formData);
    handleCancel();
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
              <Button onClick={showRegisterModal}>Regist Competition</Button>
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
            <p>Detail:{selectedNews.competitionDescription}</p>
            <p>Award: {selectedNews.award}</p>
            <p>Start: {new Date(selectedNews.startTime).toLocaleDateString()}</p>
            <p>End: {new Date(selectedNews.endTime).toLocaleDateString()}</p>

          </div>
        )}
      </Modal>

      <Modal
        title="Regist Competition"
        open={isRegisterModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
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
