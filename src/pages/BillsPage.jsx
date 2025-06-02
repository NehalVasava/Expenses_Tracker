// pages/BillsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './BillsPage.css';

const BillsPage = ({ dummyBills }) => { // dummyBills prop is back
  const navigate = useNavigate(); // Initialize navigate hook
  const [bills, setBills] = useState(dummyBills); // Initialize with dummyBills
  const [filter, setFilter] = useState('upcoming'); // 'upcoming', 'all', 'paid'
  // Removed loading and error states as we are using dummy data for now
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  // Function to fetch bills from the backend - commented out as requested
  /*
  const fetchBills = async () => {
    setLoading(true);
    setError('');
    const idToken = localStorage.getItem('idToken'); // Get ID token from local storage

    if (!idToken) {
      setError('You are not logged in. Please log in to view bills.');
      setLoading(false);
      // Optionally redirect to login if not authenticated
      // setTimeout(() => navigate('/'), 2000); // Uncomment if you want auto-redirect
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bills', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` // Send token for authentication
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Ensure bills have an 'isPaid' property for filtering, default to false if missing
        const fetchedBills = data.map(bill => ({ ...bill, isPaid: bill.isPaid || false }));
        setBills(fetchedBills);
      } else {
        setError(data.message || 'Failed to fetch bills.');
      }
    } catch (err) {
      console.error('Error fetching bills:', err);
      setError('An unexpected error occurred while fetching bills.');
    } finally {
      setLoading(false);
    }
  };
  */

  // Fetch bills when the component mounts - commented out as requested
  /*
  useEffect(() => {
    fetchBills();
  }, []); // Empty dependency array means this runs once on mount
  */

  // Sort and filter bills based on current state
  const sortedAndFilteredBills = [...bills]
    .filter(bill => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date to start of day
      const dueDate = new Date(bill.dueDate);
      dueDate.setHours(0, 0, 0, 0); // Normalize due date to start of day

      if (filter === 'upcoming') {
        // Only show upcoming bills that are not marked as paid
        return dueDate >= today && !bill.isPaid;
      } else if (filter === 'paid') {
        return bill.isPaid;
      }
      return true; // 'all' filter
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort by due date

  // This function will be called when the "Add New Bill" button is clicked
  const handleAddBillClick = () => {
    navigate('/add-bill'); // This is the line that performs the redirection
  };

  return (
    <div className="bills-page-container">
      <h2>Manage Your Bills 🗓️</h2>

      <div className="bills-controls">
        <label htmlFor="bill-filter">Show:</label>
        <select
          id="bill-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="upcoming">Upcoming</option>
          <option value="all">All Bills</option>
          <option value="paid">Paid Bills</option>
        </select>
      </div>

      <div className="bills-list-section">
        <h3>{filter === 'upcoming' ? 'Upcoming Bills' : filter === 'paid' ? 'Paid Bills' : 'All Bills'}</h3>
        {/* Removed loading and error messages */}
        {sortedAndFilteredBills.length > 0 ? (
          <div className="bills-list">
            {sortedAndFilteredBills.map((bill, index) => ( // Use index as key if no unique ID available
              <div key={index} className="bill-item">
                <div className="bill-details">
                  <span className="bill-name">{bill.name}</span>
                  <span className="bill-amount">${bill.amount.toFixed(2)}</span>
                </div>
                <span className="bill-due-date">Due: {new Date(bill.dueDate).toLocaleDateString()}</span>
                {/* You might add a 'Mark as Paid' button here */}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data-message">No {filter} bills found.</p>
        )}
      </div>

      {/* The corrected button with onClick handler */}
      <button onClick={handleAddBillClick} className="add-bill-btn">Add New Bill</button>
      <p className="bills-page-note">
        Keep track of your recurring payments and due dates.
      </p>
    </div>
  );
};

export default BillsPage;
