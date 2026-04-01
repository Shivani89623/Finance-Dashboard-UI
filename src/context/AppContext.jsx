
// import React, { createContext, useState, useEffect } from "react";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [role, setRole] = useState("viewer");
//   const [darkMode, setDarkMode] = useState(false);

//   const [transactions, setTransactions] = useState(() => {
//     const saved = localStorage.getItem("transactions");
//     return saved ? JSON.parse(saved) : [
//       { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
//       { id: 2, date: "2026-04-02", amount: 1000, category: "Food", type: "expense" }
//     ];
//   });

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   const addTransaction = (newTransaction) => {
//     setTransactions(prev => [
//       ...prev,
//       { ...newTransaction, id: Date.now() }
//     ]);
//   };

//   return (
//     <AppContext.Provider value={{
//       role, setRole,
//       darkMode, setDarkMode,
//       transactions,
//       addTransaction
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// };




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
      { id: 2, date: "2026-04-02", amount: 1000, category: "Food", type: "expense" }
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