import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Card, Row, Col, Divider, Table, Collapse, Modal } from 'antd';
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import { useLocation } from 'react-router-dom';
import { UserOutlined, PhoneOutlined, MailOutlined, TrophyOutlined, InfoCircleOutlined, FieldTimeOutlined, CheckCircleOutlined } from '@ant-design/icons'; // import necessary icons

const { Option } = Select;
const { Panel } = Collapse;

function DetailCompetition() {
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

  // Fetch koi fish list and competition details
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
        setMatches(response.data);
      } catch (error) {
        setError('Không thể tải danh sách các trận đấu.');
      }
    };

    fetchKoiFish();
    fetchCompetitionMatches();
  }, [user, competition]);

  // Handle koi selection
  const handleKoiSelect = (value) => {
    const selectedFish = koiList.find(koi => koi.koi_id === value);
    setSelectedKoi(selectedFish);
  };

  // Fetch koi score details
  const fetchKoiScoreDetails = async () => {
    if (!selectedKoi) return;
    
    try {
      const response = await api.get(`/api/KoiScore/Get KoiScore By KoiId And CompeId?koiId=${selectedKoi.koi_id}&competitionId=${competition.competition_id}`);
      setKoiScoreDetails(response.data);
      setIsModalVisible(true);
    } catch (error) {
      setKoiScoreDetails(null);
      setError('Không thể tải thông tin điểm cá koi. Vui lòng thử lại sau.');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setKoiScoreDetails(null);
  };

  // Match table columns
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
    <Card title={`Name Competition: ${competition?.competition_name}`} style={{ maxWidth: 1500 }}>
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
            title={() => <strong><TrophyOutlined /> Bảng thi đấu</strong>}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form layout="vertical" style={{ marginBottom: '20px' }}>
            <Form.Item label={<><UserOutlined /> Họ và tên</>} required>
              <Input value={user?.full_name} disabled />
            </Form.Item>
            <Form.Item label={<><PhoneOutlined /> Số điện thoại</>} required>
              <Input value={user?.phone} disabled />
            </Form.Item>
            <Form.Item label={<><MailOutlined /> Email</>} required>
              <Input value={user?.email} disabled />
            </Form.Item>
          </Form>

          <Form layout="vertical">
            <Form.Item label={<> Chọn cá koi</>} >
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
              <CheckCircleOutlined /> Xem điểm cá koi
            </Button>
          </Form>

          <Modal
            title={<> Thông tin điểm cá koi</>}
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
          >
            {koiScoreDetails && koiScoreDetails.length > 0 ? (
              koiScoreDetails.map((detail) => (
                <div key={detail.score_id}>
                  <h2><strong>Tên cá koi:</strong> {detail?.fishKoi?.koi_name || 'Không có thông tin'}</h2>
                  <p><strong> Loại cá:</strong> {detail?.fishKoi?.koi_variety || 'Không có thông tin'}</p>
                  <p><strong><FieldTimeOutlined /> Kích cỡ:</strong> {detail?.fishKoi?.koi_size || 'Không có thông tin'}</p>
                  <p><strong><CheckCircleOutlined /> Điểm tổng:</strong> {detail?.score_koi || 'Chưa có điểm'}</p>
                </div>
              ))
            ) : (
              <p>Không có thông tin về điểm cá koi.</p>
            )}
          </Modal>
        </Col>
      </Row>
    </Card>
  );
}

export default DetailCompetition;
