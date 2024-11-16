import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { api } from "../../../../config/AxiosConfig";
import { useUser } from "../../../../data/UserContext";
// Import các icon từ Ant Design
import { CalendarOutlined, TrophyOutlined, MoneyCollectOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined, DollarCircleOutlined } from '@ant-design/icons';

function HistoryBet() {
  // State lưu dữ liệu bet history
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy user_id từ context người dùng
  const { user } = useUser();
  const userId = user.user_id; // Tránh trường hợp userId không tồn tại

  useEffect(() => {
    if (userId) {
      // Hàm gọi API để lấy lịch sử cược
      const fetchBetHistory = async () => {
        try {
          const response = await api.get(`/api/KoiBet/Get Bet History By UserId`, {
            params: { userId: userId }, // Truyền userId vào API
          });
          // Chuyển đổi dữ liệu thành định dạng cần hiển thị
          const formattedData = response.data.map((bet) => ({
            key: bet.betId, // Chuyển betId thành key cho bảng
            date: new Date(bet.betDate).toLocaleDateString(), // Định dạng lại ngày
            competition: bet.competitionId, // Trò chơi (competitionId)
            amount: `${bet.betAmount.toLocaleString()} VND`, // Định dạng số tiền cược
            result: bet.status, // Trạng thái cược (Pending, Win, Lose)
          }));
          setDataSource(formattedData); // Cập nhật dữ liệu vào state
        } catch (error) {
          setError("Không thể tải lịch sử cược.");
        } finally {
          setLoading(false);
        }
      };

      fetchBetHistory();
    }
  }, [userId]); // Gọi lại khi userId thay đổi

  // Cấu trúc các cột với icon
  const columns = [
    {
      title: (
        <>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Date
        </>
      ),
      dataIndex: "date",
      key: "date",
    },
    {
      title: (
        <>
          <TrophyOutlined style={{ marginRight: 8 }} />
          Competition
        </>
      ),
      dataIndex: "competition",
      key: "competition",
    },
    {
      title: (
        <>
          <DollarCircleOutlined  style={{ marginRight: 8 }} />
          Amount
        </>
      ),
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: (
        <>
          <CheckCircleOutlined style={{ marginRight: 8 }} />
          Result
        </>
      ),
      dataIndex: "result",
      key: "result",
      render: (text) => (
        <span style={{ color: text === "Win" ? "green" : text === "Lose" ? "red" : "orange" }}>
          {text === "Win" ? (
            <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />
          ) : text === "Lose" ? (
            <CloseCircleOutlined style={{ color: "red", marginRight: 8 }} />
          ) : (
            <span style={{ color: "orange" ,marginRight: 8}}><LoadingOutlined/></span>
          )}
          {text}
        </span>
      ),
    },
  ];

  // Hiển thị nếu đang tải
  if (loading) {
    return <div>Đang tải...</div>;
  }

  // Hiển thị nếu có lỗi
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>History Bet</h2>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 3 }} />
    </div>
  );
}

export default HistoryBet;
