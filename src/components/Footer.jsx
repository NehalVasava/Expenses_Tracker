// components/Footer.js
import React from 'react';
import './Footer.css'; // This will contain styles for a normal footer

const Footer = () => {
  return (
    <footer className="app-normal-footer"> {/* Changed class for clarity */}
      <p>&copy; {new Date().getFullYear()} Smart Expenses. All rights reserved.</p>
    </footer>
  );
};

export default Footer;