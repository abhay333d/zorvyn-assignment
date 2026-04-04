import { useState } from "react";
import { useFinanceStore } from "../store";
import { Search, Trash2, Plus, ChevronLeft, ChevronRight, Download } from "lucide-react";
import TransactionModal from "./TransactionModal";
import { toast } from "sonner";

export default function TransactionTable() {
  const { transactions, role, deleteTransaction } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const exportToCSV = () => {
    if (filteredTransactions.length === 0) {
      toast.error("No transactions to export.");
      return;
    }
    const headers = ["Date", "Name", "Category", "Type", "Amount"];
    const csvRows = [
      headers.join(","),
      ...filteredTransactions.map(tx => [tx.date, `"${tx.name}"`, tx.category, tx.type, tx.amount].join(","))
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `transactions_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Transactions exported successfully!");
  };

  return (
    <>
      <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden mt-6 transition-colors duration-200">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Recent Transactions
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-9 pr-4 py-2 border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto dark:text-white placeholder:text-slate-400 backdrop-blur-sm"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
              title="Export to CSV"
            >
              <Download size={16} /> <span className="hidden sm:inline">Export</span>
            </button>

            {role === "admin" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <Plus size={16} /> Add New
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200/50 dark:border-slate-800/50 text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                {role === "admin" && (
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {tx.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-xs font-medium">
                        {tx.category}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}
                    >
                      {tx.type === "income" ? "+" : "-"}$
                      {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    {role === "admin" && (
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            deleteTransaction(tx.id);
                            toast.error("Transaction deleted");
                          }}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-md hover:bg-rose-50 dark:hover:bg-rose-900/20 opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Delete Transaction"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={role === "admin" ? 5 : 4}
                    className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 text-sm bg-slate-50/20 dark:bg-slate-900/20"
                  >
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}