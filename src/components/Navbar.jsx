
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { role, setRole, darkMode, setDarkMode } = useContext(AppContext);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">

      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
           Shivani Finance Tracker
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Manage your expenses easily
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Role Switch */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-2 py-1 rounded-md text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
        >
          {darkMode ? "🌙" : "☀"}
        </button>

      </div>

    </div>
  );
};

export default Navbar;