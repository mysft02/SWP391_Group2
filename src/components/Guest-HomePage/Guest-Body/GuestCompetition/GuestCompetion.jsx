import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'antd';
import { TrophyOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './GuestCompetition.css';
import '../../../../data/DataCompetition';
function GuestCompetition() {
  // Dữ liệu giả lập cho cuộc thi
  const competitions = [
    {
      competition_id: 1,
      competition_name: "Koi Competition Spring 2024",
      competition_description: "A major competition for koi enthusiasts",
      start_time: "2024-03-15T09:00:00",
      end_time: "2024-03-20T18:00:00",
      competition_img:"https://img.freepik.com/premium-photo/color-paint-watercolor-art-fish-aquarium-animals-wildlife-illustration_1258-220470.jpg",
      status_competition: "Active",
      category_name: "A",
      color_koi: "Red",
      pattern_koi: "Pattern1",
      size_koi: "Small",
      bodyshape_koi: "Oval",
      variety_koi: "Variety1",
      gender: "Male"
    },
    {
      competition_id: 2,
      competition_name: "Autumn Koi Showcase",
      competition_description: "A seasonal showcase of the best koi fish",
      start_time: "2024-09-10T10:00:00",
      end_time: "2024-09-12T17:00:00",
      competition_img:"https://img.freepik.com/premium-photo/color-paint-watercolor-art-fish-aquarium-animals-wildlife-illustration_1258-220470.jpg",
      status_competition: "scheduled",
      category_name: "B",
      color_koi: "Blue",
      pattern_koi: "Pattern2",
      size_koi: "Medium",
      bodyshape_koi: "Round",
      variety_koi: "Variety2",
      gender: "Female"
    },
    {
      competition_id: 3,
      competition_name: "Autumn Koi Showcase",
      competition_description: "A seasonal showcase of the best koi fish",
      start_time: "2024-09-10T10:00:00",
      end_time: "2024-09-12T17:00:00",
      competition_img:"https://img.freepik.com/premium-photo/color-paint-watercolor-art-fish-aquarium-animals-wildlife-illustration_1258-220470.jpg",

      status_competition: "scheduled",
      category_name: "C",
      color_koi: "Blue",
      pattern_koi: "Pattern2",
      size_koi: "Medium",
      bodyshape_koi: "Round",
      variety_koi: "Variety2",
      gender: "Female"
    },
    {
      competition_id: 4,
      competition_name: "Autumn Koi Showcase",
      competition_description: "A seasonal showcase of the best koi fish",
      start_time: "2024-09-10T10:00:00",
      end_time: "2024-09-12T17:00:00",
      competition_img:"https://img.freepik.com/premium-photo/color-paint-watercolor-art-fish-aquarium-animals-wildlife-illustration_1258-220470.jpg",

      status_competition: "scheduled",
      category_name: "C",
      color_koi: "Blue",
      pattern_koi: "Pattern2",
      size_koi: "Medium",
      bodyshape_koi: "Round",
      variety_koi: "Variety2",
      gender: "Female"
    },
    {
      competition_id: 5,
      competition_name: "Autumn Koi Showcase",
      competition_description: "A seasonal showcase of the best koi fish",
      start_time: "2024-09-10T10:00:00",
      end_time: "2024-09-12T17:00:00",
      competition_img:"https://img.freepik.com/premium-photo/color-paint-watercolor-art-fish-aquarium-animals-wildlife-illustration_1258-220470.jpg",
      status_competition: "scheduled",
      category_name: "C",
      color_koi: "White",
      pattern_koi: "Pattern2",
      size_koi: "Medium",
      bodyshape_koi: "Round",
      variety_koi: "Variety2",
      gender: "Female"
    },
    {
      competition_id: 6,
      competition_name: "Autumn Koi Showcase",
      competition_description: "A seasonal showcase of the best koi fish",
      start_time: "2024-09-10T10:00:00",
      end_time: "2024-09-12T17:00:00",
      competition_img:"https://img.freepik.com/premium-photo/color-paint-watercolor-art-fish-aquarium-animals-wildlife-illustration_1258-220470.jpg",
      status_competition: "scheduled",
      category_name: "C",
      color_koi: "White",
      pattern_koi: "Pattern2",
      size_koi: "Medium",
      bodyshape_koi: "Round",
      variety_koi: "Variety2",
      gender: "Female"
    }
  ];

  // State để điều khiển vị trí card đang hiển thị
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 3; // Số lượng card hiển thị mỗi trang

  // Tính toán các card hiện tại
  const currentCompetitions = competitions.slice(currentIndex, currentIndex + pageSize);

  // Hàm xử lý di chuyển card
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + pageSize < competitions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className='Guest-Competition'>
      <Button style={{
        marginRight:"30px",
      }}
        className='nav-button prev-button'
        onClick={handlePrevClick}
        icon={<LeftOutlined />}
        disabled={currentIndex === 0} // Vô hiệu hóa khi đang ở trang đầu
      >
        Previous
      </Button>

      <Row gutter={[16, 16]} justify="center">
        {currentCompetitions.map((competition, index) => (
          <Col className ="Guestcompetition-container" key={index} xs={24} sm={12} md={8}>
            <Card className='competition-card'>
              <div className='competition-content'>
                <div className='competition-info'>
                  <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
                  <h3>{competition.name}</h3>
                  <p>Thời gian bắt đầu: {competition.start_time}</p>
                  <p>Thời gian kết thúc: {competition.end_time}</p>
                </div>
                <img alt="Competition" src={competition.competition_img} className='competition-image' />
              </div>
              <Button className='view-button'>Join in </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Button style={{
        marginRight:"20px"
      }}
        className='nav-button next-button'
        onClick={handleNextClick}
        icon={<RightOutlined />}
        disabled={currentIndex + pageSize >= competitions.length} // Vô hiệu hóa khi đang ở trang cuối
      >
        Next
      </Button>
    </div>
  );
}

export default GuestCompetition;
