import React, { useState } from "react";
import { Input, Modal, List, Button, message, Spin, Collapse, Empty } from "antd";
import { api } from "../../../../config/AxiosConfig";
import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

function SearchMatch() {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setSearchText(value);

    if (value.trim() !== "") {
      setLoading(true);
      try {
        console.log("Input Search Text:", value);

        const response = await api.get(
          `/api/CompetitionMatch/Get Competition By CompeId`,
          {
            params: { competitionMatchId: value },
          }
        );

        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setSearchResults(response.data);
          setIsModalVisible(true);
        } else {
          setSearchResults([]);
          message.warning("Không có trận đấu nào tồn tại!");
        }
      } catch (error) {
        console.error("API Error:", error);
        message.error("Có lỗi xảy ra khi gọi API!");
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSearchText("");
    setSearchResults([]);
  };

  return (
    <div>
      {/* Ô nhập tìm kiếm */}
      <Input.Search
        placeholder="Nhập ID Competition để tìm kiếm trận đấu"
        onSearch={handleSearch}
        enterButton="Tìm kiếm"
        size="large"
        loading={loading}
        style={{width:'400px'}}
      />

      {/* Modal hiển thị kết quả */}
      <Modal
        title="Kết quả tìm kiếm"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" type="primary" onClick={handleCloseModal} icon={<CloseOutlined />} 
          style={{marginLeft: '650px'}}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {loading ? (
          <Spin />
        ) : searchResults.length === 0 ? (
          <Empty description="Không có trận đấu nào tồn tại!" />
        ) : (
          <Collapse accordion>
            {searchResults.map((match) => (
              <Panel
                key={match.match_id}
                header={`Trận đấu ID: ${match.match_id}`}
                extra={<InfoCircleOutlined />}
              >
                <p>
                  <strong>Vòng đấu ID:</strong> {match.round_id}
                </p>
                <p>
                  <strong>Kết quả:</strong> {match.result}
                </p>

                <Collapse defaultActiveKey={["1"]}>
                  <Panel header="Thông tin Cá Koi 1" key="1">
                    <p><strong>Tên:</strong> {match.firstKoi.koi_name}</p>
                    <p><strong>Giống:</strong> {match.firstKoi.koi_variety}</p>
                    <p><strong>Kích thước:</strong> {match.firstKoi.koi_size} cm</p>
                    <p><strong>Tuổi:</strong> {match.firstKoi.koi_age}</p>
                    <p>
                      <strong>Chủ sở hữu:</strong> {match.firstKoi.user.full_name} (
                      {match.firstKoi.user.email})
                    </p>
                  </Panel>

                  <Panel header="Thông tin Cá Koi 2" key="2">
                    <p><strong>Tên:</strong> {match.secondKoi.koi_name}</p>
                    <p><strong>Giống:</strong> {match.secondKoi.koi_variety}</p>
                    <p><strong>Kích thước:</strong> {match.secondKoi.koi_size} cm</p>
                    <p><strong>Tuổi:</strong> {match.secondKoi.koi_age}</p>
                    <p>
                      <strong>Chủ sở hữu:</strong> {match.secondKoi.user.full_name} (
                      {match.secondKoi.user.email})
                    </p>
                  </Panel>
                </Collapse>
              </Panel>
            ))}
          </Collapse>
        )}
      </Modal>
    </div>
  );
}

export default SearchMatch;
