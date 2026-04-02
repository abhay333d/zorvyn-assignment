import React from 'react';
import { useFinanceStore } from './store';
import { LayoutDashboard, Receipt, Settings, User } from 'lucide-react';

export default function App() {
  const { role, toggleRole } = useFinanceStore();

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold tracking-tight text-indigo-600">FinanceDash</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-lg">
            <LayoutDashboard size={20} />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Receipt size={20} />
            Transactions
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <Settings size={20} />
            Settings
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800">Dashboard Overview</h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">Viewing as:</span>
              <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {role}
              </span>
            </div>
            
            {/* Role Toggle Switch */}
            <button 
              onClick={toggleRole}
              className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <User size={16} />
              Switch Role
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Placeholder for Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-center text-slate-400">Total Balance Card</div>
              <div className="h-32 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-center text-slate-400">Income Card</div>
              <div className="h-32 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-center text-slate-400">Expenses Card</div>
            </div>

            {/* Placeholder for Charts & Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 h-96 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-center text-slate-400">Trend Chart Area</div>
               <div className="h-96 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-center text-slate-400">Spending Breakdown Chart</div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}