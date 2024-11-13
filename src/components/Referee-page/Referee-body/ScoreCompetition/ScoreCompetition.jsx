import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Card, Row, Col, Divider, Table, Collapse, message } from 'antd';
import { api } from '../../../../config/AxiosConfig';
import { useUser } from '../../../../data/UserContext';
import { useLocation } from 'react-router-dom';
import { CheckCircleOutlined, FieldTimeOutlined, InfoCircleOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Panel } = Collapse;

function ScoreCompetition() {
  const { user } = useUser();
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [matchId, setMatchId] = useState('');
  const [koiList, setKoiList] = useState([]);
  const [score, setScore] = useState('');
  const location = useLocation();
  const { competition } = location.state || {};

  // Fetch Competition Matches
  useEffect(() => {
    const fetchKoiFish = async () => {
      if (!user?.user_id) {
        setError('User ID không tồn tại.');
        return;
      }
      try {
        const payload = { user_id: user.user_id };
        const response = await api.post('/api/KoiFish/Get Koi Fish By User Id', payload);
        setKoiList(response.data);
        setError('');
      } catch (error) {
        setError('Không thể tải danh sách cá koi. Vui lòng thử lại sau.');
      }
    };
    const fetchCompetitionMatches = async () => {
      try {
        const response = await api.get(`/api/CompetitionMatch/Get Competition By CompeId?competitionMatchId=${competition.competition_id}`);
        console.log('Competition Matches:', response.data);
        setMatches(response.data);
      } catch (error) {
        setError('Không thể tải danh sách các trận đấu.');
      }
    };
    fetchKoiFish();
    fetchCompetitionMatches();
  }, [user]);

  // Handle Match selection
  const handleMatchSelect = (value) => {
    console.log('Selected Match ID:', value);
    setMatchId(value);
    setSelectedKoi(null);
    setScore('');
  };

  // Handle score change
  const handleScoreChange = (e) => {
    setScore(e.target.value);
    console.log('Score Input:', e.target.value);
  };

  // Submit Score
  const submitScore = async () => {
    if (!selectedKoi || !matchId || score === '') {
      message.error('Vui lòng chọn cá koi, trận đấu và nhập điểm.');
      return;
    }

    const payload = {
      koiId: selectedKoi.koi_id,
      matchId: matchId,
      score: parseInt(score, 10),
    };
    console.log('Score Payload:', payload);

    try {
      await api.post('/api/KoiScore/Create KoiScore', payload, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      message.success('Chấm điểm thành công!');
      resetForm();
    } catch (error) {
      message.error('Không thể chấm điểm. Vui lòng thử lại.');
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setScore('');
    setMatchId('');
    setSelectedKoi(null);
  };

  // Define match columns for the table
  const matchColumns = [
    { title: 'Match ID', dataIndex: 'match_id', key: 'match_id' },
    {
      title: 'Koi Name 1',
      dataIndex: 'firstKoi',
      key: 'firstKoi.koi_name',
      render: (firstKoi) => firstKoi ? firstKoi.koi_name : 'Không có thông tin',
    },
    {
      title: 'Koi Name 2',
      dataIndex: 'secondKoi',
      key: 'secondKoi.koi_name',
      render: (secondKoi) => secondKoi ? secondKoi.koi_name : 'Không có thông tin',
    },
    {
      title: 'Result',
      key: 'result',
      render: (_, record) => {
        // Split result into Koi ID and Score
        const [koiName, score] = record.result.split('_');
        /*const koi = koiList.find(koi => koi.koi_id === koiId);*/
      
        return (
          <>
            <p><strong>Koi Name:</strong> {koiName || 'Không có thông tin'}</p>
            <p><strong>Score:</strong> {score || 'Chưa có điểm'}</p>
          </>
        );
      },
    },
  ];

  return (
    <Card title={`Name Competition: ${competition?.competition_name}`} style={{ maxWidth: 1500, margin: '20px auto' }}>
      <Row gutter={16}>
        <Col span={12}>
          <img src={competition.competition_img} alt="Competition" style={{ width: '100%' }} />
          <Collapse defaultActiveKey={['1']}>
          <Panel header="Thông tin cuộc thi" key="1">
              <p><strong><InfoCircleOutlined /> Detail:</strong> {competition?.competition_description}</p>
              <p><strong><TrophyOutlined /> Name Competition:</strong> {competition?.competition_name || "Không có thông tin"}</p>
              <p><strong><FieldTimeOutlined /> Round:</strong> {competition?.rounds}</p>
              <p><strong><CheckCircleOutlined /> Status:</strong> {competition?.status_competition}</p>
              <p><strong><UserOutlined /> Referee:</strong> {competition?.referee?.refereeName}</p>
              <p><strong><UserOutlined /> Experience:</strong> {competition?.referee?.expJudge}</p>
            </Panel>
            <Panel header="Đặc tính của Koi" key="2">
              <p><strong><InfoCircleOutlined /> Category:</strong> {competition?.category?.category_name || "Không có thông tin"}</p>
              <p><strong><TrophyOutlined /> Color:</strong> {competition?.category?.koiStandard?.color_koi || "Không có thông tin"}</p>
              <p><strong><FieldTimeOutlined /> Size:</strong> {competition?.category?.koiStandard?.size_koi || "Không có thông tin"}</p>
              <p><strong><FieldTimeOutlined /> Age:</strong> {competition?.category?.koiStandard?.age_koi || "Không có thông tin"}</p>
              <p><strong><FieldTimeOutlined /> Body Shape:</strong> {competition?.category?.koiStandard?.bodyshape_koi || "Không có thông tin"}</p>
              <p><strong><FieldTimeOutlined /> Variety:</strong> {competition?.category?.koiStandard?.variety_koi || "Không có thông tin"}</p>
            </Panel>
            <Panel header="Giải thưởng" key="3">
              <p><strong><TrophyOutlined /> Award:</strong> {competition?.award?.award_name || "Không có thông tin"}</p>
              <p><strong><FieldTimeOutlined /> Quantity:</strong> {competition?.award?.quantity || "Không có thông tin"}</p>
            </Panel>
          </Collapse>
        </Col>

        <Col span={1}>
          <Divider type="vertical" style={{ height: '100%', width: '20%' }} />
        </Col>

        <Col span={11}>
          <Table
            columns={matchColumns}
            dataSource={matches}
            pagination={false}
            style={{ marginTop: '20px' }}
            title={() => <strong>Bảng thi đấu</strong>}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form layout="vertical" style={{ marginTop: '20px' }}>
            <Form.Item label="Chọn trận đấu">
              <Select
                value={matchId || undefined}
                onChange={handleMatchSelect}
                placeholder="Chọn một trận đấu"
                style={{ width: '100%' }}
              >
                {matches.map((match) => (
                  <Option key={match.match_id} value={match.match_id}>
                    {`Match ID: ${match.match_id}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Chọn cá koi">
  <Select
    value={selectedKoi?.koi_id || undefined}
    onChange={(value) => setSelectedKoi(
      matches.flatMap(match => [match.firstKoi, match.secondKoi])
      .find(koi => koi?.koi_id === value)
    )}
    placeholder="Chọn một cá koi"
    style={{ width: '100%' }}
    disabled={!matchId}
  >
    {[...new Map(
      matches
        .filter(match => match.match_id === matchId)
        .flatMap(match => [match.firstKoi, match.secondKoi])
        .map(koi => [koi.koi_id, koi])
    ).values()].map((koi) => (
      <Option key={`unique-${koi.koi_id}`} value={koi.koi_id}>
        {koi.koi_name}
      </Option>
    ))}
  </Select>
</Form.Item>


            <Form.Item label="Điểm">
              <Input
                type="number"
                value={score}
                onChange={handleScoreChange}
                placeholder="Nhập điểm cho cá koi"
              />
            </Form.Item>

            <Button type="primary" onClick={submitScore}>
              Chấm điểm
            </Button>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}

export default ScoreCompetition;
