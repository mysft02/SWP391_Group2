import React, { useState } from "react";
import { Modal, InputNumber, Button, Form, message } from "antd";
import { api } from "../../../../config/AxiosConfig";
import { useUser } from "../../../../data/UserContext";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons"; // Import icon

function UpdateScoreReferee({ scoreId, koiId, matchId, score }) {
  const { user } = useUser(); // Lấy thông tin user từ UserContext
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở/đóng modal
  const [loading, setLoading] = useState(false); // Trạng thái loading khi gửi API
  const [scoreValue, setScoreValue] = useState(score || 0); // Điểm được cập nhật, sử dụng score truyền vào

  // Hàm mở modal
  const showModal = () => {
    setScoreValue(score || 0); // Đảm bảo điểm được truyền vào khi mở modal
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Hàm gửi API cập nhật điểm số
  const handleScoreUpdate = async () => {
    try {
      setLoading(true);
      const payload = {
        scoreId,
        koiId,
        matchId,
        score: scoreValue, // Sử dụng scoreValue thay vì score
      };

      // Gửi API
      await api.put("/api/KoiScore/Update KoiScore", payload, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Thông báo thành công
      message.success("Cập nhật điểm thành công!");

      // Đóng modal
      handleCancel();
    } catch (error) {
      // Thông báo lỗi
      message.error("Lỗi khi cập nhật điểm: " + (error.response?.data || "Không rõ lỗi"));
      console.error("Lỗi khi cập nhật điểm:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Nút để mở modal */}
      <Button type="primary" onClick={showModal} icon={<SaveOutlined />}>
        Cập nhật điểm
      </Button>

      {/* Modal nhập điểm */}
      <Modal
        title="Cập nhật điểm số"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              key="update"
              type="primary"
              loading={loading}
              onClick={handleScoreUpdate}
              disabled={scoreValue === null || scoreValue < 0}
              icon={<SaveOutlined />} // Icon cho nút lưu
            >
              Lưu
            </Button>
            <Button key="cancel" onClick={handleCancel} icon={<CloseOutlined />}>
              Hủy
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Điểm số">
            <InputNumber
              min={0}
              max={10}
              value={scoreValue}
              onChange={(value) => setScoreValue(value)} // Cập nhật giá trị điểm
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateScoreReferee;
