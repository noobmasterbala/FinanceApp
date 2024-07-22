const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5001; // Make sure this matches the port in your proxy setting

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/finance', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema and Model
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String, // New field for category
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes
app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post('/api/expenses', async (req, res) => {
  const { description, amount, category } = req.body;
  const newExpense = new Expense({ description, amount, category });
  await newExpense.save();
  res.json(newExpense);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
