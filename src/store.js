// src/store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialTransactions } from "./utils/data";

export const useFinanceStore = create(
  persist(
    (set) => ({
      transactions: initialTransactions,
      role: "viewer",
      isSidebarOpen: false,
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      activeTab: "overview",

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })), 

      toggleRole: () =>
        set((state) => ({
          role: state.role === "admin" ? "viewer" : "admin",
        })),

      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen,
        })),

      setActiveTab: (tab) => set({ activeTab: tab }),

      addTransaction: (newTx) =>
        set((state) => ({
          transactions: [newTx, ...state.transactions],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
        
      // NEW ACTIONS FOR SETTINGS
      clearAllTransactions: () => 
        set({ transactions: [] }),
        
      loadSampleData: () => 
        set({ transactions: initialTransactions }),
    }),
    {
      name: "finance-dash-storage",
      partialize: (state) => ({ 
        transactions: state.transactions, 
        theme: state.theme 
      }),
    }
  )
);