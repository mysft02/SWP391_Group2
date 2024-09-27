import React from 'react';
import { Button, Card } from 'antd';
import { TrophyOutlined } from '@ant-design/icons'; // Import icon từ Ant Design
import './GuestCompetition.css';

function GuestCompetition() {
    
  // Dữ liệu giả lập cho cuộc thi
  const competitions = [
    {
      title: 'Cuộc thi lập trình 2024',
      start: '10/10/2024',
      end: '10/11/2024',
      imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain',
    },
    {
      title: 'Cuộc thi thiết kế đồ họa 2024',
      start: '15/10/2024',
      end: '15/11/2024',
      imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg',
    },
    {
        title: 'Cuộc thi thiết kế đồ họa 2024',
        start: '15/10/2024',
        end: '15/11/2024',
        imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg',
      },
      {
        title: 'Cuộc thi thiết kế đồ họa 2024',
        start: '15/10/2024',
        end: '15/11/2024',
        imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg',
      },
      {
        title: 'Cuộc thi thiết kế đồ họa 2024',
        start: '15/10/2024',
        end: '15/11/2024',
        imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg',
      },
      {
        title: 'Cuộc thi thiết kế đồ họa 2024',
        start: '15/10/2024',
        end: '15/11/2024',
        imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg',
      },
    // Bạn có thể thêm nhiều cuộc thi hơn tại đây
  ];

  return (
    <div className='news-competition'>
      <h2>
        <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
        News of Competition
      </h2>
      {competitions.map((competition, index) => (
        <Card key={index} style={{ marginBottom: '16px' }}>
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
      ))}
    </div>
  );
}

export default GuestCompetition;
