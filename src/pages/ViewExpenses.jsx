// ViewExpenses.js
import React from 'react';
import './ViewExpenses.css'; // Create this CSS file

const ViewExpenses = ({ expenses }) => {
  return (
    <div className="view-expenses-container">
      <h2>🧾 All Your Expenses</h2>
      {expenses.length === 0 ? (
        <p className="no-expenses-message">No expenses recorded yet. Start by adding one!</p>
      ) : (
        <div className="expenses-list">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-details">
                <span className="expense-title">{expense.title}</span>
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
              </div>
              <span className="expense-amount">-${expense.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewExpenses;