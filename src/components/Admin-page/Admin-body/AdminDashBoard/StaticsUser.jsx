import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { api } from '../../../../config/AxiosConfig';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StaticsUser() {
  const [userRoles, setUserRoles] = useState(null);  // Store user roles data

  useEffect(() => {
    // Fetch the user statistics data
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/User/Get User Statistics');
        setUserRoles(response.data.userRoles);
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    };
    fetchUserData();
  }, []);

  const chartData = {
    labels: userRoles ? Object.keys(userRoles) : [],  // Extract role names from userRoles object
    datasets: [
      {
        label: 'User Count by Role',
        data: userRoles ? Object.values(userRoles) : [],  // Extract user counts from userRoles object
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Color for bars
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
        text: 'User Role Distribution',
      },
    },
  };

  return (
    <div>
      <Card title="User Role Statistics">
        {/* Render the Bar Chart */}
        {userRoles ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
}

export default StaticsUser;
