import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesPieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('/api/expenses')
      .then(response => response.json())
      .then(data => {
        if (data) {
          const categories = [...new Set(data.map(expense => expense.category))];
          const categoryTotals = categories.map(category => {
            return data.filter(expense => expense.category === category)
              .reduce((sum, expense) => sum + expense.amount, 0);
          });

          setChartData({
            labels: categories,
            datasets: [
              {
                label: 'Expenses by Category',
                data: categoryTotals,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Expenses by Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpensesPieChart;
