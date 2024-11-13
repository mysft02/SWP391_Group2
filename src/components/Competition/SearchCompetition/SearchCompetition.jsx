import React, { useState } from 'react';
import { Input, Typography } from 'antd';
import './SearchCompetition.css'
import { TrophyOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Title } = Typography;

function SearchCompetition({ competitions, onFilter }) {
  const [searchText, setSearchText] = useState(''); // Nội dung tìm kiếm

  // Hàm lọc cuộc thi theo tên
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = competitions.filter(comp =>
      comp.competition_name.toLowerCase().includes(value.toLowerCase())
    );
    onFilter(filtered); // Gửi lại danh sách đã lọc cho component cha
  };

  return (
    <div className="search-container">
        <h2>
        <TrophyOutlined style={{ fontSize: '24px', color: '#FFD700',marginTop:'20px'}} />
              Competition
        </h2>
      <Search
        placeholder="Search by competition name"
        enterButton="Search"
        size="large"
        value={searchText}
        onSearch={handleSearch} // Lọc khi nhấn search
        onChange={(e) => handleSearch(e.target.value)} // Lọc khi thay đổi văn bản tìm kiếm
      />
    </div>
  );
}

export default SearchCompetition;
