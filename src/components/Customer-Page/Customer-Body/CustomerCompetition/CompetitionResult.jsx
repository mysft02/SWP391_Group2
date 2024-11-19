import React, { useState } from 'react';
import { Table, Spin, Alert, Button, Modal } from 'antd'; // Import Modal từ antd
import { api } from '../../../../config/AxiosConfig'; // Đảm bảo api được cấu hình chính xác

function CompetitionResult({ koiId, competitionId }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State để điều khiển hiển thị modal

  // Hàm fetch dữ liệu khi nhấn nút Xem kết quả
  const fetchCompetitionResults = async () => {
    console.log('Competition ID:', competitionId);
    console.log('Koi ID:', koiId);
    setLoading(true); // Bật loading
    try {
      const response = await api.get(
        `/api/KoiScore/Get KoiScore By KoiId And CompeId?competitionId=${competitionId}&KoiId=${koiId}`
      ); // Đảm bảo URL chính xác
      setResults(response.data); // Lưu kết quả vào state
      setIsModalVisible(true); // Mở modal khi có dữ liệu
    } catch (err) {
      setError('Failed to fetch competition results');
    } finally {
      setLoading(false); // Tắt loading
    }
  };

  // Cấu hình các cột cho bảng antd
  const columns = [
    {
      title: 'Rank',
      key: 'rank',
      render: (text, record, index) => index + 1, // Tính rank dựa trên index
    },
    {
      title: 'Match ID',
      dataIndex: 'match_id',
      key: 'match_id',
    },
    {
      title: 'Koi Name',
      dataIndex: ['fishKoi', 'koi_name'], // Lấy tên cá koi
      key: 'koi_name',
    },
    {
      title: 'Variety',
      dataIndex: ['fishKoi', 'koi_variety'], // Lấy giống cá koi
      key: 'koi_variety',
    },
    {
      title: 'Score',
      dataIndex: 'score_koi',
      key: 'score_koi',
    },
    {
      title: 'Referee Name',
      dataIndex: ['referee', 'refereeName'], // Lấy tên trọng tài
      key: 'refereeName',
    },
  ];

  return (
    <div>
      {/* Nút xem kết quả */}
      <Button type="primary" onClick={fetchCompetitionResults} loading={loading}>
        Xem Kết Quả
      </Button>

      {/* Hiển thị modal */}
      <Modal
        title="Kết Quả Cuộc Thi"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // Đóng modal
        footer={null} // Không dùng footer
        width={800} // Tuỳ chỉnh độ rộng
      >
        {/* Loading */}
        {loading && <Spin size="large" />}

        {/* Lỗi */}
        {error && <Alert message="Error" description={error} type="error" showIcon />}

        {/* Bảng kết quả */}
        {!loading && !error && (
          <Table
            columns={columns}
            dataSource={results} // Dữ liệu lấy từ API
            rowKey="score_id" // Sử dụng score_id làm key duy nhất
            pagination={false} // Không phân trang
            bordered
          />
        )}
      </Modal>
    </div>
  );
}

export default CompetitionResult;
