import React from 'react';
import './Header.css';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goToNotifications = () => {
    navigate('/notifications');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>ExpenseTracker</h1>
      </div>
      <div className="header-right">
        <div className="notification-icon" onClick={goToNotifications}>
          <FaBell />
          <span className="badge">3</span>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="User Profile"
          className="profile-pic"
        />
      </div>
    </header>
  );
};

export default Header;
