
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [
      { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
      { id: 2, date: "2026-04-02", amount: 1000, category: "Food", type: "expense" },
      { id: 3, date: "2026-05-01", amount: 6000, category: "Salary", type: "income" },
      { id: 4, date: "2026-05-02", amount: 2000, category: "EMI", type: "expense" },
      { id: 5, date: "2026-06-01", amount: 8000, category: "Salary", type: "income" },
      { id: 6, date: "2026-06-02", amount: 4000, category: "Loan Repayments", type: "expense" },
      { id: 7, date: "2026-07-01", amount: 10000, category: "Salary", type: "income" },
      { id: 8, date: "2026-07-02", amount: 3000, category: "Food", type: "expense" },
      { id: 9, date: "2026-08-01", amount: 12000, category: "Salary", type: "income" },
      { id: 10, date: "2026-08-02", amount: 4000, category: "Load Repayments", type: "expense" }
    ];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions(prev => [
      ...prev,
      { ...newTransaction, id: Date.now() }
    ]);
  };
const deleteTransaction = (id) => {
  setTransactions(prev => prev.filter(t => t.id !== id));
};

const updateTransaction = (updated) => {
  setTransactions(prev =>
    prev.map(t => (t.id === updated.id ? updated : t))
  );
};
  return (
    <AppContext.Provider value={{
      role, setRole,
      darkMode, setDarkMode,
      activePage, setActivePage,
      transactions,
      addTransaction,
      deleteTransaction,
updateTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
};