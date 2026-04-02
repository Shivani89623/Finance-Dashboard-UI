
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";



const Dashboard = () => {
  const { transactions: financeData } = useContext(AppContext);

  // calculations
  const totalIncome = financeData
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = financeData
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // chart data
  const pieChartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  const trendData = financeData.map(item => ({
    date: item.date,
    amount: item.amount
  }));

  return (
    <div className="dashboard-container">

      {/* Heading */}
      <h2 className="dashboard-title">Dashboard Overview</h2>

      {/* Cards */}
      <div className="card-grid">

        {/* Balance */}
        <div className="card balance">
          <FaWallet className="card-icon" />
          <p className="card-title">Balance</p>
          <h2 className="card-value">₹{totalBalance}</h2>
        </div>

        {/* Income */}
        <div className="card income">
          <FaArrowUp className="card-icon" />
          <p className="card-title">Income</p>
          <h2 className="card-value">₹{totalIncome}</h2>
        </div>

        {/* Expense */}
        <div className="card expense">
          <FaArrowDown className="card-icon" />
          <p className="card-title">Expense</p>
          <h2 className="card-value">₹{totalExpense}</h2>
        </div>

      </div>

      {/* Charts */}
      <div className="chart-grid">

        {/* Pie Chart */}
        <div className="chart-box">
          <h3 className="chart-title">Income vs Expense</h3>

          {financeData.length === 0 ? (
            <p className="no-data">No data available</p>
          ) : (
            <PieChart width={300} height={250}>
              <Pie data={pieChartData} dataKey="value" outerRadius={90}>
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </div>

        {/* Line Chart */}
        <div className="chart-box">
          <h3 className="chart-title">Spending Trend</h3>

          {financeData.length === 0 ? (
            <p className="no-data">No data available</p>
          ) : (
            <LineChart width={350} height={250} data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8b5cf6" />
            </LineChart>
          )}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;