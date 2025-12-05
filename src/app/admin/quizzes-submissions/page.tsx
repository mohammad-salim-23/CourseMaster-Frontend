"use client";

import { getAllQuizSubmissions } from "@/src/services/QuizSubmissionService";
import { useEffect, useState } from "react";


export default function QuizSubmissionPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await getAllQuizSubmissions();
      if (res.success) {
        setSubmissions(res.data);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="p-5 text-lg">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Quiz Submissions</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Module</th>
              <th className="p-3">Quiz</th>
              <th className="p-3">Score</th>
              <th className="p-3">Total Questions</th>
              <th className="p-3">Submitted At</th>
            </tr>
          </thead>

          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  No submissions found
                </td>
              </tr>
            ) : (
              submissions.map((s: any) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{s?.user?.name || "N/A"}</td>
                  <td className="p-3">{s?.module?.title || "N/A"}</td>
                  <td className="p-3">{s?.quiz?.title || "N/A"}</td>
                  <td className="p-3 font-semibold">{s.score}</td>
                  <td className="p-3">{s.answers?.length}</td>
                  <td className="p-3">
                    {new Date(s.createdAt).toLocaleDateString()}
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
