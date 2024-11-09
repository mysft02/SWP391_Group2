import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Card, List, Row, Col, Divider, Table, Collapse, Modal } from 'antd';
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import { useLocation } from 'react-router-dom';

const { Option } = Select;
const { Panel } = Collapse;

function BetCompetition() {
  const { user } = useUser();
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [koiList, setKoiList] = useState([]);
  const [error, setError] = useState('');
  const [rounds, setRounds] = useState([]);
  const [matches, setMatches] = useState([]);
  const [koiScoreDetails, setKoiScoreDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  
    const fetchCompetitionMatches = async () => {
      try {
        const response = await api.get('/api/CompetitionMatch/Get Competition By CompeId?competitionMatchId=${');
        setMatches(response.data);
      } catch (error) {
        setError('Không thể tải danh sách các trận đấu.');
      }
    };
  
    fetchKoiFish();
    fetchCompetitionRounds();
    fetchCompetitionMatches();
  }, [user]);
  

  const handleKoiSelect = (value) => {
    const selectedFish = koiList.find(koi => koi.koi_id === value);
    setSelectedKoi(selectedFish);
  };

  const fetchKoiScoreDetails = async () => {
    if (!selectedKoi) return;
  
    try {
      const response = await api.get(`/api/KoiScore/Get KoiScore By KoiId?koiId=${selectedKoi.koi_id}`);
      setKoiScoreDetails(response.data);
      setIsModalVisible(true);
    } catch (error) {
      setKoiScoreDetails(null);  // Nếu có lỗi, clear dữ liệu trong modal
      setError('Không thể tải thông tin điểm cá koi. Vui lòng thử lại sau.');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setKoiScoreDetails(null);
  };

  const matchColumns = [
    { title: 'Match ID', dataIndex: 'match_id', key: 'match_id' },
    { 
      title: 'Koi Name 1', 
      dataIndex: 'firstKoi', 
      key: 'firstKoi.koi_name',
      render: (firstKoi) => firstKoi ? firstKoi.koi_name : null,
    },
    { 
      title: 'Koi Name 2', 
      dataIndex: 'secondKoi', 
      key: 'secondKoi.koi_name',
      render: (secondKoi) => secondKoi ? secondKoi.koi_name : null,
    },
    { title: 'Result', dataIndex: 'result', key: 'result' },
    { 
      title: 'Scores', 
      dataIndex: 'scores', 
      key: 'scores',
      render: (scores) => scores ? scores : 'Điểm chưa có',
    },
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
                    <strong>Competition ID:</strong> {round.competition_id}
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
            <Form.Item label="Chọn cá koi">
              <Select
                value={selectedKoi?.koi_id || undefined}
                onChange={handleKoiSelect}
                placeholder="Chọn một cá koi"
                style={{ width: '100%' }}
              >
                {koiList.map((koi) => (
                  <Option key={koi.koi_id} value={koi.koi_id}>
                    {koi.koi_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Button
              type="primary"
              onClick={fetchKoiScoreDetails}
              disabled={!selectedKoi}
              style={{ marginTop: '10px' }}
            >
              Xem điểm cá koi
            </Button>
          </Form>
          
          <Modal
      title="Thông tin điểm cá koi"
      open={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    >
      {koiScoreDetails && koiScoreDetails.length > 0 ? (
        koiScoreDetails.map((detail) => (
          <div key={detail.score_id}>
            <h2><strong>Tên cá koi:</strong> {detail?.fishKoi?.koi_name || 'Không có thông tin'}</h2>
            <p><strong>Loại cá:</strong> {detail?.fishKoi?.koi_variety || 'Không có thông tin'}</p>
            <p><strong>Kích thước:</strong> {detail?.fishKoi?.koi_size || 'Không có thông tin'}</p>
            <p><strong>Tuổi:</strong> {detail?.fishKoi?.koi_age || 'Không có thông tin'}</p>
            <p><strong>Mã trận đấu:</strong> {detail?.match_id || 'Không có thông tin'}</p>
            <h2><strong>Điểm:</strong> {detail?.score_koi || 'Không có thông tin'}</h2>
          </div>
        ))
      ) : (
        <p>Không có thông tin điểm.</p> // Fallback message when koiScoreDetails is empty or null
      )}
    </Modal>

        </Col>
      </Row>
    </Card>
  );
}

export default BetCompetition;
