
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Sidebar = () => {
  const { activePage, setActivePage } = useContext(AppContext);

  const menuItems = [
    { name: "dashboard", label: "Dashboard", icon: "📊" },
    { name: "transactions", label: "Transactions", icon: "📋" },
    { name: "insights", label: "Insights", icon: "💡" }
  ];

  return (
    <div className="sidebar">

      {/* Logo */}
      <h2 className="sidebar-title">Finance Tracker</h2>

      {/* Menu */}
      <div className="menu">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`menu-item ${
              activePage === item.name ? "active" : ""
            }`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;