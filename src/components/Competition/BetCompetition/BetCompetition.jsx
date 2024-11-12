// BetCompetition.js
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdown, setCountdown] = useState('');
  const location = useLocation();
  const { competition } = location.state || {};

  // Fetch initial data
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
        console.log("Competition matches data:", response.data);  // Log the fetched matches to check
        setMatches(response.data);
      } catch (error) {
        setError('Không thể tải danh sách các trận đấu.');
        console.error(error);
      }
    };
  
    // Initial fetch
    fetchKoiFish();
    fetchCompetitionMatches();
  
    // Polling interval to fetch matches every 10 seconds
    const intervalId = setInterval(() => {
      fetchCompetitionMatches();
    }, 1000);
  
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [user, competition]);
  
  useEffect(() => {
    const start = new Date(competition?.betting_start || competition.start_time);
    const end = new Date(competition?.betting_end || competition.end_time);

    const timer = setInterval(() => {
      setCurrentTime(new Date());

      if (currentTime < start) {
        const timeRemaining = start - currentTime;
        setCountdown(`Bắt đầu sau ${formatCountdown(timeRemaining)}`);
      } else if (currentTime >= start && currentTime <= end) {
        const timeRemaining = end - currentTime;
        setCountdown(`Còn ${formatCountdown(timeRemaining)} để đặt cược`);
      } else {
        setCountdown("Hết thời gian đặt cược");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [competition, currentTime]);

  const formatCountdown = (time) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handlePlaceBet = async () => {
    if (!selectedKoi) {
      message.error("Vui lòng chọn một cá koi để đặt cược.");
      return;
    }

    try {
      await api.post('/api/KoiBet/Place Bet', {
        user_id: user.user_id,
        koi_id: selectedKoi.koi_id,
        competition_id: competition.competition_id,
      });
      message.success("Đặt cược thành công!");
    } catch (error) {
      message.error("Đặt cược thất bại, vui lòng thử lại.");
    }
  };

  const canBet = competition?.betting_start && competition?.betting_end 
                 && currentTime >= new Date(competition.betting_start || competition.start_time) 
                 && currentTime <= new Date(competition.betting_end || competition.end_time);

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
          <BetForm user={user} koiList={koiList} selectedKoi={selectedKoi} setSelectedKoi={setSelectedKoi} handlePlaceBet={handlePlaceBet} canBet={canBet} countdown={countdown} />
        </Col>
      </Row>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </Card>
  );
}

export default BetCompetition;
