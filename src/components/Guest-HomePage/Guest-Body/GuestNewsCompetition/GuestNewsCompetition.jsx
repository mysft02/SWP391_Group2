import React, { useState } from 'react';
import { Button, Card, Row, Col, Pagination } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import './GuestNewsCompetition.css';

function GuestNewsCompetition() {
  // Dữ liệu giả lập cho cuộc thi
  const competitions = [
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
    { title: 'Cuộc thi thiết kế đồ họa 2024', start: '15/10/2024', end: '15/11/2024', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi ẩm thực 2024', start: '20/10/2024', end: '20/11/2024', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
    { title: 'Cuộc thi thiết kế đồ họa 2024', start: '15/10/2024', end: '15/11/2024', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
   
    // Thêm nhiều cuộc thi khác ở đây...
  ];

  // State để điều khiển phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Số lượng card hiển thị mỗi trang

  // Tính toán vị trí của các card hiển thị trong trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCompetitions = competitions.slice(startIndex, endIndex);

  // Hàm xử lý sự kiện phân trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='news-competition'>
      <h2>
        <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
        News of Competition
      </h2>

      <Row gutter={[16, 16]} justify="center">
        {currentCompetitions.map((competition, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card className='competition-card'>
              <div className='news-content'>
                <div className='info'>
                  <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
                  <h3>{competition.title}</h3>
                  <p>Time Start: {competition.start}</p>
                  <p>Time End: {competition.end}</p>
                </div>
                <img alt="Competition" src={competition.imageUrl} className='competition-image' />
              </div>
              <Button className='view-button'>View</Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        className='news-pagination'
        current={currentPage}
        pageSize={pageSize}
        total={competitions.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
}

export default GuestNewsCompetition;
