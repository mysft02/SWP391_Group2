import React from "react";
import { Form, Select, Button, DatePicker } from "antd";
import { FilterOutlined } from "@ant-design/icons";
const { Option } = Select;
import './FilterKoi.css'
function FilterKoi({ competitions, onFilter }) {
  const [form] = Form.useForm();

  // Dữ liệu tĩnh cho các trường
  const colors = [
    "White (Shiro)", "Red (Aka)", "Black (Sumi)", "Yellow (Ki)",
    "Orange (Orenji)", "Blue (Asagi)"
  ];

  const patterns = [
    "Kohaku", "Sanke", "Showa", "Tancho", "Utsurimono", "Asagi"
  ];

  const varieties = [
    "Kohaku", "Sanke", "Showa", "Tancho", "Asagi", "Shusui"
  ];

  const bodyShapes = [
    "Standard", "Sakura", "Butterfly Koi", "Gin Rin Koi", "Tategoi", 
    "Kinrin", "Doitsu Koi", "Kiwagoi"
  ];

  const genders = [
    "Male", "Female"
  ];

  // Bộ lọc thời gian
  const handleDateRangeChange = (dates, dateStrings) => {
    console.log("Selected time range: ", dates, dateStrings);
  };

  const handleSubmit = (values) => {
    console.log(values);  // Kiểm tra dữ liệu đầu vào của người dùng
    
    const filtered = competitions.filter((comp) => {
      const startDate = values.time_range ? values.time_range[0] : null;
      const endDate = values.time_range ? values.time_range[1] : null;
  
      return (
        // Kiểm tra màu sắc (hoặc để trống sẽ không lọc theo màu)
        (!values.color_koi || values.color_koi === "All" || comp.category.koiStandard.color_koi === values.color_koi) &&
        
        // Kiểm tra hoa văn
        (!values.pattern_koi || values.pattern_koi === "All" || comp.category.koiStandard.pattern_koi === values.pattern_koi) &&
        
        // Kiểm tra hình dạng cơ thể
        (!values.bodyshape_koi || values.bodyshape_koi === "All" || comp.category.koiStandard.bodyshape_koi === values.bodyshape_koi) &&
        
        // Kiểm tra giống Koi
        (!values.variety_koi || values.variety_koi === "All" || comp.category.koiStandard.variety_koi === values.variety_koi) &&
        
        // Kiểm tra giới tính
        (!values.gender || values.gender === "All" || comp.category.koiStandard.gender === values.gender) &&
        
        // Kiểm tra khoảng thời gian
        (!startDate || new Date(comp.start_time) >= new Date(startDate)) &&
        (!endDate || new Date(comp.end_time) <= new Date(endDate))
      );
    });
  
    onFilter(filtered); // Cập nhật danh sách cuộc thi đã lọc
  };

  return (
    <div className="filter-koi-wrapper" style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div className="filter-koi-container" style={{ width: "100%", maxWidth: "600px" }}>
        <h3><FilterOutlined /> Filter Koi</h3>

        <Form form={form} onFinish={handleSubmit} layout="vertical" className="filter-form">
          <Form.Item name="time_range" label="Time Range">
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              onChange={handleDateRangeChange}
            />
          </Form.Item>
          
          {/* Màu sắc Koi */}
          <Form.Item name="color_koi" label="Color" >
            <Select defaultValue="All">
              <Option value="All">All</Option>
              {colors.map((color, index) => (
                <Option key={index} value={color}>{color}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* Hoa văn Koi */}
          <Form.Item name="pattern_koi" label="Pattern">
            <Select defaultValue="All">
              <Option value="All">All</Option>
              {patterns.map((pattern, index) => (
                <Option key={index} value={pattern}>{pattern}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* Hình dạng cơ thể Koi */}
          <Form.Item name="bodyshape_koi" label="Body Shape">
            <Select defaultValue="All">
              <Option value="All">All</Option>
              {bodyShapes.map((shape, index) => (
                <Option key={index} value={shape}>{shape}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* Giống Koi */}
          <Form.Item name="variety_koi" label="Variety">
            <Select defaultValue="All">
              <Option value="All">All</Option>
              {varieties.map((variety, index) => (
                <Option key={index} value={variety}>{variety}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* Giới tính Koi */}
          <Form.Item name="gender" label="Gender">
            <Select defaultValue="All">
              <Option value="All">All</Option>
              {genders.map((gender, index) => (
                <Option key={index} value={gender}>{gender}</Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Apply Filter
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FilterKoi;
