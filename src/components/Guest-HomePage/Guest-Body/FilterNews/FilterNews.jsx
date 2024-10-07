// FilterNews.js
import React, { useState } from 'react';
import { Select, DatePicker, Button } from 'antd';
import './FilterNews.css'; // Import file CSS để áp dụng kiểu dáng

const { Option } = Select;

function FilterNews({ onFilterChange }) {
  const [category, setCategory] = useState('all');
  const [date, setDate] = useState(null);

  const handleFilter = () => {
    onFilterChange({ category, date });
  };

  return (
    <div className="filter-news">
      <h2>Bộ Lọc Tin Tức</h2>
      <div className="form-group">
        <label htmlFor="category">Thể loại:</label>
        <Select
          id="category"
          value={category}
          onChange={(value) => setCategory(value)}
          style={{ width: '100%' }}
        >
          <Option value="all">Tất cả</Option>
          <Option value="breaking">Tin nóng</Option>
          <Option value="latest">Tin mới nhất</Option>
          <Option value="sports">Thể thao</Option>
          <Option value="technology">Công nghệ</Option>
          <Option value="health">Sức khỏe</Option>
        </Select>
      </div>
      <div className="form-group">
        <label htmlFor="date">Ngày:</label>
        <DatePicker
          id="date"
          value={date}
          onChange={(date) => setDate(date)}
          style={{ width: '100%' }}
        />
      </div>
      <div className="form-group">
        <Button type="primary" onClick={handleFilter} style={{ width: '100%' }}>
          Lọc
        </Button>
      </div>
    </div>
  );
}

export default FilterNews;
