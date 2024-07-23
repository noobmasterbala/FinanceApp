import React, { useState } from 'react';

const AddExpense = ({ onAddCategory }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); // Default to today
  const [categories, setCategories] = useState(['groceries', 'tech', 'rent', 'electricity']);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, amount: parseFloat(amount), category: newCategory || category, date }),
    })
      .then(response => response.json())
      .then(data => {
        setDescription('');
        setAmount('');
        setCategory('');
        setNewCategory('');
        setDate(new Date().toISOString().substring(0, 10));
        if (newCategory) {
          onAddCategory(newCategory);
          setCategories([...categories, newCategory]);
        }
      })
      .catch(error => console.error('Error adding expense:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Or add new category"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
