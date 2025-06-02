import React from 'react';
import './ExpenseList.css';

const expenses = [
  { id: 1, title: 'Internet', amount: 50, date: '2025-06-01' },
  { id: 2, title: 'Food', amount: 120, date: '2025-06-02' },
];

const ExpenseList = () => {
  return (
    <div className="list-container">
      <h2 className="list-title">Expense List</h2>
      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>${e.amount.toFixed(2)}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
