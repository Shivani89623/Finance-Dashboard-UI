
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

  // simple calculations
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
    <div className="p-6">

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">

        {/* Balance */}
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-md">
          <FaWallet size={25} />
          <p className="mt-2 text-sm">Balance</p>
          <h2 className="text-xl font-bold">₹{totalBalance}</h2>
        </div>

        {/* Income */}
        <div className="bg-green-500 text-white p-6 rounded-xl shadow-md">
          <FaArrowUp size={25} />
          <p className="mt-2 text-sm">Income</p>
          <h2 className="text-xl font-bold">₹{totalIncome}</h2>
        </div>

        {/* Expense */}
        <div className="bg-red-500 text-white p-6 rounded-xl shadow-md">
          <FaArrowDown size={25} />
          <p className="mt-2 text-sm">Expense</p>
          <h2 className="text-xl font-bold">₹{totalExpense}</h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="mb-3 font-medium">Income vs Expense</h3>

          {financeData.length === 0 ? (
            <p className="text-gray-500">No data available</p>
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
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="mb-3 font-medium">Spending Trend</h3>

          {financeData.length === 0 ? (
            <p className="text-gray-500">No data available</p>
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