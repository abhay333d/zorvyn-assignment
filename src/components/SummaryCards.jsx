import { useFinanceStore } from '../store';
import { DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function SummaryCards() {
  const { transactions } = useFinanceStore();

  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalBalance = totalIncome - totalExpenses;

  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">Total Balance</p>
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <DollarSign size={20} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(totalBalance)}</h3>
          <p className="text-sm text-slate-500 mt-1">Updated just now</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">Total Income</p>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <ArrowUpRight size={20} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(totalIncome)}</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">Total Expenses</p>
          <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
            <ArrowDownRight size={20} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(totalExpenses)}</h3>
        </div>
      </div>
    </div>
  );
}