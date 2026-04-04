# FinanceDash 💸

A modern, responsive Personal Finance Dashboard built with React, Vite, and Tailwind CSS. This project serves as a comprehensive frontend development assessment, demonstrating proficiency in state management, data visualization, responsive design, and role-based access control (RBAC).

![FinanceDash Preview](./image.png)

---

## ✨ Key Features

* **Role-Based Access Control (RBAC):** Toggle between "Admin" and "Viewer" roles. Admins have exclusive rights to add new transactions, delete existing ones, and clear all system data.
* **Data Visualization:** Interactive charts built with Recharts. Features an Area Chart for balance trends and a Donut Chart for spending breakdowns.
* **Persistent State Management:** Powered by Zustand. All transactions, theme preferences, and UI states are automatically saved to `localStorage` so data survives page refreshes.
* **Advanced Filtering & Pagination:** Instantly filter transactions by name, category, or type (Income/Expense). Includes functional pagination for clean data presentation.
* **Export to CSV:** Seamlessly export currently filtered transaction data into a downloadable `.csv` file.
* **Premium UI/UX:** * Fully functional Light/Dark mode toggle.
    * Modern "Glassmorphism" design system with frosted backgrounds and subtle blurs.
    * Smooth page transitions and staggered rendering animations using Framer Motion.
    * Professional toast notifications for user feedback (via Sonner).
* **100% Responsive:** Features a sliding mobile sidebar and optimized layouts for tablet and desktop viewports.

---

## 🛠️ Tech Stack

* **Framework:** React 18 (via Vite)
* **Styling:** Tailwind CSS
* **State Management:** Zustand (with persist middleware)
* **Charts:** Recharts
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Notifications:** Sonner

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have Node.js (v18+ recommended) and npm installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/finance-dash.git](https://github.com/yourusername/finance-dash.git)
   cd finance-dash