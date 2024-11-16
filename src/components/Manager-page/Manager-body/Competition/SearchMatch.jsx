import React, { useState } from "react";
import { Input, Modal, List, Button } from "antd";

function SearchMatch() {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Dữ liệu mẫu
  const mockData = [
    { id: 1, name: "Match 1", location: "Stadium A", time: "18:00" },
    { id: 2, name: "Match 2", location: "Stadium B", time: "20:00" },
    { id: 3, name: "Match 3", location: "Stadium C", time: "22:00" },
  ];

  // Xử lý khi nhập vào ô tìm kiếm
  const handleSearch = (value) => {
    setSearchText(value);
    if (value.trim() !== "") {
      const results = mockData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Hiển thị modal
  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSearchText("");
    setSearchResults([]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Nút hiển thị modal */}
      <Button type="primary" onClick={handleShowModal}>
        Tìm kiếm trận đấu
      </Button>

      {/* Modal chứa thanh tìm kiếm và kết quả */}
      <Modal
        title="Tìm kiếm trận đấu"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {/* Thanh tìm kiếm */}
        <Input.Search
          placeholder="Nhập tên trận đấu..."
          allowClear
          enterButton="Tìm"
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ marginBottom: "20px" }}
        />

        {/* Kết quả tìm kiếm */}
        {searchResults.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={`Địa điểm: ${item.location} | Thời gian: ${item.time}`}
                />
              </List.Item>
            )}
          />
        ) : (
          searchText && <p>Không tìm thấy trận đấu nào.</p>
        )}
      </Modal>
    </div>
  );
}

export default SearchMatch;
