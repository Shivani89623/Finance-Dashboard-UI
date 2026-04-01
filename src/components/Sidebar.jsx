// import React, { useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const Sidebar = () => {
//   const { activePage, setActivePage } = useContext(AppContext);

//   return (
//     <div className="w-60 h-screen bg-gray-800 text-white p-4">
//       <h2 className="text-xl mb-6">Finance App</h2>

//       <ul className="space-y-4">
//         <li
//           onClick={()=>setActivePage("dashboard")}
//           className={`cursor-pointer ${activePage==="dashboard" && "text-yellow-400"}`}
//         >
//           📊 Dashboard
//         </li>

//         <li
//           onClick={()=>setActivePage("transactions")}
//           className={`cursor-pointer ${activePage==="transactions" && "text-yellow-400"}`}
//         >
//           📋 Transactions
//         </li>

//         <li
//           onClick={()=>setActivePage("insights")}
//           className={`cursor-pointer ${activePage==="insights" && "text-yellow-400"}`}
//         >
//           💡 Insights
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;










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
    <div className="w-64 min-h-screen bg-gradient-to-b from-purple-600 to-indigo-600 text-white p-5">

      {/* Logo / Title */}
      <h2 className="text-xl font-bold mb-8">
        💰 Finance Tracker
      </h2>

      {/* Menu */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 
              
              ${
                activePage === item.name
                  ? "bg-white text-purple-600 shadow-md"
                  : "hover:bg-white/20"
              }
            `}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;