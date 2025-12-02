"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { date: "Jan", enrollments: 40 },
  { date: "Feb", enrollments: 65 },
  { date: "Mar", enrollments: 80 },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h2 className="text-xl font-semibold mb-4">Enrollments Over Time</h2>

        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="enrollments" stroke="#2563eb" />
        </LineChart>
      </div>
    </div>
  );
}
