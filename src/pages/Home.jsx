import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

// --- REMOVE these dummy data declarations from Home.js ---
// const dummyData = [ ... ];
// const dummyBills = [ ... ];
// const dummyBudget = { ... };
// These should be passed as props from App.js now.

// --- Utility Functions (These can remain here or be moved to a separate utility file) ---
const getTopExpense = (data) => {
  if (!data.length) return null;
  return data.reduce((prev, current) => (prev.amount > current.amount ? prev : current));
};

const getTip = (topCategory) => {
  switch (topCategory?.title) {
    case 'Food':
      return 'Try meal prepping to save money on food.';
    case 'Housing': // Assuming 'Apartment Rent' falls under 'Housing' category
      return 'Consider house-sharing to reduce rent costs.';
    case 'Utilities': // Assuming 'Internet Bill' falls under 'Utilities' category
      return 'Check if there’s a cheaper plan with your provider.';
    default:
      return 'Track small expenses—they add up!';
  }
};

const getSpendingInsight = (data) => {
  const totalThisMonth = data.reduce((sum, e) => sum + e.amount, 0);
  if (totalThisMonth > 300) {
    return "You're spending a bit more than usual this month. Keep an eye on it!";
  } else if (totalThisMonth > 0) {
    return "Your spending is on track! Keep up the good work.";
  }
  return "Start tracking your expenses to see insights!";
};

const getUpcomingBills = (bills) => {
  const today = new Date();
  const upcoming = bills
    .filter(bill => {
      const dueDate = new Date(bill.dueDate);
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
      return dueDate >= today && dueDate <= sevenDaysFromNow;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  return upcoming;
};

const getSpendingByCategory = (data) => {
  const categories = {};
  data.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + item.amount;
  });
  return Object.entries(categories)
    .sort(([, a], [, b]) => b - a); // Sort by amount descending
};

const getRecentTransactions = (data, count = 3) => {
  return data
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
    .slice(0, count); // Get top 'count' items
};

const getBudgetProgress = (data, budget) => {
  const spendingByCategory = getSpendingByCategory(data);
  const progress = {};
  let totalSpent = 0;
  let totalBudget = budget.totalBudget || 0;

  spendingByCategory.forEach(([category, amount]) => {
    totalSpent += amount;
    // Note: Category names in budget object should match exactly (e.g., 'foodBudget' for 'Food' category)
    const budgetKey = `${category.toLowerCase()}Budget`;
    if (budget[budgetKey]) {
      progress[category] = {
        spent: amount,
        budget: budget[budgetKey],
        percentage: (amount / budget[budgetKey]) * 100
      };
    }
  });

  // Overall budget progress
  progress.overall = {
    spent: totalSpent,
    budget: totalBudget,
    percentage: (totalSpent / totalBudget) * 100
  };

  return progress;
};


