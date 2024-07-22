import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('/api/expenses')
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('Fetched expenses:', data); // Log fetched data
          const labels = data.map(expense => expense.description);
          const amounts = data.map(expense => expense.amount);
          setChartData({
            labels,
            datasets: [
              {
                label: 'Expenses',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          });
        } else {
          console.error('No data received');
        }
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  if (!chartData.labels) {
    return <div>Loading...</div>; // Render loading state if data is not yet available
  }

  return (
    <div>
      <h2>Expenses Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ExpensesChart;
