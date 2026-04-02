
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Transactions = () => {
  const {
    transactions: financeData,
    role,
    addTransaction,
    deleteTransaction,
    updateTransaction
  } = useContext(AppContext);

  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortType, setSortType] = useState("latest");
  const [showForm, setShowForm] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const [inputData, setInputData] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense"
  });

  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!inputData.date || !inputData.amount || !inputData.category) return;

    const formattedData = {
      ...inputData,
      amount: Number(inputData.amount)
    };

    if (editItemId) {
      updateTransaction({ ...formattedData, id: editItemId });
    } else {
      addTransaction(formattedData);
    }

    setInputData({
      date: "",
      amount: "",
      category: "",
      type: "expense"
    });

    setEditItemId(null);
    setShowForm(false);
  };

  const handleEditClick = (item) => {
    setInputData(item);
    setEditItemId(item.id);
    setShowForm(true);
  };

  // ✅ FILTER + SEARCH (ADVANCED)
  const filteredList = financeData.filter((item) => {
    const search = searchText.toLowerCase();

    const matchSearch =
      item.category.toLowerCase().includes(search) ||
      item.type.toLowerCase().includes(search) ||
      item.amount.toString().includes(search) ||
      item.date.includes(search);

    const matchType =
      typeFilter === "all" || item.type === typeFilter;

    return matchSearch && matchType;
  });

  // ✅ SORTING
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortType === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortType === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortType === "high") {
      return b.amount - a.amount;
    } else if (sortType === "low") {
      return a.amount - b.amount;
    }
    return 0;
  });

  return (
    <div className="transactions-container">

      <h2 className="transactions-title">My Transactions</h2>

      {/* Controls */}
      <div className="controls">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by category, type, amount, date..."
          className="input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* FILTER */}
        <select
          className="input"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* SORT */}
        <select
          className="input"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="high">Amount High → Low</option>
          <option value="low">Amount Low → High</option>
        </select>

        {role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn primary"
          >
            {showForm ? "Close" : "Add"}
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSave} className="form">

          <input
            type="date"
            name="date"
            value={inputData.date}
            onChange={handleInput}
            className="input"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={inputData.amount}
            onChange={handleInput}
            className="input"
            min={0}
            step="any"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={inputData.category}
            onChange={handleInput}
            className="input"
            required
          />

          <select
            name="type"
            value={inputData.type}
            onChange={handleInput}
            className="input"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button className="btn success">
            {editItemId ? "Update" : "Save"}
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {sortedList.length > 0 ? (
              sortedList.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.category}</td>

                  <td className={item.type === "income" ? "income-text" : "expense-text"}>
                    {item.type}
                  </td>

                  {role === "admin" && (
                    <td>
                      <button
                        onClick={() => handleEditClick(item)}
                        className="action-btn edit"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTransaction(item.id)}
                        className="action-btn delete"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No data found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Transactions;