// --- Home Component now receives data as props ---
const Home = ({ expenses, dummyBills, dummyBudget }) => {
  const navigate = useNavigate();

  // Use props instead of internal dummyData
  const topExpense = getTopExpense(expenses);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const tip = getTip(topExpense);
  const spendingInsight = getSpendingInsight(expenses);
  const upcomingBills = getUpcomingBills(dummyBills);
  const spendingByCategory = getSpendingByCategory(expenses);
  const recentTransactions = getRecentTransactions(expenses, 3);
  const budgetProgress = getBudgetProgress(expenses, dummyBudget);

  const userName = "User"; // Replace with actual user name from auth context
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  const greeting = getGreeting();

  return (
    <div className="home-container">
      <h2>{greeting}, {userName}!</h2>

      {/* Overview Section */}
      <div className="overview">
        <div className="card">
          <h3>Total Spent This Period</h3>
          <p className="amount-display">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Your Top Expense</h3>
          <p className="category-display">
            {topExpense ? `${topExpense.title} - $${topExpense.amount.toFixed(2)}` : 'No expenses yet!'}
          </p>
        </div>
        <div className="card tip-card">
          <h3>Tip of the Day 💡</h3>
          <p className="tip-text">{tip}</p>
        </div>
      </div>

      {/* Spending Habits at a Glance */}
      <div className="new-section spending-habits-section">
        <h3>Your Spending Snapshot 📊</h3>
        <div className="spending-insight-card">
          <p>{spendingInsight}</p>
          <button onClick={() => navigate('/reports')}>View Detailed Reports</button>
        </div>
      </div>

      {/* Spending Breakdown by Category (Mini-Chart / List) */}
      <div className="new-section category-breakdown-section">
        <h3>Where Your Money Goes</h3>
        {spendingByCategory.length > 0 ? (
          <div className="category-list">
            {spendingByCategory.map(([category, amount]) => (
              <div key={category} className="category-item">
                <span>{category}</span>
                <span className="category-amount">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No spending data to categorize yet.</p>
        )}
        <button onClick={() => navigate('/analytics')}>See All Categories</button>
      </div>

      {/* Recent Transactions */}
      <div className="new-section recent-transactions-section">
        <h3>Recent Transactions 🧾</h3>
        {recentTransactions.length > 0 ? (
          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <span>{transaction.title}</span>
                <span className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</span>
                <span className="transaction-amount">-${transaction.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No recent transactions.</p>
        )}
        {/* CORRECTED PATH: /list */}
        <button onClick={() => navigate('/list')}>View All Transactions</button>
      </div>

      {/* Simple Budget Overview */}
      <div className="new-section budget-overview-section">
        <h3>Budget Progress 💰</h3>
        {budgetProgress.overall && dummyBudget.totalBudget > 0 ? (
          <div className="budget-progress-bar-container">
            <div
              className="budget-progress-bar"
              style={{ width: `${Math.min(100, budgetProgress.overall.percentage || 0)}%`,
                       backgroundColor: budgetProgress.overall.percentage > 90 ? '#dc3545' : (budgetProgress.overall.percentage > 70 ? '#ffc107' : '#28a745') }}
            ></div>
          </div>
        ) : (
          <p>Set a budget to track your progress!</p>
        )}
        <p className="budget-summary">
          Spent: ${budgetProgress.overall?.spent.toFixed(2) || 0} / Budget: ${budgetProgress.overall?.budget.toFixed(2) || 0}
          {budgetProgress.overall && dummyBudget.totalBudget > 0 && ` (${Math.round(budgetProgress.overall.percentage || 0)}%)`}
        </p>
        <button onClick={() => navigate('/budget')}>Manage Budgets</button>
      </div>

      {/* Upcoming Bills */}
      <div className="new-section upcoming-bills-section">
        <h3>Upcoming Bills 🗓️</h3>
        {upcomingBills.length > 0 ? (
          <div className="bills-list">
            {upcomingBills.map((bill, index) => (
              <div key={index} className="bill-item">
                <span>{bill.name} - ${bill.amount.toFixed(2)}</span>
                <span className="due-date">Due: {new Date(bill.dueDate).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No upcoming bills in the next 7 days.</p>
        )}
        <button onClick={() => navigate('/bills')}>Manage Bills</button>
      </div>

      {/* Quick Actions with Icons/Labels */}
      <div className="quick-actions-icons">
        <h3>What's next for your finances?</h3>

        {/* CORRECTED PATH: /add */}
        <div className="action-item" onClick={() => navigate("/add")}>
          <span className="action-icon">➕</span>
          <p className="action-label">Add New Expense</p>
        </div>

        {/* CORRECTED PATH: /list */}
        <div className="action-item" onClick={() => navigate('/list')}>
          <span className="action-icon">👀</span>
          <p className="action-label">View All Expenses</p>
        </div>

        <div className="action-item" onClick={() => navigate('/reports')}>
          <span className="action-icon">📈</span>
          <p className="action-label">Generate Reports</p>
        </div>

        <div className="action-item" onClick={() => navigate('/settings')}>
          <span className="action-icon">⚙️</span>
          <p className="action-label">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Home;