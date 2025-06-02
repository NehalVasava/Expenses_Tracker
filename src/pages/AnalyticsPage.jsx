// pages/AnalyticsPage.js
import React, { useState, useEffect } from 'react';
import './AnalyticsPage.css';
// CORRECTED IMPORTS: Added Cell and Legend to the import list from 'recharts'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

// Define some colors for the pie chart segments (MOVED FROM ReportPage.js)
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6666', '#66B2FF', '#FFD700'];


// Utility functions (ideally from a shared utils file)
const getSpendingByCategory = (data) => {
  const categories = {};
  data.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + item.amount;
  });
  return Object.entries(categories)
    .map(([name, value]) => ({ name, value })) // Format for Recharts
    .sort((a, b) => b.value - a.value);
};

const getMonthlySpending = (data) => {
  const monthlySpending = {};
  data.forEach(item => {
    const date = new Date(item.date);
    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    monthlySpending[yearMonth] = (monthlySpending[yearMonth] || 0) + item.amount;
  });
  // Convert to array of objects and sort by month
  return Object.entries(monthlySpending)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const AnalyticsPage = ({ expenses }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  useEffect(() => {
    const today = new Date();
    let startDate;

    switch (selectedPeriod) {
      case 'currentMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'last6Months':
        startDate = new Date();
        startDate.setMonth(today.getMonth() - 5); // Go back 5 months to include current month
        startDate.setDate(1); // Start from the first day of that month
        break;
      case 'currentYear':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      default: // 'all'
        setFilteredExpenses(expenses);
        return;
    }

    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= today;
    });
    setFilteredExpenses(filtered);
  }, [selectedPeriod, expenses]);

  const spendingByCategoryData = getSpendingByCategory(filteredExpenses);
  const monthlySpendingData = getMonthlySpending(filteredExpenses); // Renamed for clarity with chart data
  const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="analytics-page-container">
      <h2>Detailed Analytics 📊</h2>

      <div className="analytics-controls">
        <label htmlFor="analytics-period-select">Period:</label>
        <select
          id="analytics-period-select"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="currentMonth">Current Month</option>
          <option value="last6Months">Last 6 Months</option>
          <option value="currentYear">Current Year</option>
        </select>
      </div>

      <div className="analytics-summary-cards">
        <div className="analytics-card">
          <h3>Total Spent</h3>
          <p>${totalSpent.toFixed(2)}</p>
        </div>
        <div className="analytics-card">
          <h3>No. of Transactions</h3>
          <p>{filteredExpenses.length}</p>
        </div>
      </div>

      <div className="analytics-section">
        <h3>Spending by Category</h3>
        {spendingByCategoryData.length > 0 ? (
          <>
            {/* Recharts Pie Chart (similar to ReportPage) */}
            <div className="chart-wrapper">
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
                    {/* CORRECTED: Using COLORS constant */}
                    {spendingByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend /> {/* CORRECTED: Legend component is now imported */}
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="analytics-category-list">
              {spendingByCategoryData.map(({ name, value }) => (
                <div key={name} className="analytics-category-item">
                  <span>{name}</span>
                  <span>${value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="no-data-message">No category spending data for the selected period.</p>
        )}
      </div>

      <div className="analytics-section">
        <h3>Monthly Spending Trend</h3>
        {monthlySpendingData.length > 0 ? (
          <>
            {/* Recharts Bar Chart */}
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySpendingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Bar dataKey="value" fill="#8884d8" /> {/* Blue color for bars */}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="monthly-trend-list">
              {monthlySpendingData.map(({ name, value }) => (
                <div key={name} className="monthly-trend-item">
                  <span>{name}</span>
                  <span>${value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="no-data-message">No monthly spending data for the selected period.</p>
        )}
      </div>

      <p className="analytics-page-note">
        Dive deeper into your financial data with detailed charts and insights.
      </p>
    </div>
  );
};

export default AnalyticsPage;
