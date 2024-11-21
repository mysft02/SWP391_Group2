import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { api } from '../../../../config/AxiosConfig';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StaticsBet() {
  const [betData, setBetData] = useState(null);  // Store bet data

  useEffect(() => {
    // Fetch the bet statistics data
    const fetchBetData = async () => {
      try {
        const response = await api.get('/api/KoiBet/Bet statistics');
        setBetData(response.data);
      } catch (error) {
        console.error('Error fetching bet statistics:', error);
      }
    };
    fetchBetData();
  }, []);

  const chartData = {
    labels: betData ? ['Total Bets', 'Total Bet Amount', 'Total Winning Amount', 'Total Losing Amount'] : [],
    datasets: [
      {
        label: 'Amount & Bets Count',
        data: [
          betData ? betData.totalBets : 0,  // Total Bets
          betData ? betData.totalBetAmount : 0,  // Total Bet Amount
          betData ? betData.totalWinningAmount : 0,  // Total Winning Amount
          betData ? betData.totalLosingAmount : 0,  // Total Losing Amount
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', // Total Bets
          'rgba(54, 162, 235, 0.2)', // Total Bet Amount
          'rgba(255, 99, 132, 0.2)', // Total Winning Amount
          'rgba(255, 159, 64, 0.2)', // Total Losing Amount
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', // Total Bets
          'rgba(54, 162, 235, 1)', // Total Bet Amount
          'rgba(255, 99, 132, 1)', // Total Winning Amount
          'rgba(255, 159, 64, 1)', // Total Losing Amount
        ],
        borderWidth: 1,
      },
      {
        label: 'Bet Status Counts',
        data: betData?.betStatusCounts?.map(item => item.count) || [],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Card title="Bet Statistics">
        {/* Render the Bar Chart */}
        {betData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Bet Statistics',
                },
              },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
}

export default StaticsBet;
