"use client";

import { getAllAssignmentSubmissions } from "@/src/services/AssignmentSubmission";
import { useEffect, useState } from "react";


export default function AllAssignmentSubmission() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await getAllAssignmentSubmissions();
      if (res?.success) {
        setSubmissions(res.data);
      }
    } catch (err) {
      console.log("Error loading submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p className="text-center py-10">Loading submissions...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">All Assignment Submissions</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-900 font-semibold text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">Assignment</th>
              <th className="px-4 py-3">Marks</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted At</th>
            </tr>
          </thead>

          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-5 text-gray-500">
                  No submissions found
                </td>
              </tr>
            ) : (
              submissions.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3">
                    {item?.user?.name || item?.user?.email}
                  </td>

                  <td className="px-4 py-3">
                    {item?.module?.title || "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    {item?.assignment?.title || "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    {item?.marks ?? "—"}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        item?.status === "reviewed"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {item?.status || "pending"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(item?.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
