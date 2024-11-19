import React, { useEffect, useState } from 'react';
import { Table, Typography, Button, Modal } from 'antd';
import {
  InfoCircleOutlined,
  EyeOutlined,
  IdcardOutlined,
  DollarCircleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  DockerOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import CompetitionResult from '../CustomerCompetition/CompetitionResult';

const { Title } = Typography;

function HistoryRegisKoi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Lưu bản ghi được chọn
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái modal

  const { user } = useUser(); // Lấy thông tin user (nếu cần truyền userId vào API)

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/KoiRegistration/Get KoiRegistrationByUserId`, {
          params: { userId: user.user_id }, // Truyền userId nếu cần
        });
        setData(response.data); // Lưu dữ liệu từ API vào state
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [user.user_id]);

  // Hàm xử lý khi người dùng nhấn nút hiển thị chi tiết
  const handleShowDetails = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  // Cấu hình cột của bảng
  const columns = [
    {
      title: <><IdcardOutlined style={{ color: '#1890ff' }} /> ID Đăng Ký</>,
      dataIndex: 'registrationId',
      key: 'registrationId',
    },
    {
      title: <><DockerOutlined style={{ color: '#52c41a' }} /> Tên Koi</>,
      dataIndex: ['fishKoi', 'koi_name'],
      key: 'koi_name',
    },
    {
      title: <><TrophyOutlined style={{ color: '#faad14' }} /> Trận đấu </>,
      dataIndex: 'competition_id',
      key: 'competition_id',
    },
    {
      title: <><CheckCircleOutlined style={{ color: '#389e0d' }} /> Trạng Thái</>,
      dataIndex: 'statusRegistration',
      key: 'statusRegistration',
    },
    {
      title: <><DollarCircleOutlined style={{ color: '#fa541c' }} /> Phí Đăng Ký</>,
      dataIndex: 'registrationFee',
      key: 'registrationFee',
      render: (fee) => `${fee} USD`,
    },
    {
      title: <><EyeOutlined style={{ color: '#722ed1' }} /> Hành Động</>,
      key: 'actions',
      render: (_, record) => (
        <div style={{display:'flex', gap: 5}}>
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleShowDetails(record)}
        >
          Xem
        </Button>
        <CompetitionResult competitionId={record.competition_id} koiId = {record.fishKoi.koi_id}/>
        </div>
        
        
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>
        <InfoCircleOutlined style={{ marginRight: 8, color: '#FFD700' }} />
        Lịch Sử Đăng Ký Koi
      </Title>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="registrationId"
        loading={loading}
        bordered
        pagination={{ pageSize: 3 }}
      />
      {/* Modal hiển thị chi tiết */}
      <Modal
        title={
          <>
            <InfoCircleOutlined style={{ marginRight: 8, color: '#FFD700' }} />
            Chi Tiết Đăng Ký
          </>
        }
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedRecord && (
          <div>
            <p>
              <IdcardOutlined style={{ marginRight: 8 }} />
              <strong>ID Đăng Ký:</strong> {selectedRecord.registrationId}
            </p>
            <p>
              <DockerOutlined style={{ marginRight: 8 }} />
              <strong>Tên Koi:</strong> {selectedRecord.fishKoi.koi_name}
            </p>
            <p>
              <DockerOutlined style={{ marginRight: 8 }} />
              <strong>Loại Koi:</strong> {selectedRecord.fishKoi.koi_variety}
            </p>
            <p>
              <CheckCircleOutlined style={{ marginRight: 8 }} />
              <strong>Trạng Thái:</strong> {selectedRecord.statusRegistration}
            </p>
            <p>
              <CalendarOutlined style={{ marginRight: 8 }} />
              <strong>Ngày Bắt Đầu:</strong>{' '}
              {new Date(selectedRecord.startDates).toLocaleDateString()}
            </p>
            <p>
              <CalendarOutlined style={{ marginRight: 8 }} />
              <strong>Ngày Kết Thúc:</strong>{' '}
              {new Date(selectedRecord.endDates).toLocaleDateString()}
            </p>
            <p>
              <DollarCircleOutlined style={{ marginRight: 8 }} />
              <strong>Phí Đăng Ký:</strong> {selectedRecord.registrationFee} USD
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default HistoryRegisKoi;
