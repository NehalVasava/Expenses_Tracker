// src/pages/SetBudgetPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetBudgetPage.css'; // Link to its dedicated CSS file

const SetBudgetPage = () => {
  const navigate = useNavigate();
  // Dummy initial budget data for demonstration
  // In a real app without a backend, you might manage this in App.js or Context
  const initialDummyBudgets = {
    Food: 300,
    Transport: 100,
    Housing: 250,
    Utilities: 100,
    Entertainment: 50,
    Shopping: 70,
    Health: 80,
    Education: 50,
    Other: 20
  };

  const [budgetData, setBudgetData] = useState(initialDummyBudgets); // Initialize with dummy data
  const [successMessage, setSuccessMessage] = useState('');
  // Removed loading and error states as there's no backend fetching

  const categories = [
    'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment',
    'Shopping', 'Health', 'Education', 'Other' // Exclude 'Salary', 'Investment' as they are income, not budget categories
  ];

  // Removed useEffect for fetching, as we are using dummy data

  const handleInputChange = (category, value) => {
    // Ensure value is a non-negative number
    const parsedValue = parseFloat(value);
    setBudgetData(prevData => ({
      ...prevData,
      [category]: isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Simulate saving the budget data (e.g., log to console)
    console.log('Simulating budget save:', budgetData);

    setSuccessMessage('Budget saved successfully!');
    // Optionally navigate back to budget overview after a delay
    setTimeout(() => navigate('/budget'), 2000);
  };

  // Removed conditional rendering for loading and error states

  return (
    <div className="set-budget-container">
      <h2>Set/Edit Your Budgets</h2>

      {/* Removed error display as there's no backend error handling */}
      {successMessage && <div className="success-msg">{successMessage}</div>}

      <form className="set-budget-form" onSubmit={handleSubmit}>
        {categories.map((category) => (
          <div className="form-group" key={category}>
            <label htmlFor={`budget-${category}`}>{category} Budget</label>
            <input
              type="number"
              id={`budget-${category}`}
              value={budgetData[category] || ''} // Display current value or empty string
              onChange={(e) => handleInputChange(category, e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        ))}

        <button type="submit" className="set-budget-submit-button">Save Budgets</button>
      </form>
      <p className="set-budget-note">
        Define how much you plan to spend in each category.
      </p>
    </div>
  );
};

export default SetBudgetPage;
