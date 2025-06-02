// pages/SettingsPage.js
import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  // State for various settings
  const [currency, setCurrency] = useState('USD');
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [billReminders, setBillReminders] = useState(true);
  const [userName, setUserName] = useState('Current User'); // Placeholder for user name

  const handleSaveSettings = () => {
    // In a real application, you would send these settings to a backend
    // or save them to local storage/Firestore.
    alert('Settings saved successfully!'); // Replace with a custom notification
    console.log('Settings saved:', {
      currency,
      receiveNotifications,
      budgetAlerts,
      billReminders,
      userName,
    });
  };

  const handleExportData = () => {
    // Placeholder for data export logic
    alert('Exporting data... (Feature coming soon!)'); // Replace with actual export
    console.log('Data export initiated.');
  };

  const handleResetData = () => {
    // WARNING: In a real app, this would require strong confirmation
    // and potentially a password re-entry.
    if (window.confirm('Are you sure you want to reset all your expense data? This action cannot be undone.')) {
      alert('All data reset! (Feature coming soon!)'); // Replace with actual data reset
      console.log('All data reset.');
      // In a real app, you'd trigger a function to clear expenses from App.js state/backend
    }
  };

  return (
    <div className="settings-page-container">
      <h2>⚙️ Settings</h2>

      {/* Account Settings Section */}
      <div className="settings-section">
        <h3>Account & Profile</h3>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
            <option value="GBP">GBP (£)</option>
            {/* Add more currencies as needed */}
          </select>
        </div>
        <button className="settings-action-button" onClick={() => alert('Change Password (Feature coming soon!)')}>Change Password</button>
      </div>

      {/* Notification Settings Section */}
      <div className="settings-section">
        <h3>Notification Preferences</h3>
        <div className="toggle-group">
          <label htmlFor="receiveNotifications">Receive Notifications:</label>
          <input
            type="checkbox"
            id="receiveNotifications"
            checked={receiveNotifications}
            onChange={(e) => setReceiveNotifications(e.target.checked)}
            className="toggle-switch"
          />
        </div>
        {receiveNotifications && (
          <>
            <div className="toggle-group">
              <label htmlFor="budgetAlerts">Budget Alerts:</label>
              <input
                type="checkbox"
                id="budgetAlerts"
                checked={budgetAlerts}
                onChange={(e) => setBudgetAlerts(e.target.checked)}
                className="toggle-switch"
              />
            </div>
            <div className="toggle-group">
              <label htmlFor="billReminders">Bill Reminders:</label>
              <input
                type="checkbox"
                id="billReminders"
                checked={billReminders}
                onChange={(e) => setBillReminders(e.target.checked)}
                className="toggle-switch"
              />
            </div>
          </>
        )}
      </div>

      {/* Data Management Section */}
      <div className="settings-section">
        <h3>Data Management</h3>
        <button className="settings-action-button" onClick={handleExportData}>Export My Data</button>
        <button className="settings-action-button reset-button" onClick={handleResetData}>Reset All Data</button>
        <p className="data-note">Use with caution. Resetting data is irreversible.</p>
      </div>

      {/* Save Settings Button */}
      <button className="save-settings-button" onClick={handleSaveSettings}>Save Settings</button>

      <p className="settings-page-note">
        Customize your Smart Expenses experience.
      </p>
    </div>
  );
};

export default SettingsPage;
