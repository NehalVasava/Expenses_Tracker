// AddExpense.js
import React, { useState } from 'react';
import './AddExpense.css'; // Create this CSS file

const AddExpense = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food'); // Default category
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      alert('Please fill in all fields!');
      return;
    }

    const newExpense = {
      id: Date.now(), // Simple unique ID
      title,
      amount: parseFloat(amount), // Convert amount to a number
      category,
      date,
    };

    onAddExpense(newExpense); // Pass new expense up to parent (App.js)
    
    // Clear form fields
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate(new Date().toISOString().slice(0, 10));
    alert('Expense added successfully!');
  };

  return (
    <div className="add-expense-container">
      <h2>➕ Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Expense Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Groceries, Dinner with friends"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 50.00"
            step="0.01" // Allow decimal amounts
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Personal">Personal Care</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;