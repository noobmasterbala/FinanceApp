import React, { useState } from 'react';

const AddExpense = ({ onAddCategory }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['groceries', 'tech', 'rent', 'electricity']); // Initial categories

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, amount: parseFloat(amount), category: newCategory || category }),
    })
      .then(response => response.json())
      .then(data => {
        setDescription('');
        setAmount('');
        setCategory('');
        setNewCategory('');
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
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
