import React from 'react';
import NewsContent from '../../components/NewsContent/NewsContent/NewsContent';
import { TrophyOutlined} from '@ant-design/icons';
// import './NewsPage.css'; // Import file CSS

function NewsPage() {
  return (
    <div className='news-page'> {/* Thêm class name cho page */}
      <div className='title-news'>
        <h2>
          <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
          News of Competition
        </h2>
      </div>
        <div className='news'>
          <NewsContent />
        </div>
    </div>
  );
}

export default NewsPage;
