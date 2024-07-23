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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklySpendingChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('/api/expenses')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const weeklyTotals = {};
          data.forEach(expense => {
            const date = new Date(expense.date);
            const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay())).toISOString().substring(0, 10);
            if (!weeklyTotals[startOfWeek]) {
              weeklyTotals[startOfWeek] = 0;
            }
            weeklyTotals[startOfWeek] += expense.amount;
          });

          const labels = Object.keys(weeklyTotals);
          const dataValues = Object.values(weeklyTotals);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Weekly Spending',
                data: dataValues,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
              },
            ],
          });
        } else {
          setChartData({
            labels: [],
            datasets: [],
          });
        }
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  return (
    <div>
      <h2>Weekly Spending</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default WeeklySpendingChart;
