import React, { useState } from "react";
import "./App.css";
import TransactionForm from "./app/features/TransactionForm";
import TransactionList from "./app/features/TransactionList";
import TransactionFilter from "./app/features/TransactionFilter";
import { Transaction } from "./app/features/transactionTypes";
import TransactionSummary from "./app/features/TransactionSummary";
import IncomeExpenseChart from "./charts/IncomeExpenseChart";
import CategoryPieChart from "./charts/CategoryPieChart";
import TransactionSearch from "./app/features/TransactionSearch";
import { dispatch, selector } from "./app/hook";
import ToggleTheme from "./app/features/ToggleTheme";
import ExportCSV from "./app/features/ExportCSV";
import ImportCSV from "./app/features/ImportCSV";
import Login from "./app/features/Login";
import Register from "./app/features/Register";
import { logout } from "./app/features/authSlice";
import RoleGuard from "./app/features/RoleGuard";
import { motion } from "framer-motion";

function App() {
  const [filtered, setFiltered] = useState<Transaction[] | null>(null);
  const { transactions } = selector((state) => state.transactions);
  const { dark } = selector((state) => state.theme);
  const user = selector((state) => state.auth.user);
  const appDispatch = dispatch();
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return (
      <div className={dark ? "dark" : ""}>
        <div className="flex justify-end bg-gray-100 dark:bg-gray-900 p-4">
          <ToggleTheme />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen  flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900"
        >
          <div className="w-full  max-w-lg space-y-6">
            <p>Hey There ! 👋</p>
            <div className=" text-center ">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Welcome to Expense Tracker
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your income, expenses, and savings with ease. Login to
                continue or create a new account to get started.
              </p>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl dark:bg-gray-800 p-5 shadow-md"
            >
              <h2 className="text-xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-200">
                Login
              </h2>
              <Login />
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-4">
                Don't have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setShowRegister(true)}
                >
                  Register here
                </button>
              </p>
            </motion.div>

            {showRegister && (
              <div className="fixed flex justify-center items-center inset-0 z-50 bg-black/50">
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md w-full"
                >
                  <button
                    onClick={() => setShowRegister(false)}
                    className="absolute  text-gray-500 hover:text-gray-600 text-2xl"
                  >
                    X
                  </button>
                  {/* <h2 className="text-xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-200">
                  Create an account
                </h2> */}
                  <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                    Create Account
                  </h2>
                  <Register />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto space-y-6"
        >
          <div className="w-full flex justify-between items-center mb-5 dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-xl md:text-2xl font-bold text-center">
              Hello {user?.name} !!👋
            </h1>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow transition hover:bg-red-600"
              onClick={() => appDispatch(logout())}
            >
              Logout
            </button>
          </div>

          {/* <div className=" max-w-xl mx-auto space-y-6 "> */}
          <div className="flex justify-between items-center ">
            <h1 className="text-xl md:text-3xl font-bold text-center"> Expense Tracker</h1>
            <ToggleTheme />
          </div>

          <TransactionSummary />
          <TransactionForm />
          <TransactionList filtered={filtered || undefined} />
          <TransactionFilter onFilter={setFiltered} />

          <div className="w-full flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow ">
            <ExportCSV />
            <ImportCSV />
          </div>

          <TransactionSearch
            transactions={transactions}
            onSearch={setFiltered}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <IncomeExpenseChart />
            <CategoryPieChart />
          </div>

          <RoleGuard allowedRoles={["admin"]}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded shadow"
            >
              <h2 className="text-xl font-bold mb-4">👑 Admin Panel</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Only admins can access this section
              </p>
            </motion.div>
          </RoleGuard>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
