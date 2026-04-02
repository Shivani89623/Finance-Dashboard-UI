
# Finance Dashboard UI – UX Explanation 

1. Purpose / Why This Dashboard
This dashboard is made to help users see and understand their money easily.
It shows how much money they earn, spend, save, and which category they spend most.
Users can make better financial decisions by looking at trends and charts quickly.

2. Who Can Use It
People who want to track their personal expenses and savings.
Small business owners who need a simple finance overview.
Anyone who wants easy charts and summaries of their money.

3. Layout & Navigation
Important info first → Users see main numbers immediately.
Cards → Charts → Details → easy to read and understand.
Clean design → simple fonts, colors, and spacing make dashboard neat.

4. How Users Interact
Hover on charts → shows exact values.
Click filters → see only what they want (month, category, etc.)
Everything is easy to read and understand → no confusion.
Colors in charts help users quickly identify big and small expenses.

5. Summary
This dashboard is built thinking about the user:
Users can understand their financial health in seconds.
Charts make numbers easy to understand.
Layout and interaction are simple, clear, and easy to use.

#  Shivani Finance Dashboard

A clean and interactive **Finance Dashboard** built with **React** and **CSS** to track income, expenses, and spending insights.  
This project was created as part of a **Frontend Developer Intern** assignment at **Zorvyn FinTech Pvt. Ltd.**


## Features

- **Dashboard Overview**
  - Total Balance, Income, and Expenses cards
  - Interactive **Pie Chart** for Income vs Expense
  - **Line Chart** showing spending trend

- **Transactions**
  - View all transactions with **Date, Amount, Category, and Type**
  - **Add, Edit, and Delete transactions** (Admin role)
  - Simple filtering and sorting

- **Insights**
  - Highest spending category
  - Total expense summary
  - Smart suggestions based on spending patterns

- **Role-Based UI**
  - **Viewer**: Can only view data
  - **Admin**: Can add/edit transactions
  - Switch roles using dropdown

- **Dark Mode**
  - Toggle between light and dark themes

- **Responsive Design**
  - Works perfectly on desktop and mobile screens



## Tech Stack

- **React** – Frontend library
- **CSS** – Styling
- **Recharts** – Charts (Pie, Line)
- **Context API** – State management
- **React Icons** – UI icons


## Setup Instructions

1. **Clone the repository**:
```bash
git clone https://github.com/Shivani89623/finance-dashboard.git



Navigate to project folder:
cd finance-dashboard

Install dependencies:
npm install

Start the development server:
npm start

Open your browser at http://localhost:3000

🗂 Folder Structure
finance-dashboard/
│
├─ src/
│   ├─ components/      # Navbar, Sidebar, Dashboard, Transactions, Insights
│   ├─ context/         # AppContext for state management
│   ├─ App.jsx
│   └─ index.css
│
├─ package.json
└─ README.md


💡 Notes:
This is a frontend-only project using mock/static data.
Role switch and dark mode are handled entirely on the frontend.
Designed with clarity, simplicity, and professional UI/UX in mind.
Handles empty states gracefully (no transactions or no data).

#Live link
https://finance-dashboard-ui-drab.vercel.app/
