import React, { useState } from 'react';
import newsData from '../../../data/NewsContent.json';
import FilterNews from '../FilterNews/FilterNews';
import NewsContentDisplay from '../NewsContentDisplay/NewsContentDisplay'; // Component hiển thị news

function NewsContent() {
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAward, setSelectedAward] = useState('');

  // Hàm lọc news theo các bộ lọc đã chọn
  const filteredNews = newsData.news.filter((item) => {
    const rankMatch = selectedRank ? item.rank === selectedRank : true;
    const timeMatch = selectedTime ? item.created_at.includes(selectedTime) : true;
    const awardMatch = selectedAward ? item.award === selectedAward : true;
    return rankMatch && timeMatch && awardMatch;
  });

  return (
    <div style={{ display: 'flex' }}>
      {/* Component FilterNews */}
      <FilterNews
        selectedRank={selectedRank}
        setSelectedRank={setSelectedRank}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedAward={selectedAward}
        setSelectedAward={setSelectedAward}
      />
      
      {/* Hiển thị kết quả news sau khi lọc */}
      <NewsContentDisplay filteredNews={filteredNews} />
    </div>
  );
}

export default NewsContent;
