import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { api } from "../../../../config/AxiosConfig";
import { useUser } from "../../../../data/UserContext";
import UpdateScoreReferee from "./UpdateScoreReferee";
import { AppstoreAddOutlined, TrophyOutlined, SearchOutlined, FieldTimeOutlined, HistoryOutlined } from "@ant-design/icons"; // Thêm HistoryOutlined icon cho tiêu đề h2

function HistoryScore() {
  const [data, setData] = useState([]);
  const { user } = useUser(); // Lấy thông tin user từ UserContext
  const username = user.username; // Username của người dùng hiện tại

  // Cột cho bảng
  const columns = [
    {
      title: (
        <span>
          <AppstoreAddOutlined style={{ marginRight: 8 }} />
          ID Điểm số
        </span>
      ),
      dataIndex: "score_id",
      key: "score_id",
    },
    {
      title: (
        <span>
          <TrophyOutlined style={{ marginRight: 8 }} />
          Tên cá Koi
        </span>
      ),
      dataIndex: ["fishKoi", "koi_name"],
      key: "koi_name",
    },
    {
      title: (
        <span>
          <SearchOutlined style={{ marginRight: 8 }} />
          Điểm số
        </span>
      ),
      dataIndex: "score_koi",
      key: "score_koi",
    },
    {
      title: (
        <span>
          <FieldTimeOutlined style={{ marginRight: 8 }} />
          Trận đấu
        </span>
      ),
      dataIndex: "match_id",
      key: "match_id",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <UpdateScoreReferee
          scoreId={record.score_id}
          koiId={record.fishKoi.koi_id}
          matchId={record.match_id}
          score={record.score_koi}
        />
      ),
    },
  ];

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await api.get("/api/KoiScore/Get KoiScore By RefereeId", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const scores = response.data;

        // Lọc dữ liệu dựa trên username của trọng tài
        const filteredData = scores.filter(
          (score) => score.referee.refereeName === username
        );

        setData(filteredData); // Cập nhật state
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchScores();
  }, [username]);

  return (
    <div>
      <h2>
        <HistoryOutlined style={{ marginRight: 8 }} />
        Lịch sử chấm điểm
      </h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="score_id" // Sử dụng `score_id` làm key cho từng hàng
        pagination={{ pageSize: 3 }} // Hiển thị 5 hàng mỗi trang
      />
    </div>
  );
}

export default HistoryScore;
