// CompetitionDisplay.js
import React from 'react';
import { Collapse, Col } from 'antd';
import { CheckCircleOutlined, FieldTimeOutlined, InfoCircleOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

function CompetitionDisplay({ competition }) {
  return (
    <Col span={12}>
      <img src={competition.competition_img} alt="Competition" style={{ width: '100%' }} />
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Thông tin cuộc thi" key="1">
          <p><strong><InfoCircleOutlined /> Detail:</strong> {competition?.competition_description || "Không có thông tin"}</p>
          <p><strong><TrophyOutlined /> Name Competition:</strong> {competition?.competition_name || "Không có thông tin"}</p>
          <p><strong><FieldTimeOutlined /> Rounds:</strong> {competition?.rounds || "Không có thông tin"}</p>
          <p><strong><CheckCircleOutlined /> Status:</strong> {competition?.status_competition || "Không có thông tin"}</p>
          <p><strong><UserOutlined /> Referee:</strong> {competition?.referee?.refereeName || "Không có thông tin"}</p>
          <p><strong><UserOutlined /> Experience:</strong> {competition?.referee?.expJudge || "Không có thông tin"}</p>
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
  );
}

export default CompetitionDisplay;
