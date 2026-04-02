
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Insights = () => {
  const { transactions: financeData } = useContext(AppContext);

  // category wise expense
  const expenseByCategory = {};

  financeData.forEach((item) => {
    if (item.type === "expense") {
      expenseByCategory[item.category] =
        (expenseByCategory[item.category] || 0) + item.amount;
    }
  });

  // top category
  let topCategory = "N/A";
  let maxAmount = 0;

  for (let key in expenseByCategory) {
    if (expenseByCategory[key] > maxAmount) {
      maxAmount = expenseByCategory[key];
      topCategory = key;
    }
  }

  // total expense
  const totalSpent = Object.values(expenseByCategory).reduce(
    (sum, val) => sum + val,
    0
  );

  // average expense
  const totalTransactions = financeData.filter(
    (item) => item.type === "expense"
  ).length;

  const avgSpending =
    totalTransactions > 0
      ? Math.floor(totalSpent / totalTransactions)
      : 0;

  return (
    <div className="insights-container">

      {/* Heading */}
      <h2 className="insights-title">Smart Insights</h2>

      {/* Cards */}
      <div className="insights-grid">

        <div className="insight-card purple">
          <p className="label">Top Spending Category</p>
          <h3 className="value">{topCategory}</h3>
        </div>

        <div className="insight-card red">
          <p className="label">Total Expense</p>
          <h3 className="value">₹{totalSpent}</h3>
        </div>

        <div className="insight-card green">
          <p className="label">Average Spending</p>
          <h3 className="value">₹{avgSpending}</h3>
        </div>

      </div>

      {/* Observation */}
      <div className="insight-box">
        <h3 className="obs-title">Observation</h3>

        {totalSpent === 0 ? (
          <p className="no-data">No expense data available</p>
        ) : totalSpent > 5000 ? (
          <p className="warning">⚠️ You are spending more than usual this month.</p>
        ) : (
          <p className="good">✅ Your spending looks balanced. Keep it up!</p>
        )}

      </div>

    </div>
  );
};

export default Insights;