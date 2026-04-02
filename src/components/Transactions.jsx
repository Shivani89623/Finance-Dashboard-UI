
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

  const filteredList = financeData.filter((item) => {
    const matchSearch = item.category
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchType =
      typeFilter === "all" || item.type === typeFilter;

    return matchSearch && matchType;
  });

  return (
    <div className="transactions-container">

      <h2 className="transactions-title">My Transactions</h2>

      {/* Controls */}
      <div className="controls">

        <input
          type="text"
          placeholder="Search..."
          className="input"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="input"
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
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

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSave} className="form">

          <input
            type="date"
            name="date"
            value={inputData.date}
            onChange={handleInput}
            className="input"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={inputData.amount}
            onChange={handleInput}
            className="input"
            min={0}        // prevent negative
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
      {/* Table */}
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
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
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