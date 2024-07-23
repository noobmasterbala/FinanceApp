import React, { useState } from 'react';
import './App.css';
import Expenses from './components/Expenses';
import ExpensesChart from './components/ExpensesChart';
import AddExpense from './components/AddExpense';
import ExpensesPieChart from './components/ExpensesPieChart';
import Modal from './components/Modal';

function App() {
  const [categories, setCategories] = useState(['groceries', 'tech', 'rent', 'electricity']);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteExpense = (id) => {
    fetch(`/api/expenses/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        window.location.reload(); // Reload to update the list
      })
      .catch(error => console.error('Error deleting expense:', error));
  };

  const handleEditExpense = (expense) => {
    console.log('Editing expense:', expense);
    setEditingExpense(expense);
  };

  const handleSaveEditExpense = (e) => {
    e.preventDefault();
    fetch(`/api/expenses/${editingExpense._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingExpense),
    })
      .then(response => response.json())
      .then(() => {
        setEditingExpense(null);
        window.location.reload(); // Reload to update the list
      })
      .catch(error => console.error('Error updating expense:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingExpense(prevState => ({
      ...prevState,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleCloseModal = () => {
    setEditingExpense(null);
  };

  return (
    <div className="App">
      <h1>Smart Finance App</h1>
      <AddExpense onAddCategory={handleAddCategory} />
      <Expenses onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
      <ExpensesChart />
      <ExpensesPieChart />
      <Modal show={editingExpense !== null} onClose={handleCloseModal}>
        {editingExpense && (
          <div>
            <h2>Edit Expense</h2>
            <form onSubmit={handleSaveEditExpense}>
              <input
                type="text"
                name="description"
                value={editingExpense.description}
                onChange={handleChange}
                placeholder="Description"
              />
              <input
                type="number"
                name="amount"
                value={editingExpense.amount}
                onChange={handleChange}
                placeholder="Amount"
              />
              <select
                name="category"
                value={editingExpense.category}
                onChange={handleChange}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
