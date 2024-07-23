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

const MonthlySpendingChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('/api/expenses')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const monthlyTotals = {};
          data.forEach(expense => {
            const date = new Date(expense.date);
            const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            if (!monthlyTotals[monthYear]) {
              monthlyTotals[monthYear] = 0;
            }
            monthlyTotals[monthYear] += expense.amount;
          });

          const labels = Object.keys(monthlyTotals);
          const dataValues = Object.values(monthlyTotals);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Monthly Spending',
                data: dataValues,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
      <h2>Monthly Spending</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default MonthlySpendingChart;
