import { useState } from 'react';
import { useFinanceStore } from '../store';
import { X } from 'lucide-react';

export default function TransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useFinanceStore();
  
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'General',
    type: 'expense'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      id: crypto.randomUUID(),
      name: formData.name,
      amount: Number(formData.amount),
      date: formData.date,
      category: formData.category,
      type: formData.type
    });
    setFormData({ name: '', amount: '', date: new Date().toISOString().split('T')[0], category: 'General', type: 'expense' });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800">Add Transaction</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="e.g. Coffee Shop" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
              <input required type="number" step="0.01" min="0" name="amount" value={formData.amount} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white">
                <option value="General">General</option>
                <option value="Groceries">Groceries</option>
                <option value="Housing">Housing</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}