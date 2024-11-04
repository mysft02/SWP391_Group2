import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Card, List, Row, Col, Divider, Table, Collapse } from 'antd';
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import { useLocation } from 'react-router-dom';

const { Option } = Select;
const { Panel } = Collapse;

function DetailCompetition() {
  const { user } = useUser();
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [koiList, setKoiList] = useState([]);
  const [addedKoiFish, setAddedKoiFish] = useState([]);
  const [error, setError] = useState('');
  const [rounds, setRounds] = useState([]);
  const [matches, setMatches] = useState([]);
  const location = useLocation();
  const { competition } = location.state || {};

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

    const fetchCompetitionRounds = async () => {
      try {
        const response = await api.get('/api/CompetitionRound/Get All CompetitionRound');
        setRounds(response.data);
        const allMatches = response.data.flatMap(round => round.matches || []);
        setMatches(allMatches);
      } catch (error) {
        setError('Không thể tải danh sách các vòng thi đấu.');
      }
    };

    fetchKoiFish();
    fetchCompetitionRounds();
  }, [user]);


  const handleKoiSelect = (value) => {
    const selectedFish = koiList.find(koi => koi.id === value);
    setSelectedKoi(selectedFish);
  };


  const matchColumns = [
    { title: 'Match ID', dataIndex: 'match_id', key: 'match_id' },
    { title: 'Koi 1 ID', dataIndex: 'first_koiId1', key: 'first_koiId1' },
    { title: 'Koi 2 ID', dataIndex: 'first_koiId2', key: 'first_koiId2' },
    { title: 'Result', dataIndex: 'result', key: 'result' },
  ];

  return (
    <Card title={`Name Competition: ${competition?.competition_name}`} style={{ maxWidth: 1500, margin: '20px auto' }}>
      <Row gutter={16}>
        <Col span={12}>
          <img src={competition.competition_img} alt="Competition" style={{ width: '100%' }} />
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Thông tin cuộc thi" key="1">
              <p><strong>Detail:</strong> {competition?.competition_description}</p>
              <p><strong>Name Competition:</strong> {competition?.competition_name || "Không có thông tin"}</p>
              <p><strong>Round:</strong> {competition?.rounds}</p>
              <p><strong>Status:</strong> {competition?.status_competition}</p>
              <p><strong>Referee:</strong> {competition?.referee?.refereeName}</p>
              <p><strong>Experience:</strong> {competition?.referee?.expJudge}</p>
            </Panel>
            <Panel header="Danh sách các vòng thi đấu" key="2">
              {rounds.length > 0 ? (
                rounds.map((round) => (
                  <p key={round.roundId}>
                    <strong>Round ID:</strong> {round.roundId} | 
                    <strong>Match:</strong> {round.match} | 
                    <strong>Competition ID:</strong> {round.competitionId}
                  </p>
                ))
              ) : (
                <p>Không có thông tin về vòng thi đấu.</p>
              )}
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
              
          <Form layout="vertical" style={{ marginBottom: '20px' }}>
            <Form.Item label="Họ và tên" required>
              <Input value={user?.full_name} disabled />
            </Form.Item>
            <Form.Item label="Số điện thoại" required>
              <Input value={user?.phone} disabled />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input value={user?.email} disabled />
            </Form.Item>
          </Form>

          <Form layout="vertical">
          <Form layout="vertical">
              <Form.Item label="Chọn cá koi">
                <Select
                  value={selectedKoi?.koi_id || undefined} // Đảm bảo koi_id là duy nhất
                  onChange={handleKoiSelect}
                  placeholder="Chọn một cá koi"
                  style={{ width: '100%' }}
                >
                  {koiList.map((koi) => (
                    <Option key={koi.koi_id} value={koi.koi_id}> {/* Sử dụng koi_id cho cả key và value */}
                      {koi.koi_name} (Điểm: {koi.score})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>


            {addedKoiFish.length > 0 && (
              <List
                header={<strong>Danh sách cá koi đã thêm</strong>}
                bordered
                dataSource={addedKoiFish.map(fish => `${fish.koi_name} (Điểm: ${fish.score})`)}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                style={{ marginBottom: '20px' }}
              />
            )}

          </Form>
        </Col>
      </Row>
    </Card>
  );
}

export default DetailCompetition;
