// src/pages/BudgetPage.js
import React from 'react'; // Removed useState, useEffect as we are using props
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './BudgetPage.css';

// BudgetPage now accepts 'expenses' and 'dummyBudget' as props
const BudgetPage = ({ expenses, dummyBudget }) => {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Utility to calculate spending by category (can be moved to a shared utils file)
  const getSpendingByCategory = (data) => {
    const categories = {};
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    data.forEach(item => {
      const itemDate = new Date(item.date);
      // Only include expenses for the current month/year for budget comparison
      if (itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear) {
        categories[item.category] = (categories[item.category] || 0) + item.amount;
      }
    });
    return categories;
  };

  const spending = getSpendingByCategory(expenses);
  // Calculate total spent for the current month
  const totalSpent = Object.values(spending).reduce((sum, amount) => sum + amount, 0);

  // The total budget from dummyBudget
  const totalBudgetAmount = dummyBudget.totalBudget || 0;

  const overallRemaining = totalBudgetAmount - totalSpent;
  const overallStatus = overallRemaining >= 0 ? 'under-budget' : 'over-budget';

  // This function handles the navigation to the SetBudgetPage
  const handleSetBudgetClick = () => {
    navigate('/set-budget'); // Navigate to the new SetBudgetPage
  };

  // Define the categories to display, filtering out 'totalBudget' from dummyBudget keys
  const displayCategories = [
    'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment',
    'Shopping', 'Health', 'Education', 'Other'
  ];

  return (
    <div className="budget-page-container">
      <h2>Your Budget Overview 💰</h2>

      <div className="budget-overview-card">
        <h3>Overall Budget Status (This Month)</h3>
        <p>Total Budget: <span className="budget-amount">${totalBudgetAmount.toFixed(2)}</span></p>
        <p>Total Spent: <span className="spent-amount">${totalSpent.toFixed(2)}</span></p>
        <p className={`status ${overallStatus}`}>
          {overallRemaining >= 0 ? `Remaining: $${overallRemaining.toFixed(2)}` : `Over Budget: $${Math.abs(overallRemaining).toFixed(2)}`}
        </p>
      </div>

      <div className="budget-category-section">
        <h3>Category-wise Budgets</h3>
        {displayCategories.length > 0 ? (
          <div className="category-budget-list">
            {displayCategories.map((category) => {
              // Convert category name to match dummyBudget keys (e.g., 'Food' -> 'foodBudget')
              const budgetKey = `${category.toLowerCase()}Budget`;
              const categoryBudget = dummyBudget[budgetKey] || 0;
              const spentForCategory = spending[category] || 0; // Use the actual category name from spending
              const remaining = categoryBudget - spentForCategory;
              const isOver = remaining < 0;

              return (
                <div key={category} className={`category-budget-item ${isOver ? 'over-budget-item' : ''}`}>
                  <span className="category-title">{category}</span>
                  <div className="budget-details">
                    <p>Budget: ${categoryBudget.toFixed(2)}</p>
                    <p>Spent: ${spentForCategory.toFixed(2)}</p>
                    <p className={`remaining-amount ${isOver ? 'over' : ''}`}>
                      Remaining: ${remaining.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-data-message">No category budgets set. Click "Set/Edit Budgets" to add some!</p>
        )}
      </div>

      {/* The button with the correct onClick handler */}
      <button onClick={handleSetBudgetClick} className="add-budget-btn">Set/Edit Budgets</button>
      <p className="budget-page-note">
        Set your budget limits for different categories to control your spending.
      </p>
    </div>
  );
};

export default BudgetPage;
