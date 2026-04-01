
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Insights = () => {
  const { transactions: financeData } = useContext(AppContext);

  // store category wise expense
  const expenseByCategory = {};

  financeData.forEach((item) => {
    if (item.type === "expense") {
      expenseByCategory[item.category] =
        (expenseByCategory[item.category] || 0) + item.amount;
    }
  });

  // get highest spending category
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

  // average spending (extra insight 🔥)
  const totalTransactions = financeData.filter(
    (item) => item.type === "expense"
  ).length;

  const avgSpending =
    totalTransactions > 0
      ? Math.floor(totalSpent / totalTransactions)
      : 0;

  return (
    <div className="p-6">

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Smart Insights</h2>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5">

        {/* Top Category */}
        <div className="bg-purple-100 p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">Top Spending Category</p>
          <h3 className="text-lg font-semibold">{topCategory}</h3>
        </div>

        {/* Total Expense */}
        <div className="bg-red-100 p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">Total Expense</p>
          <h3 className="text-lg font-semibold">₹{totalSpent}</h3>
        </div>

        {/* Average Spending */}
        <div className="bg-green-100 p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">Average Spending</p>
          <h3 className="text-lg font-semibold">₹{avgSpending}</h3>
        </div>

      </div>

      {/* Smart Message */}
      <div className="mt-6 bg-blue-100 p-5 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-2">Observation</h3>

        {totalSpent === 0 ? (
          <p className="text-gray-500">No expense data available</p>
        ) : totalSpent > 5000 ? (
          <p>⚠️ You are spending more than usual this month.</p>
        ) : (
          <p>✅ Your spending looks balanced. Keep it up!</p>
        )}
      </div>

    </div>
  );
};

export default Insights;