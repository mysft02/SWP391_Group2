import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Progress, Card } from 'antd';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';

function AdminDashBoard() {
  const { user } = useUser();
  const [userCount, setUserCount] = useState(0);
  const [competitionCount, setCompetitionCount] = useState(0);
  const [betCount, setBetCount] = useState(0);

  // Fetch data for each statistic
  const fetchData = async () => {
    try {
      // Get all users
      const usersResponse = await api.get('/api/User/GetAllUser', {}, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      // Đếm số lượng user_unique
      const uniqueUsers = new Set(usersResponse.data.map(user => user.user_id));  // Giả sử user_id là key duy nhất
      setUserCount(uniqueUsers.size);

      // Get all competitions
      const competitionsResponse = await api.get('/api/CompetitionKoi/GetAllCompetitionKoi');
      // Đếm số lượng competition_unique theo competition_id
      const uniqueCompetitions = new Set(competitionsResponse.data.map(comp => comp.competition_id));  // Giả sử competition_id là key duy nhất
      setCompetitionCount(uniqueCompetitions.size);

      // Get all bets
      const betsResponse = await api.get('/api/KoiBet/GetAllBet');
      // Đếm số lượng bet_unique theo bet_id
      const uniqueBets = new Set(betsResponse.data.map(bet => bet.betId));  // Giả sử betId là key duy nhất
      setBetCount(uniqueBets.size);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Users" value={userCount} />
            {/* Use a dynamic percentage for progress */}
            <Progress type="circle" percent={Math.min(userCount, 100)} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Competitions" value={competitionCount} />
            {/* Use a dynamic percentage for progress */}
            <Progress type="circle" percent={Math.min(competitionCount, 100)} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Bets" value={betCount} />
            {/* Use a dynamic percentage for progress */}
            <Progress type="circle" percent={Math.min(betCount, 100)} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashBoard;
