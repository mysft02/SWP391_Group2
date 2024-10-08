import React, { useState } from 'react';
import { Button, Card, Row, Col, Pagination, Slider, Select, Checkbox } from 'antd';

const { Option } = Select;

function FilterKoi() {
    // Dữ liệu giả lập cho cá Koi
    const koiList = [
      { standard_id: 1, color_koi: 'Trắng', pattern_koi: 'Kohaku', size_koi: 30, age_koi: 2, bodyshape_koi: 'Thon dài', variety_koi: 'Kohaku', gender: 'Đực' },
      { standard_id: 2, color_koi: 'Đỏ', pattern_koi: 'Showa', size_koi: 40, age_koi: 3, bodyshape_koi: 'Tròn trịa', variety_koi: 'Showa', gender: 'Cái' },
      { standard_id: 3, color_koi: 'Đen', pattern_koi: 'Sanke', size_koi: 50, age_koi: 4, bodyshape_koi: 'Thon dài', variety_koi: 'Sanke', gender: 'Đực' },
      // Thêm dữ liệu cá Koi khác...
    ];

    // State để điều khiển phân trang và lọc
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredKoi, setFilteredKoi] = useState(koiList);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedPattern, setSelectedPattern] = useState('');
    const [sizeRange, setSizeRange] = useState([0, 100]); // Bộ lọc kích thước
    const [ageRange, setAgeRange] = useState([0, 10]); // Bộ lọc độ tuổi

    const pageSize = 3; // Số lượng card hiển thị mỗi trang

    // Hàm xử lý sự kiện phân trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Hàm xử lý bộ lọc màu sắc
    const handleColorFilter = (value) => {
        setSelectedColor(value);
        filterKoi(value, selectedPattern, sizeRange, ageRange);
    };

    // Hàm xử lý bộ lọc họa tiết
    const handlePatternFilter = (value) => {
        setSelectedPattern(value);
        filterKoi(selectedColor, value, sizeRange, ageRange);
    };

    // Hàm xử lý bộ lọc kích thước
    const handleSizeFilter = (value) => {
        setSizeRange(value);
        filterKoi(selectedColor, selectedPattern, value, ageRange);
    };

    // Hàm xử lý bộ lọc độ tuổi
    const handleAgeFilter = (value) => {
        setAgeRange(value);
        filterKoi(selectedColor, selectedPattern, sizeRange, value);
    };

    // Hàm lọc cá Koi theo màu sắc, họa tiết, kích thước, và độ tuổi
    const filterKoi = (color, pattern, sizeRange, ageRange) => {
        const filtered = koiList.filter((koi) => {
            const sizeCheck = koi.size_koi >= sizeRange[0] && koi.size_koi <= sizeRange[1];
            const ageCheck = koi.age_koi >= ageRange[0] && koi.age_koi <= ageRange[1];
            const colorCheck = color ? koi.color_koi === color : true;
            const patternCheck = pattern ? koi.pattern_koi === pattern : true;
            return sizeCheck && ageCheck && colorCheck && patternCheck;
        });
        setFilteredKoi(filtered);
    };

    // Tính toán vị trí của các card hiển thị trong trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentKoi = filteredKoi.slice(startIndex, endIndex);

    return (
        <div className='Koi-Filter'>
            {/* Bộ lọc màu sắc */}
            <h4>Filter by Color</h4>
            <Select
                style={{ width: 200 }}
                placeholder="Select a color"
                onChange={handleColorFilter}
                allowClear
            >
                <Option value="Trắng">Trắng</Option>
                <Option value="Đỏ">Đỏ</Option>
                <Option value="Đen">Đen</Option>
            </Select>

            {/* Bộ lọc họa tiết */}
            <h4>Filter by Pattern</h4>
            <Select
                style={{ width: 200 }}
                placeholder="Select a pattern"
                onChange={handlePatternFilter}
                allowClear
            >
                <Option value="Kohaku">Kohaku</Option>
                <Option value="Showa">Showa</Option>
                <Option value="Sanke">Sanke</Option>
            </Select>

            {/* Bộ lọc kích thước */}
            <h4>Filter by Size (cm)</h4>
            <Slider
                range
                min={0}
                max={100}
                value={sizeRange}
                onChange={handleSizeFilter}
                marks={{ 0: '0cm', 100: '100cm' }}
            />

            {/* Bộ lọc độ tuổi */}
            <h4>Filter by Age (years)</h4>
            <Slider
                range
                min={0}
                max={10}
                value={ageRange}
                onChange={handleAgeFilter}
                marks={{ 0: '0 years', 10: '10 years' }}
            />

            {/* Hiển thị danh sách cá Koi */}
            <Row gutter={[16, 16]} justify="center">
                {currentKoi.map((koi, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                        <Card className='koi-card'>
                            <h3>{koi.variety_koi}</h3>
                            <p>Màu sắc: {koi.color_koi}</p>
                            <p>Họa tiết: {koi.pattern_koi}</p>
                            <p>Kích thước: {koi.size_koi} cm</p>
                            <p>Độ tuổi: {koi.age_koi} năm</p>
                            <p>Giới tính: {koi.gender}</p>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredKoi.length}
                onChange={handlePageChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />
        </div>
    );
}

export default FilterKoi;
