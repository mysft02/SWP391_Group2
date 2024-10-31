import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Card, List, Row, Col, Divider, Table, Collapse } from 'antd';
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import { useLocation } from 'react-router-dom';
const { Option } = Select;
const { Panel } = Collapse;

function DetailCompetition() {
  const { user } = useUser();
  const [selectedKoi, setSelectedKoi] = useState('');
  const [koiList, setKoiList] = useState([]);
  const [addedKoiFish, setAddedKoiFish] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const { competition } = location.state || {};

  const pointsData = [
    { key: '1', criteria: 'Color', points: 20 },
    { key: '2', criteria: 'Pattern', points: 15 },
    { key: '3', criteria: 'Body Shape', points: 30 },
  ];

  const pointsColumns = [
    { title: 'Criteria', dataIndex: 'criteria', key: 'criteria' },
    { title: 'Points', dataIndex: 'points', key: 'points' },
  ];

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

    fetchKoiFish();
  }, [user]);

  const handleAddKoiFish = () => {
    if (selectedKoi) {
      setAddedKoiFish([...addedKoiFish, selectedKoi]);
      setSelectedKoi('');
    }
  };

  const handleSubmit = () => {
    console.log('User ID:', user?.user_id);
    console.log('Họ tên:', user?.full_name);
    console.log('Số điện thoại:', user?.phone);
    console.log('Email:', user?.email);
    console.log('Cuộc thi:', competition);
    console.log('Danh sách cá koi đã thêm:', addedKoiFish);
  };

  return (
    <Card title={`Name Competition: ${competition?.competition_name}`} style={{ maxWidth: 1500, margin: '20px auto' }}>
      <Row gutter={16}>
        <Col span={12}>
        <img src={competition.competition_img} alt="Competition"  style={{width:'100%'}}/>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Thông tin cuộc thi" key="1">
              <p><strong>Detail:</strong> {competition?.competition_description}</p>
              <p><strong>Name Competition:</strong> {competition?.competition_name || "Không có thông tin"}</p>
              <p><strong>Round:</strong> {competition?.rounds}</p>
              <p><strong>Status:</strong> {competition?.status_competition}</p>
              <p><strong>Referee:</strong> {competition?.referee.refereeName}</p>
              <p><strong>Experience:</strong> {competition?.referee.expJudge}</p>
            </Panel>
            <Panel header="Thông tin hạng mục" key="2">
              <p><strong>Category:</strong> {competition?.category.category_name}</p>
              <p><strong>Color:</strong> {competition?.category.koiStandard.color_koi}</p>
              <p><strong>Pattern:</strong> {competition?.category.koiStandard.pattern_koi}</p>
              <p><strong>Size:</strong> {competition?.category.koiStandard.size_koi}</p>
              <p><strong>Age:</strong> {competition?.category.koiStandard.age_koi}</p>
              <p><strong>Bodyshape:</strong> {competition?.category.koiStandard.bodyshape_koi}</p>
              <p><strong>Variety:</strong> {competition?.category.koiStandard.variety_koi}</p>
              <p><strong>Gender:</strong> {competition?.category.koiStandard.gender}</p>
            </Panel>
            <Panel header="Thông tin thời gian" key="3">
              <p><strong>Time Start:</strong> {competition?.start_time}</p>
              <p><strong>Time End:</strong> {competition?.end_time}</p>
            </Panel>
          </Collapse>
        </Col>

        <Col span={1}>
          <Divider type="vertical" style={{ height: '100%' , width:'20%'}} />
        </Col>

        <Col span={11}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Table columns={pointsColumns} dataSource={pointsData} pagination={false} style={{ marginBottom: '20px' }} />
          <Divider />

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
            <Form.Item label="score" required>
              <Input value={user?.score} disabled />
            </Form.Item>
          </Form>

          <Form layout="vertical">
            <Form.Item label="Chọn cá koi">
              <Select
                value={selectedKoi}
                onChange={(value) => setSelectedKoi(value)}
                placeholder="Chọn một cá koi"
                style={{ width: '100%' }}
              >
                {koiList.map((koi) => (
                  <Option key={koi.id} value={koi.name}>
                    {koi.koi_name}
                  </Option>
                ))}
              </Select>
              <Button type="primary" onClick={handleAddKoiFish} style={{ marginTop: '10px' }}>
                Thêm cá koi
              </Button>
            </Form.Item>

            {addedKoiFish.length > 0 && (
              <List
                header={<strong>Danh sách cá koi đã thêm</strong>}
                bordered
                dataSource={addedKoiFish}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                style={{ marginBottom: '20px' }}
              />
            )}

            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}

export default DetailCompetition;
