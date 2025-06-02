import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Expenses', value: '$170' },
    { title: 'Budget', value: '$500' },
    { title: 'Remaining', value: '$330' },
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      <div className="cards-container">
        {stats.map((stat, index) => (
          <div className="dash-card" key={index}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
