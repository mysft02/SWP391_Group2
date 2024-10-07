import React, { useState } from 'react';
import { Button, Card, Row, Col, Pagination, Menu } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import './NewsContent.css'
function NewsContent() {
  const competitions = [
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', category: 'programming', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
    { title: 'Cuộc thi thiết kế đồ họa 2024', start: '15/10/2024', end: '15/11/2024', category: 'design', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi ẩm thực 2024', start: '20/10/2024', end: '20/11/2024', category: 'cooking', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', category: 'programming', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
    { title: 'Cuộc thi thiết kế đồ họa 2024', start: '15/10/2024', end: '15/11/2024', category: 'design', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi ẩm thực 2024', start: '20/10/2024', end: '20/11/2024', category: 'cooking', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi lập trình 2024', start: '10/10/2024', end: '10/11/2024', category: 'programming', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
    { title: 'Cuộc thi thiết kế đồ họa 2024', start: '15/10/2024', end: '15/11/2024', category: 'design', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    { title: 'Cuộc thi ẩm thực 2024', start: '20/10/2024', end: '20/11/2024', category: 'cooking', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
    // Thêm nhiều cuộc thi khác ở đây...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const pageSize = 5;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredCompetitions = competitions.filter(competition => {
    if (filter === 'all') return true;
    return competition.category === filter;
  });

  const currentCompetitions = filteredCompetitions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    setFilter(e.key);
    setCurrentPage(1);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Cột bên trái dành cho Menu */}
      <div style={{ width: '250px', borderRight: '1px solid #FFD700' }}>
        <Menu
          className="competition-menu"
          defaultSelectedKeys={['all']}
          mode="inline"
          onClick={handleFilterChange}
          style={{ height: '100%', borderRight: '1px solid #FFD700' }}
        >
          <Menu.Item key="all">Tất cả</Menu.Item>
          <Menu.Item key="programming">Cuộc thi lập trình</Menu.Item>
          <Menu.Item key="design">Thiết kế đồ họa</Menu.Item>
          <Menu.Item key="cooking">Cuộc thi ẩm thực</Menu.Item>
        </Menu>
      </div>

      {/* Đường kẻ phân chia */}
      <div style={{ width: '1px', backgroundColor: '#FFD700' }} />

      {/* Cột bên phải dành cho nội dung cuộc thi */}
      <div style={{ flexGrow: 1, paddingLeft: '10px' }}>
        <div className='news-competition'>
            <Row gutter={[8, 8]} justify="start">
                {currentCompetitions.map((competition, index) => (
                    <Col className='custome-col' key={index} xs={24} sm={12} md={8}>
                    <Card className='competition-card'>
                        <div className='news-content'>
                        <div className='news-info'>
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
            total={filteredCompetitions.length}
            onChange={handlePageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </div>
      </div>
    </div>
  );
}

export default NewsContent;
