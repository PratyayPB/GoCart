"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 1. Set a default value for the prop (allOrders = [])
export default function OrdersAreaChart({ allOrders = [] }) {
  // 2. Use Optional Chaining or an early return to prevent crashing
  if (!allOrders || allOrders.length === 0) {
    return (
      <div className="w-full max-w-4xl h-[300px] flex items-center justify-center border border-dashed border-slate-200 rounded-lg text-slate-400">
        No order data available to display.
      </div>
    );
  }

  // Group orders by date
  const ordersPerDay = allOrders.reduce((acc, order) => {
    // Handle potential missing date fields safely
    const dateStr = order.createdAt || new Date().toISOString();
    const date = new Date(dateStr).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Convert to array for Recharts and Sort by date
  const chartData = Object.entries(ordersPerDay)
    .map(([date, count]) => ({
      date,
      orders: count,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ensure the chart goes forward in time

  return (
    <div className="w-full max-w-4xl h-[300px] text-xs">
      <h3 className="text-lg font-medium text-slate-800 mb-4 pt-2 text-right">
        <span className="text-slate-500">Orders /</span> Day
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "#64748b" }}
            tickFormatter={(str) => str.split("-").slice(1).join("/")} // Simplifies YYYY-MM-DD to MM/DD
          />
          <YAxis allowDecimals={false} tick={{ fill: "#64748b" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#4f46e5"
            fillOpacity={1}
            fill="url(#colorOrders)"
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
