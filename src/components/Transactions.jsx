
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

  // handle input
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    });
  };

  // add / update
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

    // reset
    setInputData({
      date: "",
      amount: "",
      category: "",
      type: "expense"
    });

    setEditItemId(null);
    setShowForm(false);
  };

  // edit
  const handleEditClick = (item) => {
    setInputData(item);
    setEditItemId(item.id);
    setShowForm(true);
  };

  // filter logic
  const filteredList = financeData.filter((item) => {
    const matchSearch = item.category
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchType =
      typeFilter === "all" || item.type === typeFilter;

    return matchSearch && matchType;
  });

  return (
    <div className="p-6">

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">My Transactions</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">

        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="border p-2 rounded-md"
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-500 text-white px-4 py-2 rounded-md"
          >
            {showForm ? "Close" : "Add"}
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSave} className="mb-5 flex flex-wrap gap-2">

          <input
            type="date"
            name="date"
            value={inputData.date}
            onChange={handleInput}
            className="border p-2 rounded-md"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={inputData.amount}
            onChange={handleInput}
            className="border p-2 rounded-md"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={inputData.category}
            onChange={handleInput}
            className="border p-2 rounded-md"
          />

          <select
            name="type"
            value={inputData.type}
            onChange={handleInput}
            className="border p-2 rounded-md"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button className="bg-green-500 text-white px-4 rounded-md">
            {editItemId ? "Update" : "Save"}
          </button>
        </form>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Type</th>
              {role === "admin" && <th className="p-2">Action</th>}
            </tr>
          </thead>

          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <tr key={item.id} className="text-center border-t">

                  <td className="p-2">{item.date}</td>
                  <td className="p-2">₹{item.amount}</td>
                  <td className="p-2">{item.category}</td>

                  <td
                    className={`p-2 ${
                      item.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type}
                  </td>

                  {role === "admin" && (
                    <td className="p-2 space-x-2">

                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTransaction(item.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>

                    </td>
                  )}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
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