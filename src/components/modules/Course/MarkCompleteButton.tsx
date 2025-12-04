"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarkCompleteButton({ enrollmentId, moduleId }: { enrollmentId: string, moduleId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enrollment/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, moduleId }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 401) window.location.href = `/auth/login?next=/dashboard/enrollments`;
        throw new Error(json?.message || "Error");
      }
      if (json.success) {
       
        router.refresh(); 
      } else {
        alert(json.message || "Failed to mark complete");
      }
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={onClick} className="px-3 py-1 bg-green-600 text-white rounded">
      {loading ? "Marking..." : "Mark Module Complete"}
    </button>
  );
}
