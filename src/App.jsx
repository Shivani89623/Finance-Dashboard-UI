
// import React, { useContext } from "react";
// import { AppProvider, AppContext } from "./context/AppContext";
// import Navbar from "./components/Navbar";
// import Dashboard from "./components/Dashboard";
// import Transactions from "./components/Transactions";
// import Insights from "./components/Insights";

// const Main = () => {
//   const { darkMode } = useContext(AppContext);

//   return (
//     <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
//       <Navbar />
//       <Dashboard />
//       <Transactions />
//       <Insights />
//     </div>
//   );
// };
// const App=()=> {
//   return (
//     <AppProvider>
//       <Main />
//     </AppProvider>
//   );
// }

// export default App;









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
    <div className={darkMode ? "dark" : ""}>
  <div className="min-h-screen flex bg-white text-black dark:bg-gray-900 dark:text-white">

    <Sidebar />

    <div className="flex-1">
      <Navbar />

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