"use client";

import { useEffect, useState } from "react";
import { getAllEnrollments } from "@/src/services/EnrollmentService";

export default function EnrolledStudents() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await getAllEnrollments();
     
      setData(res.data);
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">👥 Enrolled Students</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Student</th>
            <th className="p-3">Course</th>
            <th className="p-3">Batch</th>
          </tr>
        </thead>

        <tbody>
          {data.map((enroll: any) => (
            <tr key={enroll._id} className="border-b">
              <td className="p-3">{enroll.user?.name}</td>
              <td className="p-3">{enroll.course?.title}</td>
              <td className="p-3">{enroll.batch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
