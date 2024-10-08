import React, { useState } from 'react';
import { Button, Card, Row, Col, Pagination, Slider, Checkbox, Select } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import FilterKoi from './FilterKoi';

const { Option } = Select;

function Competition() {
    // Dữ liệu giả lập cho cuộc thi
    const competitions = [
      { title: 'Cuộc thi lập trình 2024', start: '2024-10-10', end: '2024-11-10', type: 'Lập trình', imageUrl: 'https://th.bing.com/th/id/OIP.jgHaCFOKji2ApdgjoMu6CQHaE8?rs=1&pid=ImgDetMain' },
      { title: 'Cuộc thi thiết kế đồ họa 2024', start: '2024-10-15', end: '2024-11-15', type: 'Thiết kế', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
      { title: 'Cuộc thi ẩm thực 2024', start: '2024-10-20', end: '2024-11-20', type: 'Ẩm thực', imageUrl: 'https://betterpet.com/wp-content/uploads/2023/06/maine-coon-cat-with-fluffy-tail.jpeg' },
      // Thêm các cuộc thi khác...
    ];

    // State để điều khiển phân trang và lọc
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCompetitions, setFilteredCompetitions] = useState(competitions);
    const [timeRange, setTimeRange] = useState([0, 30]); // Khoảng thời gian
    const [selectedType, setSelectedType] = useState(''); // Bộ lọc loại cuộc thi

    const pageSize = 3; // Số lượng card hiển thị mỗi trang

    // Hàm xử lý sự kiện phân trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Hàm xử lý bộ lọc thời gian
    const handleTimeFilter = (value) => {
        setTimeRange(value);
        filterCompetitions(value, selectedType);
    };

    // Hàm xử lý bộ lọc loại cuộc thi
    const handleTypeFilter = (value) => {
        setSelectedType(value);
        filterCompetitions(timeRange, value);
    };

    // Hàm lọc cuộc thi theo thời gian và loại
    const filterCompetitions = (timeRange, type) => {
        const filtered = competitions.filter((comp) => {
            const startDate = new Date(comp.start);
            const endDate = new Date(comp.end);
            const currentRange = (endDate - startDate) / (1000 * 60 * 60 * 24); // Chuyển sang ngày
            return currentRange >= timeRange[0] && currentRange <= timeRange[1] && (type ? comp.type === type : true);
        });
        setFilteredCompetitions(filtered);
    };

    // Tính toán vị trí của các card hiển thị trong trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentCompetitions = filteredCompetitions.slice(startIndex, endIndex);

    return (
        <div className='Guest-Competition'>
            {/* Bộ lọc thời gian */}
            <div className='filters'>
                <h4>Filter by time range (days)</h4>
                <Slider
                    range
                    min={0}
                    max={60}
                    value={timeRange}
                    onChange={handleTimeFilter}
                    marks={{ 0: '0 days', 60: '60 days' }}
                />

                {/* Bộ lọc loại cuộc thi */}
                <h4>Filter by competition type</h4>
                <Select
                    style={{ width: 200 }}
                    placeholder="Select a type"
                    onChange={handleTypeFilter}
                    allowClear
                >
                    <Option value="Lập trình">Lập trình</Option>
                    <Option value="Thiết kế">Thiết kế</Option>
                    <Option value="Ẩm thực">Ẩm thực</Option>
                </Select>
            </div>

            <Row gutter={[16, 16]} justify="center">
                {currentCompetitions.map((competition, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                        <Card className='competition-card'>
                            <div className='competition-content'>
                                <div className='competition-info'>
                                    <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
                                    <h3>{competition.title}</h3>
                                    <p>Thời gian bắt đầu: {competition.start}</p>
                                    <p>Thời gian kết thúc: {competition.end}</p>
                                    <p>Loại cuộc thi: {competition.type}</p>
                                </div>
                                <img alt="Competition" src={competition.imageUrl} className='competition-image' />
                            </div>
                            <Button className='view-button'>Join in</Button>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination
                className='competition-pagination'
                current={currentPage}
                pageSize={pageSize}
                total={filteredCompetitions.length}
                onChange={handlePageChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />
        </div>
    );
}

export default Competition;
