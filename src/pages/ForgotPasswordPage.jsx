// pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation back to login
import './ForgotPasswordPage.css'; // Link to its dedicated CSS file

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!email) {
      setMessage('Please enter your email address.');
      setIsError(true);
      return;
    }

    // Simulate sending a password reset email
    // In a real app, you'd send this email to a backend API
    console.log('Password reset requested for:', email);
    setMessage('If an account with that email exists, a password reset link has been sent.');
    setIsError(false); // Assume success for simulation purposes
    setEmail(''); // Clear the input field
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password?</h2>
        <p className="form-description">Enter your email address below to receive a password reset link.</p>

        {message && (
          <div className={`info-msg ${isError ? 'error-msg' : 'success-msg'}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="resetEmail">Email</label>
          <input
            type="email"
            id="resetEmail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>

        <button type="submit" className="reset-password-button">Send Reset Link</button>

        <p className="back-to-login-text">
          Remembered your password? <Link to="/" className="login-link">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
