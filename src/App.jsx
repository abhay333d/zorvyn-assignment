import { useEffect } from "react";
import { useFinanceStore } from "./store";
import {
  LayoutDashboard,
  Receipt,
  Settings,
  User,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SummaryCards from "./components/SummaryCards";
import DashboardCharts from "./components/DashboardCharts";
import TransactionTable from "./components/TransactionTable";
import { Toaster } from "sonner";

export default function App() {
  const {
    role,
    toggleRole,
    isSidebarOpen,
    toggleSidebar,
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
  } = useFinanceStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 h-16 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
          FinanceDash
        </h1>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => {
            setActiveTab("overview");
            if (window.innerWidth < 768) toggleSidebar();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "overview" ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"}`}
        >
          <LayoutDashboard size={20} /> Overview
        </button>
        <button
          onClick={() => {
            setActiveTab("transactions");
            if (window.innerWidth < 768) toggleSidebar();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "transactions" ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"}`}
        >
          <Receipt size={20} /> Transactions
        </button>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <Settings size={20} /> Settings
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white overflow-hidden transition-colors duration-200">
      <Toaster position="top-right" richColors theme={theme} />

      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col hidden md:flex z-10 transition-colors duration-200">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              {activeTab === "overview"
                ? "Dashboard Overview"
                : "All Transactions"}
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Toggle Dark Mode"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="items-center gap-2 text-sm hidden sm:flex">
              <span className="text-slate-500 dark:text-slate-400">
                Viewing as:
              </span>
              <motion.span
                key={role}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${role === "admin" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"}`}
              >
                {role}
              </motion.span>
            </div>

            <button
              onClick={toggleRole}
              className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <User size={16} />
              <span className="hidden sm:inline">Switch Role</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <motion.div
                key="overview"
                className="max-w-5xl mx-auto space-y-6 pb-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div variants={itemVariants}>
                  <SummaryCards />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <DashboardCharts />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <TransactionTable />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="transactions"
                className="max-w-5xl mx-auto pb-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div variants={itemVariants}>
                  <TransactionTable />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
