import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import ExpenseList from './pages/ExpenseList';
import NotificationPage from './pages/NotificationPage';
import ReportPage from './pages/ReportPage';
import BudgetPage from './pages/BudgetPage';
import BillsPage from './pages/BillsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AddBillPage from './pages/AddBillPage'; 
import SetBudgetPage from './pages/SetBudgetPage';

// Initial dummy data (central source of truth for expenses)
const initialExpenses = [
  { id: 1, title: 'Internet Bill', amount: 50, category: 'Utilities', date: '2025-05-28' },
  { id: 2, title: 'Groceries', amount: 120, category: 'Food', date: '2025-05-27' },
  { id: 3, title: 'Apartment Rent', amount: 200, category: 'Housing', date: '2025-05-25' },
  { id: 4, title: 'Coffee Shop', amount: 15, category: 'Food', date: '2025-05-29' },
  { id: 5, title: 'Bus Pass', amount: 25, category: 'Transport', date: '2025-05-26' },
  { id: 6, title: 'Movie Night', amount: 30, category: 'Entertainment', date: '2025-05-24' },
  { id: 7, title: 'Books', amount: 40, category: 'Personal', date: '2025-05-23' },
  { id: 8, title: 'Dinner Out', amount: 75, category: 'Food', date: '2025-05-20' },
  { id: 9, title: 'Gas Refill', amount: 45, category: 'Transport', date: '2025-04-15' },
  { id: 10, title: 'Gym Membership', amount: 60, category: 'Health', date: '2025-05-01' },
];

// Dummy data for bills and budget
const dummyBills = [
  { name: 'Rent', amount: 200, dueDate: '2025-06-05' },
  { name: 'Electricity Bill', amount: 75, dueDate: '2025-06-10' },
  { name: 'Internet Subscription', amount: 50, dueDate: '2025-06-15' },
  { name: 'Mobile Bill', amount: 30, dueDate: '2025-06-20' },
];

const dummyBudget = {
  totalBudget: 1000,
  foodBudget: 300,
  transportBudget: 100,
  housingBudget: 250,
  utilitiesBudget: 100,
  entertainmentBudget: 50,
  personalBudget: 50,
  healthBudget: 80,
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState(initialExpenses);

  const handleAddExpense = (newExpense) => {
    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    setExpenses((prevExpenses) => [...prevExpenses, { ...newExpense, id: newId }]);
    alert('Expense added successfully!');
  };

  const handleRegister = (userData) => {
    console.log('User registered (simulated):', userData);
    // In a real app, you'd save user data and potentially auto-login or redirect
  };

  return (
    <Router>
      {isLoggedIn && <Header />}

      <div className="app-content-area">
        <Routes>
          {/* Default route: Login if not logged in, else redirect to Home */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" /> : <LoginForm onLogin={() => setIsLoggedIn(true)} />
            }
          />
          {/* Registration Form Route */}
          <Route
            path="/register"
            element={<RegistrationForm onRegister={handleRegister} />}
          />
          {/* Forgot Password Page Route */}
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
          {/* NEW ROUTE: Add Bill Page */}
          <Route
            path="/add-bill"
            element={isLoggedIn ? <AddBillPage /> : <Navigate to="/" />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard expenses={expenses} dummyBills={dummyBills} dummyBudget={dummyBudget} /> : <Navigate to="/" />}
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home expenses={expenses} dummyBills={dummyBills} dummyBudget={dummyBudget} /> : <Navigate to="/" />}
          />
          <Route
            path="/add"
            element={isLoggedIn ? <AddExpense onAddExpense={handleAddExpense} /> : <Navigate to="/" />}
          />
          <Route
            path="/list"
            element={isLoggedIn ? <ExpenseList expenses={expenses} /> : <Navigate to="/" />}
          />
          <Route
            path="/notifications"
            element={isLoggedIn ? <NotificationPage /> : <Navigate to="/" />}
          />
          <Route
            path="/reports"
            element={isLoggedIn ? <ReportPage expenses={expenses} /> : <Navigate to="/" />}
          />
          <Route
            path="/budget"
            element={isLoggedIn ? <BudgetPage expenses={expenses} dummyBudget={dummyBudget} /> : <Navigate to="/" />}
          />
          <Route
            path="/set-budget"
            element={isLoggedIn ? <SetBudgetPage /> : <Navigate to="/" />}
          />
          <Route
            path="/bills"
            element={isLoggedIn ? <BillsPage dummyBills={dummyBills} /> : <Navigate to="/" />}
          />
          <Route
            path="/analytics"
            element={isLoggedIn ? <AnalyticsPage expenses={expenses} /> : <Navigate to="/" />}
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <SettingsPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;