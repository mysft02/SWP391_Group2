import React, { useState, useEffect } from 'react';
import { api } from '../../../config/AxiosConfig';
import FilterNews from '../FilterNews/FilterNews';
import NewsContentDisplay from '../NewsContentDisplay/NewsContentDisplay';

function NewsContent() {
  const [newsData, setNewsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await api.get('/api/CompetitionKoi/Get all CompetitionKoi');
        setNewsData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Lọc dữ liệu theo category và thời gian
  const filteredNews = newsData.filter((item) => {
    const categoryMatch = selectedCategory ? item.category.category_name === selectedCategory : true;

    const startDate = new Date(item.start_time); // Chuyển start_time của item thành đối tượng Date
    const endDate = new Date(item.end_time); // Chuyển end_time của item thành đối tượng Date

    // Kiểm tra nếu có chọn start date
    const startDateMatch = selectedStartDate ? startDate >= new Date(selectedStartDate) : true;

    // Kiểm tra nếu có chọn end date
    const endDateMatch = selectedEndDate ? endDate <= new Date(selectedEndDate) : true;

    return categoryMatch && startDateMatch && endDateMatch;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ display: 'flex' }}>
      <FilterNews
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStartDate={selectedStartDate}
        setSelectedStartDate={setSelectedStartDate}
        selectedEndDate={selectedEndDate}
        setSelectedEndDate={setSelectedEndDate}
      />
      <NewsContentDisplay filteredNews={filteredNews} />
    </div>
  );
}

export default NewsContent;
