import React, { useState } from "react";
import { Select, Button, Form } from "antd";
import { FilterOutlined, TagsOutlined, BgColorsOutlined, PictureOutlined, 
         LineHeightOutlined, ColumnWidthOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons";

const { Option } = Select;

function FilterCompetitions({ competitions, onFilter }) {
  const [filters, setFilters] = useState({
    category_name: "",
    color_koi: "",
    pattern_koi: "",
    size_koi: "",
    bodyshape_koi: "",
    variety_koi: "",
    gender: ""
  });

  // Thay đổi bộ lọc
  const handleFilterChange = (value, name) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Áp dụng bộ lọc
  const handleApplyFilter = () => {
    const filteredCompetitions = competitions.filter((comp) =>
      Object.keys(filters).every((key) => {
        return filters[key] === "" || comp[key]?.toString().includes(filters[key]);
      })
    );
    onFilter(filteredCompetitions);
  };

  return (
    <div style={{ width: "250px", padding: "20px", backgroundColor: "none", height: "120vh" }}>
      <h3><FilterOutlined /> Filter Competitions</h3>

      <Form layout="vertical">
      <Form.Item label={<span style={{ color: '#FFD700' }}><TagsOutlined /> Category</span>}>
          <Select
            placeholder="Select Category"
            value={filters.category_name}
            onChange={(value) => handleFilterChange(value, "category_name")}
          >
            <Option value="">All</Option>
            <Option value="A">Category A</Option>
            <Option value="B">Category B</Option>
            <Option value="C">Category C</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><BgColorsOutlined /> Color Koi</span>}>
          <Select
            placeholder="Select Color"
            value={filters.color_koi}
            onChange={(value) => handleFilterChange(value, "color_koi")}
          >
            <Option value="">All</Option>
            <Option value="Red">Red</Option>
            <Option value="Blue">Blue</Option>
            <Option value="Yellow">Yellow</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><PictureOutlined /> Pattern Koi</span>}>
          <Select
            placeholder="Select Pattern"
            value={filters.pattern_koi}
            onChange={(value) => handleFilterChange(value, "pattern_koi")}
          >
            <Option value="">All</Option>
            <Option value="Pattern1">Pattern 1</Option>
            <Option value="Pattern2">Pattern 2</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><ColumnWidthOutlined /> Size Koi</span>}>
          <Select
            placeholder="Select Size"
            value={filters.size_koi}
            onChange={(value) => handleFilterChange(value, "size_koi")}
          >
            <Option value="">All</Option>
            <Option value="Small">Small</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Large">Large</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><LineHeightOutlined /> Bodyshape Koi</span>}>
          <Select
            placeholder="Select Bodyshape"
            value={filters.bodyshape_koi}
            onChange={(value) => handleFilterChange(value, "bodyshape_koi")}
          >
            <Option value="">All</Option>
            <Option value="Oval">Oval</Option>
            <Option value="Round">Round</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><PictureOutlined /> Variety Koi</span>}>
          <Select
            placeholder="Select Variety"
            value={filters.variety_koi}
            onChange={(value) => handleFilterChange(value, "variety_koi")}
          >
            <Option value="">All</Option>
            <Option value="Variety1">Variety 1</Option>
            <Option value="Variety2">Variety 2</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}>{filters.gender === "Male" ? <ManOutlined /> : <WomanOutlined />} Gender</span>}>
          <Select
            placeholder="Select Gender"
            value={filters.gender}
            onChange={(value) => handleFilterChange(value, "gender")}
          >
            <Option value="">All</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>

        <Button type="primary" onClick={handleApplyFilter}>
          Apply Filter
        </Button>
      </Form>
    </div>
  );
}

export default FilterCompetitions;
