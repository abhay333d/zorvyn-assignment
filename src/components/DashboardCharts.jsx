import { useFinanceStore } from "../store";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function DashboardCharts() {
  const { transactions } = useFinanceStore();

  const trendData = [...transactions].reverse().map((tx) => ({
    name: tx.date.split("-")[2],
    amount: tx.amount,
  }));

  const expensesByCategory = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      const existing = acc.find((item) => item.name === tx.category);
      if (existing) {
        existing.value += tx.amount;
      } else {
        acc.push({ name: tx.category, value: tx.amount });
      }
      return acc;
    }, []);

  const COLORS = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col transition-colors duration-200">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Balance Trend
        </h3>
        <div className="flex-1 w-full">
          {/* Changed height from "100%" to {300} to fix the Recharts warning */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={trendData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
                className="opacity-50 dark:opacity-20"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  backgroundColor: "var(--tw-colors-slate-800, #1e293b)",
                  color: "#fff",
                }}
                formatter={(value) => [`$${value}`, "Amount"]}
                labelStyle={{ color: "#94a3b8" }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col transition-colors duration-200">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Spending Breakdown
        </h3>
        <div className="flex-1 w-full">
          {/* Changed height from "100%" to {300} to fix the Recharts warning */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value}`, "Amount"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  backgroundColor: "#1e293b",
                  color: "#fff",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", color: "#64748b" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
