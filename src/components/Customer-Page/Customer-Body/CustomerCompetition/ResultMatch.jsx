import React, { useState, useEffect } from 'react';
import { api } from '../../../../config/AxiosConfig';
import { Input, Spin, Table, message, Modal, Button } from 'antd';
import { SearchOutlined, PlayCircleOutlined, TrophyOutlined } from '@ant-design/icons'; // Import icon từ Ant Design

function ResultMatch() {
  const [isModalVisible, setIsModalVisible] = useState(false); // Hiển thị modal
  const [competitionID, setCompetitionID] = useState(''); // ID của competition
  const [data, setData] = useState([]); // Dữ liệu từ API
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [showTable, setShowTable] = useState(false); // Hiển thị bảng kết quả
  const [noDataMessage, setNoDataMessage] = useState(''); // Thông báo không có dữ liệu

  // Hàm gọi API khi tìm kiếm
  const fetchResults = async () => {
    if (!competitionID.trim() || competitionID.length < 3) { // Kiểm tra độ dài ID
      setShowTable(false); // Ẩn bảng khi không có competitionID hợp lệ
      return;
    }

    setLoading(true);
    setNoDataMessage(''); // Reset thông báo không có dữ liệu
    try {
      const response = await api.get('/api/CompetitionMatch/Get Competition By CompeId', {
        params: { competitionMatchId: competitionID },
      });
      setData(response.data || []);
      if (response.data.length === 0) {
        setShowTable(false); // Ẩn bảng khi không có kết quả
        setNoDataMessage('Không có dữ liệu từ Competition bạn nhập'); // Hiển thị thông báo không có dữ liệu
      } else {
        setShowTable(true); // Hiển thị bảng khi có kết quả
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      message.error('Đã xảy ra lỗi, vui lòng thử lại sau');
      setShowTable(false); // Ẩn bảng nếu có lỗi
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị kết quả cho ô kết quả trong bảng
  const processResult = (result) => {
    if (result) {
      const parts = result.split('_'); // Tách tên và số theo dấu "_"
      const name = parts[0] || '';
      const number = parts[1] || '';
      return { name, number };
    }
    return { name: '', number: '' };
  };

  // Cột cho bảng
  const columns = [
    {
      title: <span><PlayCircleOutlined /> Match Code</span>, // Thêm icon vào tiêu đề
      dataIndex: 'match_id',
      key: 'match_id',
    },
    {
      title: <span><TrophyOutlined /> First Koi</span>, // Thêm icon vào tiêu đề
      dataIndex: ['firstKoi', 'koi_name'], // Nested data index
      key: 'firstKoi',
    },
    {
      title: <span><TrophyOutlined /> Second Koi</span>, // Thêm icon vào tiêu đề
      dataIndex: ['secondKoi', 'koi_name'], // Nested data index
      key: 'secondKoi',
    },
    {
      title: <span><SearchOutlined /> Kết Quả</span>, // Thêm icon vào tiêu đề
      dataIndex: 'result',
      key: 'result',
      render: (result) => {
        const { name, number } = processResult(result);
        return (
          <div>
            <h4>Koi Name: {name}</h4>
            <h4>Score: {number}</h4>
          </div>
        );
      },
    },
  ];

  // Sử dụng useEffect để tự động gọi fetchResults khi competitionID thay đổi
  useEffect(() => {
    if (competitionID) {
      fetchResults();
    } else {
      setData([]);
      setShowTable(false); // Ẩn bảng khi xóa competitionID
      setNoDataMessage(''); // Reset thông báo khi không có competitionID
    }
  }, [competitionID]);

  return (
    <div >
      {/* Nút hiển thị modal với icon */}
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ color: '#FFD700' }}
        icon={<SearchOutlined />} // Thêm icon vào nút
      >
        Tìm Kiếm
      </Button>

      {/* Modal chứa search bar và bảng kết quả */}
      <Modal
        title="Tìm Kiếm Competition"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setShowTable(false); // Ẩn bảng khi đóng modal
          setCompetitionID(''); // Reset Competition ID
          setNoDataMessage(''); // Reset thông báo không có dữ liệu
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Hủy
            </Button>
          </div>
        }
        width={1000}
      >
        {/* Input để nhập Competition ID */}
        <Input
          placeholder="Nhập Competition ID bắt đầu từ CPT"
          value={competitionID}
          onChange={(e) => setCompetitionID(e.target.value)}
          style={{ marginBottom: '20px', width: '100%' }}
        />

        {/* Bảng hiển thị kết quả */}
        {loading ? (
          <Spin tip="Đang tải dữ liệu..." />
        ) : (
          <>
            {showTable && (
              <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
                pagination={false} // Không phân trang trong modal
                style={{ marginTop: '20px' }}
              />
            )}
            {!showTable && noDataMessage && (
              <div style={{ marginTop: '20px', color: 'red', fontWeight: 'bold' }}>
                {noDataMessage}
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

export default ResultMatch;
