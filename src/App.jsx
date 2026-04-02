
import React, { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";


const Main = () => {
  const { darkMode, activePage } = useContext(AppContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-content">
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "transactions" && <Transactions />}
          {activePage === "insights" && <Insights />}
        </div>
      </div>

    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

export default App;