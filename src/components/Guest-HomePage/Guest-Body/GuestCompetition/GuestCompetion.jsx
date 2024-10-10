import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'antd';
import { TrophyOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './GuestCompetition.css';

function GuestCompetition() {
  // Dữ liệu giả lập cho cuộc thi
  const competitions = [
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
    { title: 'Cuộc thi thiết kế đồ họa 2024', start: '15/10/2024', end: '15/11/2024', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi ẩm thực 2024', start: '20/10/2024', end: '20/11/2024', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
  ];

  // State để điều khiển vị trí card đang hiển thị
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 3; // Số lượng card hiển thị mỗi trang

  // Tính toán các card hiện tại
  const currentCompetitions = competitions.slice(currentIndex, currentIndex + pageSize);

  // Hàm xử lý di chuyển card
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + pageSize < competitions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className='Guest-Competition'>
      <Button 
        className='nav-button prev-button'
        onClick={handlePrevClick}
        icon={<LeftOutlined />}
        disabled={currentIndex === 0} // Vô hiệu hóa khi đang ở trang đầu
      >
        Previous
      </Button>

      <Row gutter={[16, 16]} justify="center">
        {currentCompetitions.map((competition, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card className='competition-card'>
              <div className='competition-content'>
                <div className='competition-info'>
                  <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
                  <h3>{competition.title}</h3>
                  <p>Thời gian bắt đầu: {competition.start}</p>
                  <p>Thời gian kết thúc: {competition.end}</p>
                </div>
                <img alt="Competition" src={competition.imageUrl} className='competition-image' />
              </div>
              <Button className='view-button'>Join in </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Button 
        className='nav-button next-button'
        onClick={handleNextClick}
        icon={<RightOutlined />}
        disabled={currentIndex + pageSize >= competitions.length} // Vô hiệu hóa khi đang ở trang cuối
      >
        Next
      </Button>
    </div>
  );
}

export default GuestCompetition;
