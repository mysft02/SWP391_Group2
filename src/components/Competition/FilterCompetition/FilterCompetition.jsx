import React, { useEffect, useState } from "react";
import { Select, Button, Form } from "antd";
import { FilterOutlined, TagsOutlined, BgColorsOutlined, PictureOutlined, 
         LineHeightOutlined, ColumnWidthOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons";
import { api } from "../../../config/AxiosConfig"; 

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

  const [categories, setCategories] = useState([]);
  const [standards, setStandards] = useState({
    colors: [],
    patterns: [],
    sizes: [],          // Thêm trường sizes
    bodyshapes: [],    // Thêm trường bodyshapes
    genders: []        // Thêm trường genders
  });

  // Lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Koi Categories
        const categoryResponse = await api.get("/api/KoiCategory/Get all KoiCategory");
        setCategories(categoryResponse.data);
  
        // Fetch Koi Standards
        const standardsResponse = await api.get("/api/KoiStandard/Get All KoiStandard");
        console.log("Koi Standards API Response:", standardsResponse.data); // Log the response data
        const standardsData = standardsResponse.data;
  
        // Create unique sets for each filterable standard
        const colorSet = new Set();
        const patternSet = new Set();
        const sizeSet = new Set();
        const bodyshapeSet = new Set();
        const genderSet = new Set();
  
        standardsData.forEach((standard) => {
          if (standard.color_koi) colorSet.add(standard.color_koi);
          if (standard.pattern_koi) patternSet.add(standard.pattern_koi);
          if (standard.size_koi) sizeSet.add(standard.size_koi);
          if (standard.bodyshape_koi) bodyshapeSet.add(standard.bodyshape_koi);
          if (standard.gender) genderSet.add(standard.gender);
        });
  
        // Update the standards state with unique values
        setStandards({
          colors: [...colorSet],
          patterns: [...patternSet],
          sizes: [...sizeSet],
          bodyshapes: [...bodyshapeSet],
          genders: [...genderSet],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  


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
    <div style={{ width: "250px", padding: "20px", height: "120vh" }}>
      <h3><FilterOutlined /> Filter Competitions</h3>

      <Form layout="vertical">
        <Form.Item label={<span style={{ color: '#FFD700' }}><TagsOutlined /> Category</span>}>
          <Select
            placeholder="Select Category"
            value={filters.category_name}
            onChange={(value) => handleFilterChange(value, "category_name")}
          >
            <Option value="">All</Option>
            {categories.map((category) => (
              <Option key={category.category_id} value={category.category_name}>{category.category_name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><BgColorsOutlined /> Color Koi</span>}>
          <Select
            placeholder="Select Color"
            value={filters.color_koi}
            onChange={(value) => handleFilterChange(value, "color_koi")}
          >
            <Option value="">All</Option>
            {standards.colors.map((color, index) => (
              <Option key={index} value={color}>{color}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><PictureOutlined /> Pattern Koi</span>}>
          <Select
            placeholder="Select Pattern"
            value={filters.pattern_koi}
            onChange={(value) => handleFilterChange(value, "pattern_koi")}
          >
            <Option value="">All</Option>
            {standards.patterns.map((pattern, index) => (
              <Option key={index} value={pattern}>{pattern}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><ColumnWidthOutlined /> Size Koi</span>}>
          <Select
            placeholder="Select Size"
            value={filters.size_koi}
            onChange={(value) => handleFilterChange(value, "size_koi")}
          >
            <Option value="">All</Option>
            {standards.sizes.map((size, index) => (
              <Option key={index} value={size}>{size}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}><LineHeightOutlined /> Bodyshape Koi</span>}>
          <Select
            placeholder="Select Bodyshape"
            value={filters.bodyshape_koi}
            onChange={(value) => handleFilterChange(value, "bodyshape_koi")}
          >
            <Option value="">All</Option>
            {standards.bodyshapes.map((bodyshape, index) => (
              <Option key={index} value={bodyshape}>{bodyshape}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={<span style={{ color: '#FFD700' }}>{filters.gender === "Male" ? <ManOutlined /> : <WomanOutlined />} Gender</span>}>
          <Select
            placeholder="Select Gender"
            value={filters.gender}
            onChange={(value) => handleFilterChange(value, "gender")}
          >
            <Option value="">All</Option>
            {standards.genders.map((gender, index) => (
              <Option key={index} value={gender}>{gender}</Option>
            ))}
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
