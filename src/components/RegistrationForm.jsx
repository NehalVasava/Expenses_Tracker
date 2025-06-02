// components/RegistrationForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import './RegistrationForm.css'; // Link to its dedicated CSS file

const RegistrationForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simulate registration success
    // In a real app, you'd send this data to a backend API
    console.log('Registering user:', { email, password });
    setSuccessMessage('Registration successful! Redirecting to login...');
    
    // Call the onRegister prop if provided (e.g., to update parent state)
    if (onRegister) {
      onRegister({ email, password });
    }

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/'); // Navigate to the login page (root path)
    }, 2000);
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {error && <div className="error-msg">{error}</div>}
        {successMessage && <div className="success-msg">{successMessage}</div>}

        <div className="form-group">
          <label htmlFor="regEmail">Email</label>
          <input
            type="email"
            id="regEmail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="regPassword">Password</label>
          <input
            type="password"
            id="regPassword"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit" className="register-button">Register</button>

        <p className="login-link-text">
          Already have an account? <Link to="/" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
