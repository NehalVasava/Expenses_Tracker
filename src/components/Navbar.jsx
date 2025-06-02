import React from 'react';
import './Navbar.css'; // Assuming you named your CSS file Navbar.css
import { FaHome, FaPlusCircle, FaList } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

const Navbar = () => {
  const location = useLocation(); // Get the current URL location

  return (
    <div className="bottom-nav">
      {/* Home Nav Item */}
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <FaHome />
        <span>Home</span>
      </Link>

      {/* Add Expense Nav Item */}
      {/* Assuming '/add-expense' is the route for adding expenses */}
      <Link to="/add-expense" className={`nav-item ${location.pathname === '/add-expense' ? 'active' : ''}`}>
        <FaPlusCircle />
        <span>Add</span>
      </Link>

      {/* View Expenses List Nav Item */}
      {/* Assuming '/view-expenses' is the route for viewing the list */}
      <Link to="/view-expenses" className={`nav-item ${location.pathname === '/view-expenses' ? 'active' : ''}`}>
        <FaList />
        <span>List</span>
      </Link>
    </div>
  );
};

export default Navbar;