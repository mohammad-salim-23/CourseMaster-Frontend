"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getAllEnrollments } from "@/src/services/EnrollmentService";

export default function AdminDashboard() {
  const [chartData, setChartData] = useState<{ date: string; enrollments: number }[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await getAllEnrollments();
    const enrollments = response?.data || [];

    // Group by Month
    const monthlyCount: any = {};

    enrollments.forEach((item: any) => {
      const date = new Date(item.createdAt);
      const month = date.toLocaleString("default", { month: "short" }); // Jan, Feb etc.

      if (!monthlyCount[month]) monthlyCount[month] = 0;
      monthlyCount[month] += 1;
    });

    // Convert to array for Recharts
    const formatted = Object.keys(monthlyCount).map((m) => ({
      date: m,
      enrollments: monthlyCount[m],
    }));

    setChartData(formatted);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h2 className="text-xl font-semibold mb-4">Enrollments Over Time</h2>

        <LineChart width={600} height={300} data={chartData}>
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
