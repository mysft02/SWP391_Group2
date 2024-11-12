import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Divider, message } from 'antd';
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import { useLocation } from 'react-router-dom';

import CompetitionDisplay from './CompetitionDisplay';
import MatchTable from './MatchTable';
import BetForm from './BetForm';

function BetCompetition() {
  const { user } = useUser();
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [koiList, setKoiList] = useState([]);
  const [error, setError] = useState('');
  const [matches, setMatches] = useState([]);
  const location = useLocation();
  const { competition } = location.state || {};

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    const fetchKoiFish = async () => {
      if (!user?.user_id) {
        setError('User ID không tồn tại.');
        return;
      }
      try {
        const response = await api.post('/api/KoiFish/Get Koi Fish By User Id', { user_id: user.user_id });
        setKoiList(response.data);
        setError('');
      } catch (error) {
        setError('Không thể tải danh sách cá koi. Vui lòng thử lại sau.');
      }
    };
  
    const fetchCompetitionMatches = async () => {
      try {
        const response = await api.get(`/api/CompetitionMatch/Get Competition By CompeId?competitionMatchId=${competition.competition_id}`);
        setMatches(response.data);
      } catch (error) {
        setError('Không thể tải danh sách các trận đấu.');
        console.error(error);
      }
    };
  
    // Lấy dữ liệu ban đầu
    fetchKoiFish();
    fetchCompetitionMatches();
  
    // Lặp lại việc lấy dữ liệu trận đấu mỗi giây
    const intervalId = setInterval(() => {
      fetchCompetitionMatches();
    }, 30000);
  
    // Dọn dẹp khi component bị hủy
    return () => clearInterval(intervalId);
  }, [user, competition]);

  const handlePlaceBet = async (betData) => {
    try {
      await api.post('/api/KoiBet/Place Bet', betData);  // Sử dụng betData để gửi yêu cầu
      message.success("Đặt cược thành công!");
    } catch (error) {
      message.error("Đặt cược thất bại, vui lòng thử lại.");
    }
  };
  

  // Bỏ điều kiện kiểm tra thời gian
  const canBet = true;  // Không cần kiểm tra thời gian nữa

  return (
    <Card title={`Name Competition: ${competition?.competition_name}`} style={{ maxWidth: 1500}}>
      <Row gutter={16}>
        <CompetitionDisplay competition={competition} />

        <Col span={1}>
          <Divider type="vertical" style={{ height: '100%', width: '20%' }} />
        </Col>

        <Col span={11}>
          <MatchTable matches={matches} koiList={koiList} />
          <Divider />
          <BetForm user={user} competition={competition} koiList={koiList} selectedKoi={selectedKoi} setSelectedKoi={setSelectedKoi} handlePlaceBet={handlePlaceBet} matches={matches}/>
        </Col>
      </Row>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </Card>
  );
}

export default BetCompetition;
