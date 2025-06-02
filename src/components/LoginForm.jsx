// components/LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic dummy login validation
    if (email === 'user@example.com' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* NEW: Forgot Password Link */}
        <p className="forgot-password-link-text">
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        </p>

        <button type="submit" className="login-button">Login</button>

        <p className="register-link-text">
          Don't have an account? <Link to="/register" className="register-link">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;