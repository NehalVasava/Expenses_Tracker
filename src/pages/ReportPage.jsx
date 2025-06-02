// pages/ReportPage.js
import React, { useState, useEffect } from 'react';
import './ReportPage.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'; // Recharts imports

// Utility function for spending by category
const getSpendingByCategory = (data) => {
  const categories = {};
  data.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + item.amount;
  });
  // Convert to array of objects for Recharts
  return Object.entries(categories)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort by amount descending
};

// Define some colors for the pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6666', '#66B2FF', '#FFD700'];

const ReportPage = ({ expenses }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  useEffect(() => {
    const today = new Date();
    let startDate;

    switch (selectedPeriod) {
      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        setFilteredExpenses(expenses);
        return;
    }

    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= today;
    });
    setFilteredExpenses(filtered);
  }, [selectedPeriod, expenses]);

  const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const spendingByCategoryData = getSpendingByCategory(filteredExpenses); // Renamed for clarity with chart data

  return (
    <div className="report-page-container">
      <h2>Financial Reports</h2>

      <div className="report-controls">
        <label htmlFor="period-select">View Reports For:</label>
        <select
          id="period-select"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="report-summary">
        <div className="report-card total-spent">
          <h3>Total Spent</h3>
          <p>${totalSpent.toFixed(2)}</p>
        </div>
      </div>

      <div className="report-section">
        <h3>Spending by Category</h3>
        {spendingByCategoryData.length > 0 ? (
          <>
            {/* Recharts Pie Chart */}
            <div className="chart-wrapper"> {/* Added wrapper for responsive container */}
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={spendingByCategoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {spendingByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} /> {/* Custom tooltip format */}
                  <Legend /> {/* Show legend for categories */}
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category List (can remain if you want both chart and list) */}
            <div className="category-report-list">
              {spendingByCategoryData.map(({ name, value }) => (
                <div key={name} className="category-report-item">
                  <span className="category-name">{name}</span>
                  <span className="category-amount">${value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="no-data-message">No spending data for the selected period to generate category report.</p>
        )}
      </div>

      <div className="report-notes">
        <p>Reports are generated based on your recorded expenses and selected period.</p>
      </div>
    </div>
  );
};

export default ReportPage;
