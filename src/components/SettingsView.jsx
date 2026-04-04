import { useState } from "react";
import { useFinanceStore } from "../store";
import {
  Moon,
  Sun,
  Trash2,
  Database,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsView() {
  const { theme, toggleTheme, role, clearAllTransactions, loadSampleData } =
    useFinanceStore();

  // <-- NEW: State to control our custom confirm modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // <-- NEW: The function that actually runs when the user clicks "Yes, Delete"
  const executeDelete = () => {
    clearAllTransactions();
    toast.error("All transactions deleted.");
    setIsConfirmOpen(false);
  };

  const handleLoadData = () => {
    loadSampleData();
    toast.success("Sample data loaded successfully.");
  };

  const glassCardClass =
    "bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm p-6 transition-colors duration-200";

  return (
    <>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Preferences Section */}
        <div className={glassCardClass}>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Preferences
          </h3>
          <div className="flex items-center justify-between py-4 border-b border-slate-200/50 dark:border-slate-700/50">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Theme Appearance
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Toggle between Light and Dark mode.
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Current Role
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Use the header toggle to switch permissions.
              </p>
            </div>
            <span
              className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider ${role === "admin" ? "bg-amber-500/20 text-amber-700 dark:text-amber-400" : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"}`}
            >
              {role}
            </span>
          </div>
        </div>

        {/* Data Management Section (Admin Only) */}
        <div
          className={`${glassCardClass} ${role !== "admin" && "opacity-60 pointer-events-none"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Database className="text-indigo-500" size={20} />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Data Management
            </h3>
          </div>

          {role !== "admin" && (
            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg mb-4">
              <AlertCircle size={16} />
              You must be an Admin to manage application data.
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b border-slate-200/50 dark:border-slate-700/50">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Load Sample Data
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Restore the default mock transactions.
                </p>
              </div>
              <button
                onClick={handleLoadData}
                className="px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors backdrop-blur-sm"
              >
                Load Data
              </button>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-rose-600 dark:text-rose-400">
                  Clear All Data
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Permanently delete all transaction history.
                </p>
              </div>
              <button
                // <-- NEW: Opens the custom modal instead of the browser alert
                onClick={() => setIsConfirmOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 rounded-lg font-medium transition-colors"
              >
                <Trash2 size={16} /> Delete All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <-- NEW: Custom Confirmation Modal --> */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200/50 dark:border-slate-700/50">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 text-rose-600 dark:text-rose-400">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-full">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                  Clear All Data
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Are you sure you want to delete all transactions? This action
                cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
                >
                  Yes, Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
