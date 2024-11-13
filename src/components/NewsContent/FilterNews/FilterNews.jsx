import React, { useState, useEffect } from 'react';
import { api } from '../../../config/AxiosConfig';
import { Input, Select, Button } from 'antd';
import { CalendarOutlined, SearchOutlined, ClearOutlined, FilterOutlined } from '@ant-design/icons';  // Import icon
import './FilterNews.css';

function FilterNews({ selectedCategory, setSelectedCategory, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/KoiCategory/Get all KoiCategory');
        setCategories(response.data); // Assume response.data is an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to clear selected filters
  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedStartDate('');
    setSelectedEndDate('');
  };

  return (
    <div className="filter-container">
      <h3><FilterOutlined style={{marginRight:'5px'}}/>Filter News</h3>
      
      {/* Filter by Category */}
      <div className='form-filter'>
        <label>Category:</label>
        <Select
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          placeholder="Select Category"
          suffixIcon={<SearchOutlined />}  // Add Search icon
          style={{ width: '100%' }}
        >
          <Select.Option value="">All</Select.Option>
          {categories.map((category) => (
            <Select.Option key={category.category_id} value={category.category_name}>
              {category.category_name}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Filter by Start Date */}
      <div>
        <label>Start Date:</label>
        <Input
          type="date"
          value={selectedStartDate}
          onChange={(e) => setSelectedStartDate(e.target.value)}
          addonBefore={<CalendarOutlined />}  // Add Calendar icon
          style={{ width: '100%' }}
        />
      </div>

      {/* Filter by End Date */}
      <div>
        <label>End Date:</label>
        <Input
          type="date"
          value={selectedEndDate}
          onChange={(e) => setSelectedEndDate(e.target.value)}
          addonBefore={<CalendarOutlined />}  // Add Calendar icon
          style={{ width: '100%' }}
        />
      </div>

      {/* Clear Button */}
      <Button
          onClick={handleClearFilters}
          icon={<ClearOutlined />}  // Add Clear icon
          type="default"

        >
          Clear
        </Button>
    </div>
  );
}

export default FilterNews;
