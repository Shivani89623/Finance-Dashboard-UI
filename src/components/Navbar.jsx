
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Navbar = () => {
  const { role, setRole, darkMode, setDarkMode } = useContext(AppContext);

  return (
    <div className="navbar">

      {/* Left */}
      <div className="navbar-left">
        <h1 className="logo">Shivani Finance Tracker</h1>
        <p className="subtitle">Manage your expenses easily</p>
      </div>

      {/* Right */}
      <div className="navbar-right">

        {/* Role Switch */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-select"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-btn"
        >
          {darkMode ? "🌙" : "☀"}
        </button>

      </div>

    </div>
  );
};

export default Navbar;