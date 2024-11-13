import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { UserOutlined, DollarOutlined, TrophyOutlined, BarcodeOutlined, FileDoneOutlined, TeamOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig';

function ManagementBet() {
  const [betData, setBetData] = useState([]);

  // Hàm để lấy dữ liệu từ API
  const fetchBets = async () => {
    try {
      const response = await api.get('/api/KoiBet/Get All Bet');
      setBetData(response.data);
    } catch (error) {
      console.error('Error fetching bets:', error);
    }
  };

  // Gọi hàm lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchBets();
  }, []);

  // Cấu hình các cột trong bảng với icon
  const columns = [
    {
      title: <><BarcodeOutlined /> Bet ID</>,
      dataIndex: 'betId',
      key: 'betId',
    },
    {
      title: <><UserOutlined /> User Name</>,
      dataIndex: ['user', 'username'],
      key: 'username',
    },
    {
      title: <><DollarOutlined /> Bet Amount</>,
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      render: (amount) => `${amount} VND`,
    },
    {
      title: <><TrophyOutlined /> Competition Name</>,
      dataIndex: ['competitionKoi', 'competition_name'],
      key: 'competition_name',
    },
    {
      title: <><BarcodeOutlined /> Koi Name</>,
      dataIndex: ['competitionKoi', 'koi_id'],
      key: 'koi_id',
    },
    {
      title: <><FileDoneOutlined /> Status</>,
      dataIndex: ['koiRegistration', 'statusRegistration'],
      key: 'statusRegistration',
      render: (status) => (
        <Tag color={status === 'Accepted' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: <><TeamOutlined /> Slot Registration</>,
      dataIndex: ['koiRegistration', 'slotRegistration'],
      key: 'slotRegistration',
    },
  ];

  return (
    <div>
      <h2>Management Bet</h2>
      <Table columns={columns} dataSource={betData} rowKey="betId" />
    </div>
  );
}

export default ManagementBet;
