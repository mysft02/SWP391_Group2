import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Spin, Alert } from 'antd';
import { TrophyOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { api } from '../../../../config/AxiosConfig'; // Ensure this file exports the configured Axios instance
import './GuestCompetition.css';

function GuestCompetition() {
  const [competitions, setCompetitions] = useState([]); // State for competitions
  const [currentIndex, setCurrentIndex] = useState(0); // State for current index
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const pageSize = 3; // Number of cards to display per page

  // Fetch competitions from the API
useEffect(() => {
  const fetchCompetitions = async () => {
    try {
      const response = await api.get('/api/CompetitionKoi/Get all CompetitionKoi');
      console.log(response.data); // Log the data for debugging
      setCompetitions(response.data); // Assuming response.data is the array of competitions
      setLoading(false);
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError(err.message);
      setLoading(false);
    }
  };

  fetchCompetitions();
}, []);


  // Calculate current competitions to display
  const currentCompetitions = competitions.slice(currentIndex, currentIndex + pageSize);

  // Handle previous and next button clicks
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

  // Render loading, error, or competitions
  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" style={{ margin: '20px' }} />;
  }

  return (
    <div className='Guest-Competition'>
      <Button
        style={{ marginRight: "10px" }}
        className='nav-button prev-button'
        onClick={handlePrevClick}
        icon={<LeftOutlined />}
        disabled={currentIndex === 0} // Disable when on the first page
      >
        Previous
      </Button>

      <Row gutter={[16, 16]} justify="center">
        {currentCompetitions.map((competition, index) => (
          <Col className="Guestcompetition-container" key={index} xs={24} sm={12} md={8}>
            <Card className='Guestcompetition-card'>
              <div className='competition-content'>
                <div className='competition-info'>
                  <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
                  <h3>{competition.competitionName}</h3>
                  <p>Thời gian bắt đầu: {competition.startTime}</p>
                  <p>Thời gian kết thúc: {competition.endTime}</p>
                </div>
                <img alt="Competition" src={competition.competitionImg} className='competition_img' />
              </div>
              <Button className='view-button'>Join in</Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Button
        style={{ marginRight: "20px" }}
        className='nav-button next-button'
        onClick={handleNextClick}
        icon={<RightOutlined />}
        disabled={currentIndex + pageSize >= competitions.length} // Disable when on the last page
      >
        Next
      </Button>
    </div>
  );
}

export default GuestCompetition;
