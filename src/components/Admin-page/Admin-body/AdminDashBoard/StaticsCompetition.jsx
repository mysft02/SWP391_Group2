import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { api } from '../../../../config/AxiosConfig';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StaticsCompetition() {
  const [competitionData, setCompetitionData] = useState(null);  // Store competition statistics

  useEffect(() => {
    // Fetch competition statistics data
    const fetchCompetitionData = async () => {
      try {
        const response = await api.get('/api/CompetitionKoi/Get Competition Statistics');
        setCompetitionData(response.data);  // Store the competition data response
      } catch (error) {
        console.error('Error fetching competition statistics:', error);
      }
    };
    fetchCompetitionData();
  }, []);

  const chartData = {
    labels: competitionData ? ['Active Competitions', 'Pending Winners'] : [],  // Labels for the chart
    datasets: [
      {
        label: 'Competition Count',
        data: competitionData ? [competitionData.competition.Active, competitionData.winner.Pending] : [],  // Data for the chart
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',  // Border color for bars
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Competition Statistics',
      },
    },
  };

  return (
    <div>
      <Card title="Competition Statistics">
        {/* Render the Bar Chart */}
        {competitionData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
}

export default StaticsCompetition;
