// src/store.js
import { create } from "zustand";
import { initialTransactions } from "./utils/data";

export const useFinanceStore = create((set) => ({
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

  addTransaction: (newTx) =>
    set((state) => ({
      transactions: [newTx, ...state.transactions],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),
}));
