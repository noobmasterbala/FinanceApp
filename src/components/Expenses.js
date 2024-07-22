import React, { useState, useEffect } from 'react';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch('/api/expenses')
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('Fetched expenses:', data); // Log fetched data
          setExpenses(data);
        } else {
          console.error('No data received');
        }
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  if (!expenses.length) {
    return <div>Loading...</div>; // Render loading state if data is not yet available
  }

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>{expense.description}: ${expense.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
