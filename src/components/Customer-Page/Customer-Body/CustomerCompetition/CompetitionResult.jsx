import React, { useState } from 'react';
import { Table, Spin, Alert, Button, Modal } from 'antd'; // Import Modal từ antd
import { api } from '../../../../config/AxiosConfig'; // Đảm bảo api được cấu hình chính xác
import { useUser } from '../../../../data/UserContext';
import { TrophyOutlined, UserOutlined, AppstoreAddOutlined } from '@ant-design/icons'; // Thêm icon

function CompetitionResult({ koiId, competitionId }) {
  const { user } = useUser();
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
        "/api/KoiScore/Get KoiScore By UserId", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      ); // Đảm bảo URL chính xác

      // Hàm để lấy giá trị số từ match_id
      const getRoundValue = (matchId) => {
        const parts = matchId.split('_'); // Tách match_id theo dấu _
        const roundNumber = parseInt(parts[1].replace('CPT', '')); // Lấy phần CPT_2 -> 2, CPT_1 -> 1
        return roundNumber;
      };

      // Sắp xếp dữ liệu theo round trước, rồi đến score_koi
      const sortedResults = response.data.sort((a, b) => {
        const roundA = getRoundValue(a.match_id); // Lấy giá trị round của match_id
        const roundB = getRoundValue(b.match_id);

        if (roundA === roundB) {
          return b.score_koi - a.score_koi; // Nếu round giống nhau, so sánh điểm
        }
        return roundB - roundA; // Sắp xếp theo round (CPT_2 trước, CPT_1 sau)
      });

      setResults(sortedResults); // Lưu kết quả vào state
      setIsModalVisible(true); // Mở modal khi có dữ liệu
    } catch (err) {
      setError('Failed to fetch competition results');
    } finally {
      setLoading(false); // Tắt loading
    }
  };
  const getRoundValue = (matchId) => {
    const parts = matchId.split('_'); // Tách match_id theo dấu _
    if (parts.length < 2) return 0; // Kiểm tra nếu không có phần "CPT_x"
    const roundNumber = parseInt(parts[1].replace('CPT', '')); // Lấy phần CPT_2 -> 2, CPT_1 -> 1
    return isNaN(roundNumber) ? 0 : roundNumber; // Trả về 0 nếu parseInt không thành công
  };
  // Cấu hình các cột cho bảng antd
  const columns = [
    {
      title: <span><TrophyOutlined /> Rank</span>, // Thêm icon vào cột Rank
      key: 'rank',
      render: (text, record, index) => index + 1, // Tính rank dựa trên index
      sorter: (a, b) => a.rank - b.rank, // Thêm chức năng sắp xếp theo rank
    },
    {
      title: <span><AppstoreAddOutlined /> Match ID</span>, // Thêm icon vào cột Match ID
      dataIndex: 'match_id',
      key: 'match_id',
      sorter: (a, b) => {
        const roundA = getRoundValue(a.match_id);
        const roundB = getRoundValue(b.match_id);
        if (roundA === roundB) return a.match_id.localeCompare(b.match_id); // So sánh match_id nếu cùng round
        return roundB - roundA; // Sắp xếp theo round
      },
    },
    {
      title: <span><UserOutlined /> Koi Name</span>, // Thêm icon vào cột Koi Name
      dataIndex: ['fishKoi', 'koi_name'], // Lấy tên cá koi
      key: 'koi_name',
    },

    {
      title: <span><TrophyOutlined /> Score</span>, // Thêm icon vào cột Score
      dataIndex: 'score_koi',
      key: 'score_koi',
      sorter: (a, b) => a.score_koi - b.score_koi, // Thêm chức năng sắp xếp theo điểm
    },
    {
      title: <span><UserOutlined /> Referee Name</span>, // Thêm icon vào cột Referee Name
      dataIndex: ['referee', 'refereeName'], // Lấy tên trọng tài
      key: 'refereeName',
    },
  ];

  return (
    <div>
      {/* Nút xem kết quả */}
      <Button type="primary" icon={<AppstoreAddOutlined />} onClick={fetchCompetitionResults} loading={loading} style={{color: '#FFD700'}}>
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
