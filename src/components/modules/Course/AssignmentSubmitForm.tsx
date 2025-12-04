"use client";
import { useState } from "react";

export default function AssignmentSubmitForm({ assignmentId, moduleId }: { assignmentId: string, moduleId: string }) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/assignment-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignment: assignmentId, module: moduleId, answer }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 401) window.location.href = `/auth/login?next=window.location.pathname`;
        throw new Error(json?.message || "Submit failed");
      }
      alert("Submitted successfully");
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <textarea required value={answer} onChange={(e)=>setAnswer(e.target.value)} className="w-full border p-2 rounded" placeholder="Paste Google Drive link or write answer" />
      <div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? "Submitting..." : "Submit Assignment"}
        </button>
      </div>
    </form>
  );
}
