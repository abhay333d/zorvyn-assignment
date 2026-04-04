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
import SettingsView from "./components/SettingsView";
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
      <div className="p-4 h-16 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center">
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
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "overview" ? "bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-500/5 dark:hover:bg-slate-400/5 hover:text-slate-900 dark:hover:text-white"}`}
        >
          <LayoutDashboard size={20} /> Overview
        </button>
        <button
          onClick={() => {
            setActiveTab("transactions");
            if (window.innerWidth < 768) toggleSidebar();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "transactions" ? "bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-500/5 dark:hover:bg-slate-400/5 hover:text-slate-900 dark:hover:text-white"}`}
        >
          <Receipt size={20} /> Transactions
        </button>
      </nav>
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <button
          onClick={() => {
            setActiveTab("settings");
            if (window.innerWidth < 768) toggleSidebar();
          }}
          className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "settings" ? "bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-500/5 dark:hover:bg-slate-400/5 hover:text-slate-900 dark:hover:text-white"}`}
        >
          <Settings size={20} /> Settings
        </button>
      </div>
    </>
  );

  return (
    // 1. Added a subtle gradient to the main background so the glass effect is more visible
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 font-sans text-slate-900 dark:text-white overflow-hidden transition-colors duration-200">
      <Toaster position="top-right" richColors theme={theme} />

      {/* 2. Made the sidebar glassy (bg-opacity + backdrop-blur) */}
      <aside className="w-64 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex-col hidden md:flex z-20 transition-colors duration-200">
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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-2xl flex flex-col z-50 md:hidden border-r border-slate-200/50 dark:border-slate-800/50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Shifted overflow-y-auto to the main tag so content scrolls UNDER the sticky header */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        {/* 4. Glassy Header: sticky top-0, bg-opacity, and backdrop-blur */}
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-4 md:px-8 h-16 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 text-slate-500 hover:bg-slate-500/10 rounded-lg md:hidden"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "transactions" && "All Transactions"}
              {activeTab === "settings" && "Application Settings"}
            </h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-500/10 rounded-lg transition-colors"
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
                className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${role === "admin" ? "bg-amber-500/20 text-amber-700 dark:text-amber-400" : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"}`}
              >
                {role}
              </motion.span>
            </div>

            <button
              onClick={toggleRole}
              className="flex items-center gap-2 px-3 py-1.5 border border-slate-200/50 dark:border-slate-700/50 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-500/10 transition-colors"
            >
              <User size={16} />
              <span className="hidden sm:inline">Switch Role</span>
            </button>
          </div>
        </header>

        {/* 5. Inner container for padding */}
        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
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
            )}

            {activeTab === "transactions" && (
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

            {/* NEW SETTINGS VIEW */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                className="max-w-5xl mx-auto pb-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div variants={itemVariants}>
                  <SettingsView />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
