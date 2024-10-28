import React, { useState, useEffect } from 'react';
import { api } from '../../../config/AxiosConfig';
import FilterNews from '../FilterNews/FilterNews';
import NewsContentDisplay from '../NewsContentDisplay/NewsContentDisplay'; // Component hiển thị news

function NewsContent() {
  const [newsData, setNewsData] = useState([]);
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAward, setSelectedAward] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await api.get('/api/CompetitionKoi/Get all CompetitionKoi');
        setNewsData(response.data); // Giả sử response.data là mảng chứa các item tin tức
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Hàm lọc news theo các bộ lọc đã chọn
  const filteredNews = newsData.filter((item) => {
    const rankMatch = selectedRank ? item.rank === selectedRank : true;
    const timeMatch = selectedTime ? item.created_at.includes(selectedTime) : true;
    const awardMatch = selectedAward ? item.award === selectedAward : true;
    return rankMatch && timeMatch && awardMatch;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
