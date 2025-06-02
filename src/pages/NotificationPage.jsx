import React from 'react';
import './NotificationPage.css';

const notifications = [
  { id: 1, message: 'New expense added: Internet - $50', date: 'June 1, 2025' },
  { id: 2, message: 'Budget updated to $600', date: 'June 2, 2025' },
  { id: 3, message: 'Reminder: Check your monthly report', date: 'June 2, 2025' },
];

const NotificationPage = () => {
  return (
    <div className="notification-page">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((note) => (
          <li key={note.id} className="notification-item">
            <div className="notification-message">{note.message}</div>
            <div className="notification-date">{note.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
