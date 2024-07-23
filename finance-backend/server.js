const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5001; // Make sure this matches the port in your proxy setting

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/finance');


// Schema and Model
const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now } // New field for date
  });
  
const Expense = mongoose.model('Expense', expenseSchema);

// Routes
app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post('/api/expenses', async (req, res) => {
    const { description, amount, category, date } = req.body;
    const newExpense = new Expense({ description, amount, category, date });
    await newExpense.save();
    res.json(newExpense);
  });
  
  app.put('/api/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(id, { description, amount, category, date }, { new: true });
    res.json(updatedExpense);
  });
  

// Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  res.json({ message: 'Expense deleted' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
