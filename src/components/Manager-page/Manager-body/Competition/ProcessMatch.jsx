import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { api } from '../../../../config/AxiosConfig';
function ProcessMatch({ competitionId }) {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = async () => {
    setIsModalVisible(true);
    setLoading(true);
  
    try {
      const response = await api.post('/api/CompetitionMatch/Processing Match', {
        competitionId, 
      });
  
      // Kiểm tra nếu có thông báo "Round not finished!"
      if (response.data ) {
        message.success('Lấy dữ liệu thành công!');
        setMatchData(response.data); // Cập nhật dữ liệu match
      } else {
        message.warning('Không có dữ liệu cho competition này.');
        setMatchData(null); // Nếu không có dữ liệu
      }
    } catch (error) {
      if (error.response.data) {
        message.error(error.response.data); // Hiển thị thông báo lỗi từ API
      } else {
        message.error('Lỗi khi lấy dữ liệu: ' + error.message); // Thông báo lỗi chung
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setMatchData(null); // Reset dữ liệu khi đóng modal
  };

  return (
    <div >
      <Button type="primary" onClick={handleOpenModal}>
        Process Match
      </Button>

      <Modal
        title="Kết quả xử lý"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
        ]}
        confirmLoading={loading}
      >
        {loading ? (
          <p>Đang xử lý...</p>
        ) : matchData ? (
          <div>
            <h3>Kết quả:</h3>
            <pre>{JSON.stringify(matchData, null, 2)}</pre>
          </div>
        ) : (
          <p>Không có dữ liệu để hiển thị.</p>
        )}
      </Modal>
    </div>
  );
}

export default ProcessMatch;
