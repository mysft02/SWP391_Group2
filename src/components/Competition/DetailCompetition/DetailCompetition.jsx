import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Card, List, Row, Col, Divider } from 'antd';
import { api } from '../../../config/AxiosConfig';
import { useUser } from '../../../data/UserContext';
import { useLocation } from 'react-router-dom';
const { Option } = Select;

function DetailCompetition() {
  const { user } = useUser();
  const [selectedKoi, setSelectedKoi] = useState('');
  const [koiList, setKoiList] = useState([]);
  const [addedKoiFish, setAddedKoiFish] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const { competition } = location.state || {};

  useEffect(() => {
    if (competition) {
      console.log("Competition data in DetailCompetition:", competition);
    } else {
      console.error("No competition data received.");
    }
  }, [competition]);

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
        console.error('Lỗi khi lấy danh sách cá koi:', error);
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
    <Card title={`Name Competition: ${competition?.competitionName}`} style={{ maxWidth: 1500, minHeight:1300,margin: '20px auto' }}>
      <Row gutter={16}>
        {/* Thông tin cuộc thi bên trái */}
        <Col span={12}>
          <p><strong>Detail:</strong> {competition?.competitionDescription}</p>
          <p><strong>Name Competition:</strong> {competition?.competitionName || "Không có thông tin"}</p>
          <p><strong>Round:</strong> {competition?.round}</p>
          <p><strong>Category:</strong> {competition?.koiCategory.category_name}</p>
          <p><strong>Color:</strong> {competition?.koiCategory.standard.color_koi}</p>
          <p><strong>Pattern:</strong> {competition?.koiCategory.standard.pattern_koi}</p>
          <p><strong>Size:</strong> {competition?.koiCategory.standard.size_koi}</p>
          <p><strong>Age:</strong> {competition?.koiCategory.standard.age_koi}</p>
          <p><strong>Bodyshape:</strong> {competition?.koiCategory.standard.bodyshape_koi}</p>
          <p><strong>Variety:</strong> {competition?.koiCategory.standard.variety_koi}</p>
          <p><strong>Gender:</strong> {competition?.koiCategory.standard.gender}</p>
          <p><strong>Time Start:</strong> {competition?.startTime}</p>
          <p><strong>Time End:</strong> {competition?.endTime}</p>
          <p><strong>Status:</strong> {competition?.statusCompetition}</p>
          
          <p><strong>Referee:</strong> {competition?.referee.refereeName}</p>
          <p><strong>Referee:</strong> {competition?.referee.expJudge}</p>

          

          <img src = {competition.competitionImg}/>
          




        </Col>

        {/* Đường kẻ giữa */}
        <Col span={1}>
          <Divider type="vertical" style={{ height: '150%' , }} />
        </Col>

        {/* Form thông tin người dùng và chọn cá koi bên phải */}
        <Col span={11}>
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
