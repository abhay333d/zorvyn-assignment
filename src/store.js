import { create } from 'zustand';
import { initialTransactions } from './utils/data';

export const useFinanceStore = create((set) => ({
  transactions: initialTransactions,
  role: 'viewer', 

  toggleRole: () => set((state) => ({ 
    role: state.role === 'admin' ? 'viewer' : 'admin' 
  })),
  
  addTransaction: (newTx) => set((state) => ({ 
    transactions: [newTx, ...state.transactions] 
  })),
  
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(tx => tx.id !== id)
  }))
}));