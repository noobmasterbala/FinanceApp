import React, { useState } from 'react';
import './App.css';
import Expenses from './components/Expenses';
import ExpensesChart from './components/ExpensesChart';
import AddExpense from './components/AddExpense';
import ExpensesPieChart from './components/ExpensesPieChart';

function App() {
  const [categories, setCategories] = useState(['groceries', 'tech', 'rent', 'electricity']); // Initial categories

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="App">
      <h1>Smart Finance App</h1>
      <AddExpense onAddCategory={handleAddCategory} />
      <Expenses />
      <ExpensesChart />
      <ExpensesPieChart />
    </div>
  );
}

export default App;
