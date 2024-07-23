import React, { useState, useEffect } from 'react';

const Expenses = ({ onEdit, onDelete }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch('/api/expenses')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched expenses:', data); // Add this line
        if (data) {
          setExpenses(data);
        } else {
          console.error('No data received');
        }
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  if (!expenses.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.description}: ${expense.amount}
            <button onClick={() => { console.log('Edit clicked:', expense); onEdit(expense); }}>Edit</button>
            <button onClick={() => { console.log('Delete clicked:', expense._id); onDelete(expense._id); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
