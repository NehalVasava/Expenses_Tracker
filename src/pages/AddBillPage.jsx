// pages/AddBillPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBillPage.css'; // Link to its dedicated CSS file

const AddBillPage = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!name || !amount || !dueDate) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    const idToken = localStorage.getItem('idToken'); // Get the ID token from local storage
    if (!idToken) {
      setError('You are not logged in. Please log in to add a bill.');
      // Optionally redirect to login page
      setTimeout(() => navigate('/'), 2000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` // IMPORTANT: Send the ID token
        },
        body: JSON.stringify({
          name,
          amount: parseFloat(amount), // Ensure amount is sent as a number
          dueDate,
          isPaid: false // Default to unpaid
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Bill added successfully!');
        // Clear form fields
        setName('');
        setAmount('');
        setDueDate('');
        // Optionally navigate back to bills list after a delay
        setTimeout(() => navigate('/bills'), 2000);
      } else {
        setError(data.message || 'Failed to add bill.');
      }
    } catch (err) {
      console.error('Error adding bill:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="add-bill-container">
      <h2>Add New Bill</h2>

      {error && <div className="error-msg">{error}</div>}
      {successMessage && <div className="success-msg">{successMessage}</div>}

      <form className="add-bill-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="billName">Bill Name</label>
          <input
            type="text"
            id="billName"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Electricity Bill, Rent"
          />
        </div>

        <div className="form-group">
          <label htmlFor="billAmount">Amount</label>
          <input
            type="number"
            id="billAmount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 75.00"
            step="0.01" // Allow decimal amounts
          />
        </div>

        <div className="form-group">
          <label htmlFor="billDueDate">Due Date</label>
          <input
            type="date"
            id="billDueDate"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" className="add-bill-submit-button">Add Bill</button>
      </form>
    </div>
  );
};

export default AddBillPage;
